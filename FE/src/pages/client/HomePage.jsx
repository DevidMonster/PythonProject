import { useEffect, useState } from "react";
import { getAll } from "../../api/post";
import { Link } from "react-router-dom";

function HomePage() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        (async () => {
            const res = await getAll()
            setPosts(res)
        })()
    }, [])
    return (  
        <div className="min-h-screen p-10">
            <div className="flex items-center gap-8 justify-between">
                {posts?.map((post, index) => {
                    return (
                        <div key={index} className="w-[45%]">
                            <Link to={'/post/'+post.slug}>
                                <h1 className="font-bold text-xl">{post.title}</h1>
                                <img className="w-full h-[400px] object-cover rounded-lg my-2" src={post.images[0].url} alt={post.slug} />
                                <h2 className="font-semibold text-lg">{post.subTitle}</h2>
                            </Link>
                            <p style={{WebkitLineClamp: '4', wordBreak: 'break-word', overflowWrap: 'break-word',textOverflow: 'ellipsis', overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical'}}>{post.content}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default HomePage;