import { connectToDb } from "@utils/database";
import Blog from "@models/blog";

// GET request to read one blog
export const GET = async (request, { params }) => {
  const awaitedParams = await params;
  try {
    await connectToDb();
    const blog = await Blog.findById(awaitedParams.id).populate('creator');
    if (!blog) {
      return new Response(JSON.stringify({ error: "Blog not found" }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return new Response(JSON.stringify(blog), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("GET error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch blog" }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// PATCH request to update a blog
export const PATCH = async (request, { params }) => {
  const { blog, tag } = await request.json();
  const awaitedParams = await params;
  try {
    await connectToDb();
    const existingBlog = await Blog.findById(awaitedParams.id);
    if (!existingBlog) {
      return new Response(JSON.stringify({ error: "Blog not found!" }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    existingBlog.blog = blog;
    existingBlog.tag = tag;

    await existingBlog.save();

    return new Response(JSON.stringify(existingBlog), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("PATCH error:", error);
    return new Response(JSON.stringify({ error: "Failed to update blog" }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// DELETE request
export const DELETE = async(_request , {params})=>{
  const awaitedParams = await params; 
  try {
    await connectToDb();
    await Blog.findByIdAndDelete(awaitedParams.id);
    return new Response(JSON.stringify({ message: "Blog Deleted Successfully" }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("DELETE error:", error);
    return new Response(JSON.stringify({ error: "Failed to delete blog" }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};