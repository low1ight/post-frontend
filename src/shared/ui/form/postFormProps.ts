import type {FieldError, Path, UseFormRegister} from "react-hook-form";
import type {PostFormValues} from "../../../features/posts/model/validators/post.validator.ts";

export type PostFormProps = {
    register: UseFormRegister<PostFormValues>;
    error?: FieldError;
    fieldName: Path<PostFormValues>;
    placeHolder?: string;
}