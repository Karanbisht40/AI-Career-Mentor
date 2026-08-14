import { Card } from "../ui/Card.jsx";

export default function ToolShell({
    title,
    description,
    children,
    aside,
}) {
    return (
        <div className="page-shell py-8">
            <div className="grid gap-6 lg:grid-cols-2">

                <Card className="p-8">
                    {/* <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
                        AI Tool
                    </p> */}

                    <h1 className="section-title mt-3">
                        {title}
                    </h1>

                    <p className="section-subtitle">
                        {description}
                    </p>

                    <div className="mt-8">
                        {children}
                    </div>
                </Card>

                <Card className="max-h-[85vh] overflow-y-auto p-8">
                    {aside}
                </Card>

            </div>
        </div>
    );
}