'use client';

import { useState, useEffect } from 'react';
import { BlogCard } from './BlogCard';

const BlogCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <BlogCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      }
    };

    fetchPosts();
  }, []);

  const filterPosts = (text) => {
    const regex = new RegExp(text, 'i'); // case-insensitive
    return posts.filter(
      (post) =>
        regex.test(post.blog) ||
        regex.test(post.tag) ||
        regex.test(post.creator.username)
    );
  };

  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    setFilteredPosts(filterPosts(text));
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
    setFilteredPosts(filterPosts(tag));
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag, blog, or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <BlogCardList
        data={searchText ? filteredPosts : posts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
