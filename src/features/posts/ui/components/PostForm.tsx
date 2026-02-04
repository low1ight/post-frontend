import {type SubmitHandler, useFormContext} from "react-hook-form";
import type {PostFormValues} from "../../model/validators/post.validator.ts";

type Props = {
    onSubmit: SubmitHandler<PostFormValues>,
    submitButtonName: string
    formName: string
}

export function PostForm({ formName, onSubmit, submitButtonName } :Props) {

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useFormContext<PostFormValues>();


    return (
        <div className="max-w-lg mx-auto p-6 card-dark">
            <h2 className="text-xl font-bold text-white mb-6">{formName}</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">


                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Title</label>
                    <input
                        {...register("title")}
                        placeholder="Post Title"
                        className={`w-full p-2 bg-transparent border rounded-lg text-white outline-none transition-colors ${
                            errors.title ? "border-red-500" : "border-white/10 focus:border-blue-500"
                        }`}
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                </div>


                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
                    <textarea
                        {...register("description")}
                        rows={4}
                        placeholder="Description..."
                        className="w-full p-2 bg-transparent border border-white/10 rounded-lg text-white outline-none focus:border-blue-500"
                    />
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Content</label>
                    <textarea
                        {...register("content")}
                        rows={6}
                        placeholder="Content..."
                        className="w-full p-2 bg-transparent border border-white/10 rounded-lg text-white outline-none focus:border-blue-500"
                    />
                    {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                    {isSubmitting ? "SUBMITTING" : submitButtonName}
                </button>
            </form>
        </div>


    )
}