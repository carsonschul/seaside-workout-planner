export default function Button({
    children,
    onClick,
    variant = "sky",
    className = "",
    type = "button",
    disabled = false,
}) {
    const baseStyles =
        "text-white text-shadow-lg text-lg px-4 py-2 rounded-lg shadow-lg cursor-pointer transition-colors duration-200 border-2";

    const variants = {
        sky: "bg-sky-400 hover:bg-sky-500 border-sky-600",
        red: "bg-red-400 hover:bg-red-500 border-red-600",
        amber: "bg-amber-400 hover:bg-amber-500 border-amber-600",
    };

    const disabledStyles = "opacity-50 cursor-not-allowed";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${disabled ? disabledStyles : ""
                } ${className}`}
        >
            {children}
        </button>
    );
}