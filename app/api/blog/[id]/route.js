import { connectToDb } from "@utils/database";
import Blog from "@models/blog";

// GET request to read one blog
export const GET = async (request, { params }) => {
  console.log('API Route called');
  
  try {
    const awaitedParams = await params;
    console.log('Blog ID received:', awaitedParams.id);
    
    console.log('Connecting to database...');
    await connectToDb();
    console.log('Database connected successfully');
    
    console.log('Searching for blog...');
    const blog = await Blog.findById(awaitedParams.id).populate('creator');
    console.log('Blog found:', !!blog);
    
    if (!blog) {
      console.log('Blog not found, returning 404');
      return new Response(JSON.stringify({ error: "Blog not found" }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    console.log('Returning blog data');
    return new Response(JSON.stringify(blog), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("GET error details:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    
    return new Response(JSON.stringify({ 
      error: "Failed to fetch blog",
      details: error.message 
    }), { 
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