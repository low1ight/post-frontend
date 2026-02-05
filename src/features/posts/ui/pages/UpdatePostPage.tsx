import {defaultValues, type PostFormValues, postSchema} from "../../model/validators/post.validator.ts";
import {FormProvider, type SubmitHandler, useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import {PostForm} from "../components/PostForm.tsx";
import {yupResolver} from "@hookform/resolvers/yup";
import {useGetPostByIdQuery, useUpdatePostByIdMutation} from "../../api/post.api.ts";
import {ReturnLink} from "../../../../shared/ui/ReturnLink.tsx";
import {NotFound} from "../../../../shared/ui/NotFound.tsx";
import toast from "react-hot-toast";

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

    if (isLoading) return <div></div>;

    if (!isLoading && !data || error) return <NotFound />


    const onSubmit: SubmitHandler<PostFormValues> = async (data) => {
        try {
            await updatePost({...data, id: id!})
            navigate(`/posts/${id}`);
            toast.success("Updated!")
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unexpected error occurred");
            }
        }
    };

    return (
        <div className="max-w-lg mx-auto">
            <nav className="mb-3">
                <ReturnLink name={"← Return"} to={`/posts/${id}`}/>
            </nav>
            <FormProvider {...form}>
                <PostForm formName={"Update Post"} submittingText={"Updating"} submitButtonName={"Update"} onSubmit={onSubmit}/>
            </FormProvider>
        </div>
    )

}

