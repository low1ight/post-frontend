import {Post} from "../components/Post.tsx";
import type {PostType} from "../../model/post.type.ts";
import {Link} from "react-router-dom";
import {useGetAllPostsQuery} from "../../api/post.api.ts";


export function PostsListPage() {

    const {
        data,
        isLoading,
        error
    } = useGetAllPostsQuery();


    if (isLoading) return <div>LOADING...</div>;
    if (error) return <div>ERROR</div>;

    return (
        <div>
            <nav className="py-10 flex justify-center">
                <Link to={"/posts/new"}>
                    <button>ADD NEW POST</button>
                </Link>
            </nav>

            <div className="grid grid-cols-1 gap-y-5">
                {data?.items.map((post: PostType) =>
                    <Link to={`/posts/${post.id}`} key={post.id}>
                        <Post
                            title={post.title}
                            description={post.description}
                            content={post.content}/>
                    </Link>)}
            </div>
        </div>

    )
}