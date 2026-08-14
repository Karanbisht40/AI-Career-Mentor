import { Card } from "../ui/Card.jsx";

export default function StatCard({ label, value, hint }) {
    return (
        <Card className="p-5">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">{value}</p>
            {hint ? <p className="mt-2 text-sm text-slate-600 text-slate-600">{hint}</p> : null}
        </Card>
    );
}
