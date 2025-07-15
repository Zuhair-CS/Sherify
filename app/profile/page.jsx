'use client'
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {Profile} from "@components/Profile"
import { useRouter } from "next/navigation";

const MyProfile = () => {
    const router = useRouter();
    const { data : session} = useSession();
    const [posts, setPosts] = useState([]);
    const handleEdit = (post)=>{
        router.push(`/update-blog?id=${post._id}`)
    }
    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this blog? ");
        if(hasConfirmed){
            try{
                await fetch(`/api/blog/${post._id.toString()}`, {
                    method : 'DELETE'
                });

                const filteredPosts = posts.filter((p) => {
                    p._id !== post._id;
                });
                setPosts(filteredPosts);
                router.push("/");
            }catch(error){
                console.log(error)
            }
        }
    }
    useEffect(() => {
        const fetchPosts = async () => {
        try {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setPosts(data);
        }catch (err) {
            console.error('Failed to fetch posts:', err);
        }
    };
    if(session?.user.id ) fetchPosts();
  }, [setPosts]);
    return (
        <Profile name = "My" desc = "Welcome to your personalized profile page."
        data = {posts} handleEdit = {handleEdit} handleDelete = {handleDelete}
        />
    )
}

export default MyProfile