import {Post} from "../components/Post.tsx";
import {useParams} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import {useDeletePostByIdMutation, useGetPostByIdQuery} from "../../api/post.api.ts";
import Button from "../../../../shared/ui/Button.tsx";
import {ReturnLink} from "../../../../shared/ui/ReturnLink.tsx";
import {PostSkeleton} from "../components/skeleton/PostSkeleton.tsx";
import {NotFound} from "../../../../shared/ui/NotFound.tsx";
import {ActionModal} from "../../../../shared/ui/ActionModal.tsx";
import {useState} from "react";

export function PostInfoPage() {

    const [modalVisible, setModalVisible] = useState(false);

    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    const {data, isLoading, error} = useGetPostByIdQuery(id!)
    const [deletePost, del] = useDeletePostByIdMutation()


    const onDeletePost = async () => {
        await deletePost(id!)
        navigate('/posts')
    }

    if (!isLoading && !data || error) return <NotFound />;

    return (
        <div>

            {modalVisible && <ActionModal
                isLoading={del.isLoading}
                submittingText={"Deleting..."}
                onSubmit={onDeletePost}
                buttonName={"Delete"}
                onCancel={() => setModalVisible(false)}
            />}

            <nav className="flex justify-between pb-3">
                <ReturnLink name={"← Back to Posts list"} to={'/posts'}/>
                <div className="grid grid-cols-2 gap-x-5">

                    <Button type={"button"}
                            variant={"secondary"}
                            buttonName={"Update"}
                            disabled={isLoading}
                            onClick={() => navigate(`/posts/${id}/update`)}/>

                    <Button type={"button"}
                            variant={"danger"}
                            buttonName={"Delete"}
                            disabled={isLoading}
                            onClick={() => setModalVisible(true)}/>
                </div>
            </nav>

            <div>
                {isLoading ?
                    <PostSkeleton /> :
                    <Post
                    key={data.id}
                    title={data.title}
                    description={data.description}
                    content={data.content}/>}

            </div>

        </div>

    )
}