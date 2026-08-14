import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ToolShell from "../../components/ai/ToolShell.jsx";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import Select from "../../components/ui/Select.jsx";
import Textarea from "../../components/ui/Textarea.jsx";
import { generateRoadmap } from "../../services/ai.api.js";
import { getErrorMessage } from "../../utils/errors.js";

const defaultValues = {
    careerGoal: "",
    experienceLevel: "Beginner",
    currentSkills: "",
    dailyStudyHours: 2,
    targetMonths: 6,
};

const normalizeRoadmap = (data) => {
    const rawRoadmap = data?.roadmap ?? data;

    if (Array.isArray(rawRoadmap)) {
        return rawRoadmap;
    }

    if (typeof rawRoadmap === "string") {
        try {
            const parsed = JSON.parse(rawRoadmap);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }

    return [];
};

export default function RoadmapPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues,
    });

    const [roadmap, setRoadmap] = useState([]);

    const mutation = useMutation({
        mutationFn: generateRoadmap,

        onSuccess: (data) => {
            setRoadmap(normalizeRoadmap(data));

            toast.success("Roadmap generated!");
        },

        onError: (error) => {
            toast.error(getErrorMessage(error));
        },
    });

    const onSubmit = (values) => {
        mutation.mutate({
            ...values,
            currentSkills: values.currentSkills
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean),
        });
    };

    return (
        <ToolShell
            title="AI Roadmap Builder"
            description="Create a practical month-by-month roadmap tailored to your goal, skills, and study capacity."
            aside={
                <div>
                    <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
                        Generated roadmap
                    </h3>

<div className="mt-5 space-y-4 rounded-3xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-950/40">                        {roadmap.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-slate-300 bg-white/80 p-5 text-sm leading-6 text-slate-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
                                Your roadmap cards will appear here after you submit the form.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {roadmap.map((item, index) => {
                                    const topics = Array.isArray(item.topics)
                                        ? item.topics
                                        : typeof item.topics === "string"
                                            ? item.topics.split(",").map((topic) => topic.trim()).filter(Boolean)
                                            : [];

                                    return (
                                        <article
                                            key={`${item.month ?? index}-${item.title ?? "roadmap"}`}
                                            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">
                                                        Month {item.month ?? index + 1}
                                                    </p>
                                                    <h4 className="mt-2 text-lg font-semibold text-slate-950 dark:text-slate-50">
                                                        {item.title || "Roadmap milestone"}
                                                    </h4>
                                                </div>
                                            </div>

                                            <div className="mt-4 space-y-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                                <div>
                                                    <p className="font-semibold text-slate-900 dark:text-slate-100">Topics</p>
                                                    {topics.length > 0 ? (
                                                        <ul className="mt-2 flex flex-wrap gap-2">
                                                            {topics.map((topic) => (
                                                                <li
                                                                    key={topic}
                                                                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                                                                >
                                                                    {topic}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <p className="mt-2 text-slate-500">No topics provided.</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-slate-900 dark:text-slate-100">Project</p>
                                                    <p className="mt-2">{item.project || "No project provided."}</p>
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-slate-900 dark:text-slate-100">Goal</p>
                                                    <p className="mt-2">{item.goal || "No goal provided."}</p>
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            }
        >
            <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label="Career Goal"
                    placeholder="e.g. Frontend Engineer"
                    error={errors.careerGoal?.message}
                    {...register("careerGoal", {
                        required: "Career goal is required.",
                    })}
                />

                <Select
                    label="Experience Level"
                    error={errors.experienceLevel?.message}
                    {...register("experienceLevel", {
                        required: "Experience level is required.",
                    })}
                >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </Select>

                <Textarea
                    label="Current Skills"
                    placeholder="React, JavaScript, CSS"
                    error={errors.currentSkills?.message}
                    {...register("currentSkills", {
                        required: "Current skills are required.",
                    })}
                />

                <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                        label="Daily Study Hours"
                        type="number"
                        min="1"
                        step="0.5"
                        placeholder="2"
                        error={errors.dailyStudyHours?.message}
                        {...register("dailyStudyHours", {
                            required: "Daily study hours are required.",
                            valueAsNumber: true,
                            min: {
                                value: 1,
                                message: "Enter at least 1 hour per day.",
                            },
                        })}
                    />

                    <Input
                        label="Target Months"
                        type="number"
                        min="1"
                        step="1"
                        placeholder="6"
                        error={errors.targetMonths?.message}
                        {...register("targetMonths", {
                            required: "Target months are required.",
                            valueAsNumber: true,
                            min: {
                                value: 1,
                                message: "Enter at least 1 month.",
                            },
                        })}
                    />
                </div>

                {/* <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-5 text-sm leading-6 text-slate-600 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-300">
                    The roadmap will be generated month by month and displayed as cards with topics, a project, and a goal for each step.
                </div> */}

                <Button type="submit" className="w-full" disabled={mutation.isPending}>
                    {mutation.isPending ? "Generating roadmap..." : "Generate Roadmap"}
                </Button>
            </form>
        </ToolShell>
    );
}