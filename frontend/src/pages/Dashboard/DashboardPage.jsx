import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchCurrentUser } from "../../services/user.api.js";
import { queryKeys } from "../../utils/queryKeys.js";
import { getErrorMessage } from "../../utils/errors.js";
import LoadingState from "../../components/common/LoadingState.jsx";
import ErrorState from "../../components/common/ErrorState.jsx";
import StatCard from "../../components/common/StatCard.jsx";
import SectionHeader from "../../components/common/SectionHeader.jsx";
import { Card } from "../../components/ui/Card.jsx";
import { Badge } from "../../components/ui/Badge.jsx";

export default function DashboardPage() {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: queryKeys.currentUser,
        queryFn: fetchCurrentUser,
    });

    if (isLoading) {
        return <div className="page-shell py-8"><LoadingState /></div>;
    }

    if (error) {
        return (
            <div className="page-shell py-8">
                <ErrorState message={getErrorMessage(error)} onRetry={refetch} />
            </div>
        );
    }

    const user = data?.user;

    return (
        <div className="page-shell py-8 space-y-8">
            <SectionHeader
                // eyebrow="Dashboard"
                title={`Welcome back, ${user?.name || "there"}`}
                description="Track the next action across profile, roadmap, resume, and interview prep from a single workspace."
            />

            <div className="grid gap-4 md:grid-cols-3">
                <StatCard label="Role focus" value={user?.careerGoal || "Not set"} hint="Update this from your profile." />
                <StatCard label="Skills listed" value={user?.currentSkills?.length || 0} hint="Skills improve roadmap quality." />
                <StatCard label="Study plan" value={`${user?.dailyStudyHours || 0}h/day`} hint="Consistent pacing wins." />
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <Card className="p-6">
                    <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Today’s focus</h3>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        {[
                            ["Profile", "Keep your career goal and skill set current."],
                            ["Roadmap", "Translate your target role into weekly milestones."],
                            ["Resume", "Fix gaps before applying to live roles."],
                            ["Interview", "Train answers that sound confident and specific."],
                        ].map(([title, text]) => (
                            <div key={title} className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-900/60">
                                <p className="font-semibold text-slate-950 dark:text-white">{title}</p>
                                <p className="mt-2 text-sm text-slate-600 text-slate-600">{text}</p>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-6">
                    <Badge className="mb-4">Quick Actions</Badge>
                    <div className="space-y-3">
                        <Link className="secondary-button w-full" to="/profile">Update Profile</Link>
                        <Link className="secondary-button w-full" to="/roadmap">Generate Roadmap</Link>
                        <Link className="secondary-button w-full" to="/resume">Analyze Resume</Link>
                        <Link className="secondary-button w-full" to="/interview">Start Interview Simulator</Link>
                    </div>
                </Card>
            </div>
        </div>
    );
}
