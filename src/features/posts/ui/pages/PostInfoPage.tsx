import {Post} from "../components/Post.tsx";
import {useParams} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import {useDeletePostByIdMutation, useGetPostByIdQuery} from "../../api/post.api.ts";
import Button from "../../../../shared/ui/Button.tsx";
import {ReturnLink} from "../../../../shared/ui/ReturnLink.tsx";

export function PostInfoPage() {

    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    const {data, isLoading, error} = useGetPostByIdQuery(id!)
    const [deletePost, del] = useDeletePostByIdMutation()


    const onDeletePost = async () => {
        await deletePost(id!)
        navigate('/posts')
    }

    if (isLoading) return <div>LOADING...</div>;
    if (error) return <div>ERROR</div>;
    if (!data) return <div>404 NOT FOUND</div>;

    return (
        <div>

            <nav className="flex justify-between pb-3">
                <ReturnLink name={"← Back to Posts list"} to={'/posts'}/>
                <div className="grid grid-cols-2 gap-x-5">

                    <Button type={"button"}
                            variant={"secondary"}
                            buttonName={"Update"}
                            onClick={() => navigate(`/posts/${id}/update`)}/>

                    <Button type={"button"}
                            variant={"danger"}
                            buttonName={"Delete"}
                            isSubmitting={del.isLoading}
                            submittingText={"Deleting..."}
                            onClick={onDeletePost}/>
                </div>
            </nav>

            <div>
                <Post
                    key={data.id}
                    title={data.title}
                    description={data.description}
                    content={data.content}/>
            </div>

        </div>

    )
}