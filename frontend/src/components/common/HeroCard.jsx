import { motion } from "framer-motion";
import Button from "../ui/Button.jsx";
import { Link } from "react-router-dom";
import { Badge } from "../ui/Badge.jsx";

export default function HeroCard() {
    return (
        <section className="page-shell pt-10 sm:pt-14">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                <div className="space-y-6">
                    <Badge className="border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-200">
                        {/* Production-ready AI career support */}
                    </Badge>
                    <div className="space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white"
                        >
                            A polished career mentor that turns uncertainty into a plan.
                        </motion.h1>
                        <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg text-slate-600">
                            Build a profile, generate a roadmap, analyze resumes, and rehearse interviews from one cohesive dashboard.
                            The UI is optimized for focus, clarity, and fast iteration.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Link to="/register" className="primary-button">
                            Create Account
                        </Link>
                        <Link to="/dashboard" className="secondary-button">
                            Go to Dashboard
                        </Link>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                        {[
                            // ["JWT Auth", "Secure sessions with protected routes"],
                            // ["React Query", "Loading, caching, and retries built-in"],
                            // ["Zustand", "Lightweight auth and theme state"],
                        ].map(([title, text]) => (
                            <div key={title} className="glass-panel-soft rounded-3xl p-4">
                                <p className="font-semibold text-slate-950 dark:text-white">{title}</p>
                                <p className="mt-1 text-sm text-slate-600 text-slate-600">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="glass-panel rounded-[2rem] p-6"
                >
                    <div className="rounded-[1.5rem] bg-slate-950 p-5 text-black bg-white dark:text-slate-950">
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-1000 dark:text-slate-500">
                            Daily Focus
                        </p>
                        <h3 className="mt-3 text-2xl font-semibold">Next job-ready milestone</h3>
                        <p className="mt-2 text-sm text-slate-1000 dark:text-slate-600">
                            Suggest a target role, estimate the preparation window, and generate daily tasks.
                        </p>
                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                            {[
                                ["Roadmap", "12-week plan"],
                                ["Resume", "ATS optimization"],
                                ["Interview", "Behavioral drills"],
                                ["Chat", "Personalized mentor"],
                            ].map(([label, value]) => (
                                <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4 dark:border-slate-200 dark:bg-slate-50">
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{label}</p>
                                    <p className="mt-2 text-sm font-semibold">{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
