
import {object, string, type InferType} from 'yup';


export const postSchema = object({
    title: string()
        .min(5, "Title must be at least 5 characters")
        .max(30, "Title must be max 30 characters")
        .required(),
    description:
        string()
            .min(10, "Title must be at least 10 characters")
            .max(50, "Title must be max 50 characters")
            .required(),
    content:
        string()
            .min(30, "Content must be at least 30 characters")
            .max(500, "Content must be max 500 characters")
            .required(),
});


export const defaultValues: PostFormValues = {
    title: "",
    description: "",
    content: "",
}

export type PostFormValues = InferType<typeof postSchema>;