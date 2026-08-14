export default function Button({
    children,
    type = "button",
    variant = "primary",
    className = "",
    ...props
}) {
    const styles =
        variant === "secondary" ? "secondary-button" : "primary-button";

    return (
        <button type={type} className={`${styles} ${className}`} {...props}>
            {children}
        </button>
    );
}
