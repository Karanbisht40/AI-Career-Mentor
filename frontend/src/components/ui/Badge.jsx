export function Badge({ children, className = "" }) {
    return (
        <span
            className={`inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 ${className}`}
        >
            {children}
        </span>
    );
}
