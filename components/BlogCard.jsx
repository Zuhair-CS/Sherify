'use client'
import { useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import Link from "next/link"

export const BlogCard = ({post, handleTagClick, handleEdit, handleDelete}) => {
  const {data: session} = useSession();
  const [copied, setCopied]= useState("");
  const pathname = usePathname();
  const handleCopy = ()=>{
    setCopied(post.blog);
    navigator.clipboard.writeText(post.blog);
    setTimeout(()=>{
      setCopied("")
    }, 3000);
  }
  return (

    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5 ">
        <Link href={`/profile/${post.creator._id}`}>
          <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
            <Image src={post.creator.image} alt="user_image" width={40} height={40} 
            className="rounded-full object-contain"/>

            <div className="flex flex-col">
              <h3 className="font-satoshi font-semibold text-gray-300 text-xl tracking-wide">
                {post.creator.username}
              </h3>
            </div>
          </div>
        </Link>
        <div className="copy_btn pointer_cursor" onClick={handleCopy}>
          <Image src= {copied === post.blog? '/assets/icons/tick.svg' :'/assets/icons/copy.svg' }
          width={12} height={12} alt="copy_icon" />
        </div>
      </div>
      <Link href={`/blog/${post._id}`}>
        <p className="my-4 font-satoshi text-sm text-gray-300 break-words whitespace-pre-wrap w-full line-clamp-4 h-20"> {post.blog} </p>
        <p className="pointer_cursor font-inter text-sm text-white cursor-pointer" onClick={()=>{ handleTagClick && handleTagClick(post.tag)}}>#{post.tag} </p>
      </Link>
      {session?.user.id === post.creator._id && pathname === '/profile' &&
      (
          <div className="mt-5 flex-center gap-4 border-t border-grey-100 pt-3">
            <button className="action-button" onClick={(e) => {
              e.stopPropagation();
              handleEdit();
            }}>
              Edit
            </button>

            <button className="action-button" onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}>
              Delete
            </button>
          </div>
        

      )}
    </div>

  )
}
