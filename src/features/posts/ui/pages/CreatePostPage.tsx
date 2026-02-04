import {defaultValues, type PostFormValues, postSchema} from "../../model/validators/post.validator.ts";
import {FormProvider, type SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {postsApi} from "../../api/posts.api.ts";
import {useNavigate} from "react-router-dom";
import {PostForm} from "../components/PostForm.tsx";

export function CreatePostPage() {

    const navigate = useNavigate();

    const form = useForm<PostFormValues>({
        resolver: zodResolver(postSchema),
        defaultValues: defaultValues,
    });

    const onSubmit: SubmitHandler<PostFormValues> = async (data) => {
        const createdPostId = await postsApi.createPost(data)
        if(createdPostId) {
            navigate(`/posts/${createdPostId}`);
        }

    };

    return (
        <FormProvider {...form}>
            <PostForm formName={"Create Post"} submitButtonName={"Create"} onSubmit={onSubmit} />
        </FormProvider>
    )

}

