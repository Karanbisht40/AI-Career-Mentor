export default function Select({ label, error, children, className = "", ...props }) {
    return (
        <label className="block">
            {label ? <span className="field-label">{label}</span> : null}
            <select className={`field-input ${className}`} {...props}>
                {children}
            </select>
            {error ? <span className="mt-2 block text-sm text-rose-500">{error}</span> : null}
        </label>
    );
}
