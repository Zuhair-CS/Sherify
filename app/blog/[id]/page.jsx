import Image from "next/image";
const ShowBlog = async({params})=>{
    const awaitedParams = await params;
    const blogId = awaitedParams.id;
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${blogId}`);
    const post = await response.json();
    return (
            <section className="w-full flex-center">
                <div className="prompt_card max-w-2xl w-full">
                    <div className="flex items-center gap-4 mb-4">
                    <Image
                        src={post.creator?.image}
                        alt="user"
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                    />
                    <div>
                        <h3 className="font-semibold text-gray-300">{post.creator?.username}</h3>
                        <p className="text-sm text-gray-400">{post.creator?.email}</p>
                    </div>
                    </div>

                    <h1 className="text-2xl font-bold mb-4 text-white break-words">
                    #{post.tag}
                    </h1>

                    <p className="whitespace-pre-wrap break-words text-gray-100 text-lg leading-7">
                    {post.blog}
                    </p>
                </div>
            </section>
            )
}


export default ShowBlog;