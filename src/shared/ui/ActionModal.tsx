import Button from "./Button.tsx";

type Props = {
    isLoading: boolean;
    buttonName: string;
    submittingText: string;
    onSubmit: () => void;
    onCancel: () => void;
}


export function ActionModal({onSubmit, buttonName, submittingText, onCancel, isLoading}: Props) {
    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center">

            <div className="absolute inset-0 bg-black/50" onClick={onCancel}></div>

            <div onClick={e => e.stopPropagation()}
                 className="relative min-w-md  p-10 card-dark">

                <h2 className="text-lg text-white font-semibold">Delete the post?</h2>
                <p className="mt-2 text-sm text-white">This action cannot be undone</p>
                <nav className="mt-5 flex justify-around items-center">

                    <Button className="w-2/5" variant={"secondary"} buttonName={"Cancel"} onClick={onCancel}/>

                    <Button className="w-2/5"
                            type={"button"}
                            variant={"danger"}
                            buttonName={buttonName}
                            isSubmitting={isLoading}
                            submittingText={submittingText}
                            onClick={onSubmit}/>
                </nav>

            </div>

        </div>
    )
}