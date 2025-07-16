import { BlogCard } from "./BlogCard"


export const Profile = ({ name, desc,data,handleEdit, handleDelete}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="orange_gradient">{name} profile</span> 
      </h1>
      <p className="desc text-left ">Welcome to {name}'s profile page. See all Posts here!</p>
      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <BlogCard key={post._id} post={post} 
          handleEdit={()=>{if(handleEdit && handleEdit(post));}}
          handleDelete={()=>{if(handleDelete && handleDelete(post));}}/>
        ))}
      </div>
    </section>
  )
}
