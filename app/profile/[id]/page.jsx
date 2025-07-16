'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Profile } from '@components/Profile';

const UserProfile = () => {
  const params = useParams();
  const userId = params.id;

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({ name: 'User' });

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await fetch(`/api/users/${userId}/posts`);
        const data = await res.json();
        setPosts(data);

        if (data.length > 0) {
          setUser({ name: data[0].creator.username });
        }
      } catch (error) {
        console.error('Failed to fetch user profile posts:', error);
      }
    };

    if (userId) fetchUserPosts();
  }, [userId]);

  return (
    <Profile
      name={`${user.name}'s`}
      desc={`Welcome to ${user.name}'s profile page.`}
      data={posts}
      handleEdit={null}
      handleDelete={null}
    />
  );
};

export default UserProfile;
