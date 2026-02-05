import {type SubmitHandler, useFormContext} from "react-hook-form";
import type {PostFormValues} from "../../model/validators/post.validator.ts";
import {FormInput} from "../../../../shared/ui/form/FormInput.tsx";
import {FormTextarea} from "../../../../shared/ui/form/FormTextarea.tsx";
import Button from "../../../../shared/ui/Button.tsx";

type Props = {
    onSubmit: SubmitHandler<PostFormValues>
    submitButtonName: string
    formName: string
    submittingText? :string
}

export function PostForm({formName,submittingText, onSubmit, submitButtonName}: Props) {

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useFormContext<PostFormValues>();


    return (
        <div className="p-6 card-dark">
            <h2 className="text-xl font-bold text-white mb-6">{formName}</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <FormInput error={errors.title} placeHolder={'Title..'} fieldName={"title"} register={register}/>

                <FormTextarea error={errors.description} placeHolder={'Description...'} fieldName={"description"}
                              register={register}/>

                <FormTextarea error={errors.content} placeHolder={'Content...'} fieldName={"content"}
                              register={register} rows={6}/>

                <Button className={'w-full'} isSubmitting={isSubmitting} type={"submit"} variant={"secondary"}
                        buttonName={submitButtonName} submittingText={submittingText}/>

            </form>
        </div>


    )
}