import type {PostFormProps} from "./postFormProps.ts";


export function FormInput({error,placeHolder,fieldName,register}:PostFormProps) {
    return (
        <div>
            <label className="form-label">Title</label>
            <input
                {...register(fieldName)}
                placeholder={placeHolder || ''}
                className={`form-input ${
                    error ? "form-input-error" : "form-input-focus"
                }`}
            />
            {error && <p className="form-error-message">{error.message}</p>}
        </div>
    )
}