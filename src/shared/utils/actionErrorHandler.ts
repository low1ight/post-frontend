import toast from "react-hot-toast";

export function actionErrorHandler(error: unknown) {
    let errorMsg: string;
    if (error instanceof Error) {
        errorMsg = error.message
    } else {
        errorMsg = "An unexpected error occurred"
    }
    toast.error(errorMsg)
}