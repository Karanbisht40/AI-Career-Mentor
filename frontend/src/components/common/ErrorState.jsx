import Button from "../ui/Button.jsx";

export default function ErrorState({ title = "Something went wrong", message, onRetry }) {
    return (
        <div className="glass-panel rounded-3xl p-8 text-center">
            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{title}</h3>
            <p className="mt-2 text-sm text-slate-600 text-slate-600">{message}</p>
            {onRetry ? (
                <Button className="mt-6" onClick={onRetry}>
                    Try Again
                </Button>
            ) : null}
        </div>
    );
}
