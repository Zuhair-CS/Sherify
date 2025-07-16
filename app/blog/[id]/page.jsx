import Image from "next/image";

const ShowBlog = async({params})=>{
    const awaitedParams = await params;
    const blogId = awaitedParams.id;
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${blogId}`);
        
        // Check if the response is ok
        if (!response.ok) {
            console.error('API Response not ok:', response.status, response.statusText);
            return (
                <section className="w-full flex-center">
                    <div className="prompt_card max-w-2xl w-full">
                        <h1 className="text-2xl font-bold mb-4 text-white">
                            Blog Not Found
                        </h1>
                        <p className="text-gray-400">
                            The blog you're looking for doesn't exist or has been removed.
                        </p>
                    </div>
                </section>
            );
        }
        
        // Check if the response is JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            console.error('Response is not JSON:', contentType);
            const textResponse = await response.text();
            console.error('Response text:', textResponse);
            throw new Error('Server returned non-JSON response');
        }
        
        const post = await response.json();
        
        // Check if we got a valid post
        if (!post || post.error) {
            console.error('Invalid post data:', post);
            return (
                <section className="w-full flex-center">
                    <div className="prompt_card max-w-2xl w-full">
                        <h1 className="text-2xl font-bold mb-4 text-white">
                            Error Loading Blog
                        </h1>
                        <p className="text-gray-400">
                            {post?.error || 'Failed to load blog content'}
                        </p>
                    </div>
                </section>
            );
        }
        
        return (
            <section className="w-full flex-center">
                <div className="prompt_card max-w-2xl w-full">
                    <div className="flex items-center gap-4 mb-4">
                        <Image
                            src={post.creator?.image || '/default-avatar.png'}
                            alt="user"
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                        />
                        <div>
                            <h3 className="font-semibold text-gray-300">{post.creator?.username || 'Unknown User'}</h3>
                            <p className="text-sm text-gray-400">{post.creator?.email || 'No email'}</p>
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
        );
    } catch (error) {
        console.error('Error fetching blog:', error);
        return (
            <section className="w-full flex-center">
                <div className="prompt_card max-w-2xl w-full">
                    <h1 className="text-2xl font-bold mb-4 text-white">
                        Error Loading Blog
                    </h1>
                    <p className="text-gray-400">
                        Something went wrong while loading this blog. Please try again later.
                    </p>
                </div>
            </section>
        );
    }
}

export default ShowBlog;