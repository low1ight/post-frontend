import type {PostFormProps} from "./postFormProps.ts";


export function FormTextarea({error,placeHolder,fieldName,register,rows = 4}:PostFormProps & {rows?:number}) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
            <textarea
                {...register(fieldName)}
                rows={rows}
                placeholder={placeHolder}
                className={`form-input ${
                    error ? "form-input-error" : "form-input-focus"
                }`}
            />
            {error && <p className="form-error-message">{error.message}</p>}
        </div>
    )
}