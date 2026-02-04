import {z} from "zod";

export const postSchema = z.object({
    title: z
        .string()
        .min(5, "Title must be at least 5 characters")
        .max(30, "Title must be max 30 characters"),
    description: z
        .string()
        .min(10, "Title must be at least 10 characters")
        .max(50, "Title must be max 50 characters"),
    content: z
        .string()
        .min(30, "Content must be at least 30 characters")
        .max(500, "Content must be max 500 characters"),
});

export const defaultValues:PostFormValues = {
    title: "",
    description: "",
    content: "",
}

export type PostFormValues = z.infer<typeof postSchema>;