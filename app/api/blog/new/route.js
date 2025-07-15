import { connectToDb } from "@utils/database";
import Blog from "@models/blog";

export const POST = async(req, res) => {
    const {userId, blog, tag } = await req.json();
    try{
        await connectToDb();
        const newBlog = new Blog({creator: userId,blog, tag})
        await newBlog.save();
        return new Response(JSON.stringify(newBlog), {status : 201})
    }catch(error){
        return new Response("Failed to Create a new Prompt", {status : 500})
    }
}