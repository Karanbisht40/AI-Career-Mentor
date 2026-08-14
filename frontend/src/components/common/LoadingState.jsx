import { Skeleton } from "../ui/Skeleton.jsx";

export default function LoadingState() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-10 w-56" />
            <Skeleton className="h-64 w-full" />
            <div className="grid gap-4 md:grid-cols-3">
                <Skeleton className="h-32" />
                <Skeleton className="h-32" />
                <Skeleton className="h-32" />
            </div>
        </div>
    );
}
