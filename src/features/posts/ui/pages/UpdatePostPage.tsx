import {defaultValues, type PostFormValues, postSchema} from "../../model/validators/post.validator.ts";
import {FormProvider, type SubmitHandler, useForm} from "react-hook-form";
import {postsApi} from "../../api/posts.api.ts";
import {useNavigate, useParams} from "react-router-dom";
import {PostForm} from "../components/PostForm.tsx";
import {useQuery} from "@tanstack/react-query";
import type {PostType} from "../../model/post.type.ts";
import {yupResolver} from "@hookform/resolvers/yup";

export function UpdatePostPage() {

    const navigate = useNavigate();
    const {id} = useParams<{ id: string }>();

    const {data, isLoading, error} = useQuery<PostType>({
        queryKey: ['post', id],
        queryFn: () => postsApi.getById(id!),
    });

    const form = useForm<PostFormValues>({
        resolver: yupResolver(postSchema),
        values: data ? {
            title: data.title,
            description: data.description,
            content: data.content
        } : defaultValues,
    });

    if(isLoading) return <div>Loading</div>;
    if(error) return <div>Error: {error.message}</div>;
    if(!data) return <div>NOT FOUND</div>



    const onSubmit: SubmitHandler<PostFormValues> = async (data) => {
        const isUpdated = await postsApi.updatePost(data, id!)
        if(isUpdated) {
            navigate(`/posts/${id}`);
        }

    };

    return (
        <FormProvider {...form}>
            <PostForm formName={"Update Post"} submitButtonName={"Update"} onSubmit={onSubmit} />
        </FormProvider>
    )

}

