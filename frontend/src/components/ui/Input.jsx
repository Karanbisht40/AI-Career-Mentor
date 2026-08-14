export default function Input({ label, error, className = "", ...props }) {
    return (
        <label className="block">
            {label ? <span className="field-label">{label}</span> : null}
            <input className={`field-input ${className}`} {...props} />
            {error ? <span className="mt-2 block text-sm text-rose-500">{error}</span> : null}
        </label>
    );
}
