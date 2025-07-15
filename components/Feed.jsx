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
  const [posts, setPost] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        const data = await response.json();
        setPost(data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      }
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    // Optionally implement filtering logic here
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <BlogCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
