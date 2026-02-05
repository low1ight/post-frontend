import {defaultValues, type PostFormValues, postSchema} from "../../model/validators/post.validator.ts";
import {FormProvider, type SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {PostForm} from "../components/PostForm.tsx";
import {yupResolver} from "@hookform/resolvers/yup";
import {useCreatePostMutation} from "../../api/post.api.ts";
import {ReturnLink} from "../../../../shared/ui/ReturnLink.tsx";

export function CreatePostPage() {

    const navigate = useNavigate();

    const [createPost] = useCreatePostMutation()

    const form = useForm<PostFormValues>({
        resolver: yupResolver(postSchema),
        defaultValues: defaultValues,
    });

    const onSubmit: SubmitHandler<PostFormValues> = async (data) => {
        try {
            const result = await createPost(data)
            navigate(`/posts/${result.data}`);
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="max-w-lg mx-auto">
            <nav className="mb-3">
                <ReturnLink name={"← Back to Posts list"} to={'/posts'}/>
            </nav>

            <FormProvider {...form}>
                <PostForm formName={"Create Post"} submittingText={"Creating"} submitButtonName={"Create"} onSubmit={onSubmit}/>
            </FormProvider>
        </div>
    )


}

