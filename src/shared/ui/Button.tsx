import type {ButtonHTMLAttributes} from "react";

type Variant = "primary" | "secondary" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    isSubmitting?: boolean;
    submittingText?: string;
    buttonName?: string
};

const base =
    `inline-flex 
    items-center 
    justify-center 
    rounded-lg 
    px-3 
    py-2 
    text-sm 
    font-medium 
    transition 
    focus:outline-none 
    focus:ring-2 
    cursor-pointer
    focus:ring-black/20`;

const variants: Record<Variant, string> = {
    primary: "bg-black text-white hover:bg-black/90",
    secondary: "bg-blue-500 text-white hover:bg-blue-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
};

function Button({
                    variant = "primary",
                    isSubmitting = false,
                    submittingText = 'Saving...',
                    buttonName = '',
                    className = "",
                    ...props
                }: ButtonProps) {


    return (
        <button
            className={`${base} ${variants[variant]} ${className}`}
            {...props}
        >
            {isSubmitting ? (
                    <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        {submittingText}
                </span>)
                :
                (buttonName)}
        </button>
    );
}


export default Button;