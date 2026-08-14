import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

import ToolShell from "../../components/ai/ToolShell.jsx";
import Button from "../../components/ui/Button.jsx";

import { analyzeResume } from "../../services/ai.api.js";
import { getErrorMessage } from "../../utils/errors.js";

export default function ResumePage() {
    const [file, setFile] = useState(null);
    const [analysis, setAnalysis] = useState(null);

    const mutation = useMutation({
        mutationFn: analyzeResume,

        onSuccess: (data) => {
            setAnalysis(data?.analysis || null);
            toast.success("Resume analyzed successfully!");
        },

        onError: (error) => {
            toast.error(getErrorMessage(error));
        },
    });

    const handleFileChange = (event) => {
        const selectedFile = event.target.files?.[0];

        if (!selectedFile) {
            return;
        }

        if (selectedFile.type !== "application/pdf") {
            toast.error("Please upload a PDF file.");
            event.target.value = "";
            return;
        }

        if (selectedFile.size > 5 * 1024 * 1024) {
            toast.error("Resume must be smaller than 5 MB.");
            event.target.value = "";
            return;
        }

        setFile(selectedFile);
        setAnalysis(null);
    };

    const handleAnalyze = () => {
        if (!file) {
            toast.error("Please upload your resume first.");
            return;
        }

        mutation.mutate(file);
    };

    const handleClear = () => {
        setFile(null);
        setAnalysis(null);
    };

    return (
        <ToolShell
            title="Resume Analyzer"
            description="Upload your resume and get AI-powered ATS feedback, skill analysis, and improvement suggestions."
            aside={
                <div>
                    <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
                        Resume Analysis
                    </h3>

                    <div className="mt-5 min-h-[500px] rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950">

                        {!analysis ? (
                            <div className="flex min-h-[460px] items-center justify-center text-center">
                                <div>
                                    <div className="text-5xl">
                                        📄
                                    </div>

                                    <p className="mt-4 font-semibold text-slate-800 dark:text-white">
                                        No analysis yet
                                    </p>

                                    <p className="mt-2 max-w-sm text-sm text-slate-500">
                                        Upload your resume and click Analyze Resume to receive AI feedback.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">

                                {/* Score */}
                                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 text-center">
                                    <p className="text-sm font-medium text-slate-600">
                                        ATS Resume Score
                                    </p>

                                    <p className="mt-2 text-5xl font-bold text-blue-600">
                                        {analysis.score}
                                        <span className="text-2xl text-slate-400">
                                            /100
                                        </span>
                                    </p>
                                </div>

                                {/* Strengths */}
                                <AnalysisSection
                                    title="Strengths"
                                    icon="✅"
                                    items={analysis.strengths}
                                />

                                {/* Missing Skills */}
                                <AnalysisSection
                                    title="Missing Skills"
                                    icon="⚠️"
                                    items={analysis.missingSkills}
                                />

                                {/* Weak Areas */}
                                <AnalysisSection
                                    title="Weak Areas"
                                    icon="🔍"
                                    items={analysis.weakAreas}
                                />

                                {/* Suggestions */}
                                <AnalysisSection
                                    title="Suggestions"
                                    icon="💡"
                                    items={analysis.suggestions}
                                />

                                {/* Projects */}
                                <AnalysisSection
                                    title="Project Suggestions"
                                    icon="💻"
                                    items={analysis.projectSuggestions}
                                />

                                {/* Interview */}
                                <AnalysisSection
                                    title="Interview Preparation"
                                    icon="🎯"
                                    items={analysis.interviewPreparation}
                                />

                                {/* Summary */}
                                <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
                                    <h4 className="font-semibold text-slate-900 dark:text-white">
                                        📝 Improved Professional Summary
                                    </h4>

                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                                        {analysis.improvedSummary}
                                    </p>
                                </div>

                            </div>
                        )}

                    </div>
                </div>
            }
        >
            <div className="space-y-6">

                {/* Upload */}
                <div>
                    <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
                        Upload your resume
                    </h2>

                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        Upload your latest resume in PDF format.
                    </p>

                    <label
                        htmlFor="resume-upload"
                        className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center transition hover:border-blue-400 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-900"
                    >
                        <div className="text-4xl">
                            📄
                        </div>

                        <p className="mt-4 font-semibold text-slate-900 dark:text-white">
                            Click to upload your resume
                        </p>

                        <p className="mt-2 text-sm text-slate-500">
                            PDF only • Maximum 5 MB
                        </p>

                        <input
                            id="resume-upload"
                            type="file"
                            accept=".pdf,application/pdf"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>

                {/* Selected file */}
                {file && (
                    <div className="flex items-center justify-between rounded-2xl border border-blue-100 bg-blue-50 p-4">
                        <div className="flex items-center gap-3">
                            <div className="text-2xl">
                                📄
                            </div>

                            <div>
                                <p className="font-medium text-slate-900">
                                    {file.name}
                                </p>

                                <p className="text-sm text-slate-500">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleClear}
                            className="text-sm font-medium text-red-500 hover:text-red-600"
                        >
                            Remove
                        </button>
                    </div>
                )}

                {/* AI Features */}
                {/* <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <h3 className="font-semibold text-slate-900">
                        🤖 What AI will analyze
                    </h3>

                    <ul className="mt-4 space-y-2 text-sm text-slate-600">
                        <li>✓ ATS compatibility</li>
                        <li>✓ Technical skills</li>
                        <li>✓ Resume strengths</li>
                        <li>✓ Missing skills</li>
                        <li>✓ Project improvements</li>
                        <li>✓ Interview preparation</li>
                        <li>✓ Professional summary</li>
                    </ul>
                </div> */}

                {/* Analyze */}
                <Button
                    type="button"
                    className="w-full"
                    onClick={handleAnalyze}
                    disabled={!file || mutation.isPending}
                >
                    {mutation.isPending
                        ? "Analyzing Resume..."
                        : "🤖 Analyze Resume"}
                </Button>

            </div>
        </ToolShell>
    );
}

function AnalysisSection({ title, icon, items }) {
    if (!Array.isArray(items) || items.length === 0) {
        return null;
    }

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
            <h4 className="font-semibold text-slate-900 dark:text-white">
                {icon} {title}
            </h4>

            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {items.map((item, index) => (
                    <li key={index}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}