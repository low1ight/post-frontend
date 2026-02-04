import {defaultValues, type PostFormValues, postSchema} from "../../model/validators/post.validator.ts";
import {FormProvider, type SubmitHandler, useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import {PostForm} from "../components/PostForm.tsx";
import {yupResolver} from "@hookform/resolvers/yup";
import {useGetPostByIdQuery, useUpdatePostByIdMutation} from "../../api/post.api.ts";

export function UpdatePostPage() {

    const navigate = useNavigate();
    const {id} = useParams<{ id: string }>();

    const {data, isLoading, error} = useGetPostByIdQuery(id!)
    const [updatePost] = useUpdatePostByIdMutation()


    const form = useForm<PostFormValues>({
        resolver: yupResolver(postSchema),
        values: data ? {
            title: data.title,
            description: data.description,
            content: data.content
        } : defaultValues,
    });

    if(isLoading) return <div>Loading</div>;
    if(error) return <div>Error</div>;
    if(!data) return <div>NOT FOUND</div>



    const onSubmit: SubmitHandler<PostFormValues> = async (data) => {
        try {
            await updatePost({...data, id: id!})
            navigate(`/posts/${id}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <FormProvider {...form}>
            <PostForm formName={"Update Post"} submitButtonName={"Update"} onSubmit={onSubmit} />
        </FormProvider>
    )

}

