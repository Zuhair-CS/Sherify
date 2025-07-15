import { connectToDb } from "@utils/database";
import Blog from "@models/blog";

// GET request to read one blog
export const GET = async (request, { params }) => {
  try {
    await connectToDb();
    const blog = await Blog.findById(params.id).populate('creator');
    if (!blog) {
      return new Response("Prompt not found", { status: 404 });
    }
    return new Response(JSON.stringify(blog), { status: 200 });
  } catch (error) {
    console.error("GET error:", error);
    return new Response("Failed to fetch blog", { status: 500 });
  }
};

// PATCH request to update a blog
export const PATCH = async (request, { params }) => {
  const { blog, tag } = await request.json();

  try {
    await connectToDb();
    const existingBlog = await Blog.findById(params.id);
    if (!existingBlog) {
      return new Response("Blog not found!", { status: 404 });
    }

    existingBlog.blog = blog;
    existingBlog.tag = tag;

    await existingBlog.save();

    return new Response(JSON.stringify(existingBlog), { status: 200 });
  } catch (error) {
    console.error("PATCH error:", error);
    return new Response("Failed to update blog", { status: 500 });
  }
};

// DELETE request
export const DELETE = async(_request , {params})=>{
  try {
    await connectToDb();
    await Blog.findByIdAndDelete(params.id);
    return new Response("Blog Deleted Successfully", { status: 200 });
  } catch (error) {
    console.error("DELETE error:", error);
    return new Response("Failed to delete blog", { status: 500 });
  }
};