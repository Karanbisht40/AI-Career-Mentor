export default function Textarea({ label, error, className = "", ...props }) {
    return (
        <label className="block">
            {label ? <span className="field-label">{label}</span> : null}
            <textarea className={`field-input min-h-32 resize-y ${className}`} {...props} />
            {error ? <span className="mt-2 block text-sm text-rose-500">{error}</span> : null}
        </label>
    );
}
