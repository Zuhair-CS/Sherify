import { connectToDb } from "@utils/database";
import Blog from "@models/blog";

export const GET = async (req, {params}) => {
  const awaitedParams = await params;
  try {
    await connectToDb();

    const blogs = await Blog.find({ creator: awaitedParams.id }).populate('creator');
    return new Response(JSON.stringify(blogs), { status: 200 });
  } catch (error) {
    console.error("GET error:", error);
    return new Response("Failed to fetch all blogs", { status: 500 });
  }
};

