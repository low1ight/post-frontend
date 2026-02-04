import {Post} from "../components/Post.tsx";
import {Link, useParams} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {useDeletePostByIdMutation, useGetPostByIdQuery} from "../../api/post.api.ts";

export function PostInfoPage() {

    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    const {data, isLoading, error} = useGetPostByIdQuery(id!)
    const [deletePost] = useDeletePostByIdMutation()


    const onDeletePost = async () => {
        await deletePost(id!)
        navigate('/posts')
    }

    if (isLoading) return <div>LOADING...</div>;
    if (error) return <div>ERROR</div>;
    if (!data) return <div>404 NOT FOUND</div>;

    return (<div >
            <nav className="flex py-5 justify-between">
                <Link to={`/posts/`}><p>back</p></Link>
                <div className="grid grid-cols-2 gap-x-5">
                    <button onClick={() => navigate(`/posts/${id}/update`)}> update </button>
                    <button onClick={onDeletePost}> delete</button>
                </div>

            </nav>
            <div className="grid grid-cols-1 gap-y-5">
                <Post
                    key={data.id}
                    title={data.title}
                    description={data.description}
                    content={data.content}/>
            </div>
        </div>

    )
}