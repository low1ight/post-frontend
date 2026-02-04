import {Post} from "../components/Post.tsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {PostType} from "../../model/post.type.ts";
import {Link, useParams} from "react-router-dom";
import {postsApi} from "../../api/posts.api.ts";
import { useNavigate } from 'react-router-dom';

export function PostInfoPage() {

    const {id} = useParams<{ id: string }>();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {data, isLoading, error} = useQuery<PostType>({
        queryKey: ['post', id],
        queryFn: () => postsApi.getById(id!),
    });


    const onDelete = useMutation({

        mutationFn: () => postsApi.deleteById(id!),
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ['post', id] });
            navigate('/');
        },
        onError: (error) => {
            console.error("Deleting Error:", error);
        }
    });

    if (isLoading) return <div>LOADING...</div>;
    if (error) return <div>ERROR:{error.message}</div>;
    if (!data) return <div>404 NOT FOUND</div>;

    return (<div >
            <nav className="flex py-5 justify-between">
                <Link to={`/posts/`}><p>back</p></Link>
                <div className="grid grid-cols-2 gap-x-5">
                    <button onClick={() => navigate(`/posts/${id}/update`)}> update </button>
                    <button onClick={() => onDelete.mutate()}> {onDelete.isPending ? "DELETING.." : "delete"} </button>
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