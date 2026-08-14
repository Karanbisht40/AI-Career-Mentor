import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Button from "../../components/ui/Button.jsx";
import {
    generateInterviewQuestion,
    evaluateInterviewAnswer,
} from "../../services/ai.api.js";
import { getErrorMessage } from "../../utils/errors.js";

export default function InterviewPage() {
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const recognitionRef = useRef(null);

    const [role, setRole] = useState("");
    const [started, setStarted] = useState(false);

    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState("");

    const [evaluation, setEvaluation] = useState(null);

    const [cameraError, setCameraError] = useState("");

    const [isListening, setIsListening] = useState(false);
    const [interimAnswer, setInterimAnswer] = useState("");

    const [isSpeaking, setIsSpeaking] = useState(false);

    // -----------------------------
    // AI VOICE
    // -----------------------------

    const speakQuestion = (text) => {
        if (!text || !window.speechSynthesis) {
            return;
        }

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        utterance.lang = "en-US";
        utterance.rate = 0.95;
        utterance.pitch = 1;
        utterance.volume = 1;

        utterance.onstart = () => {
            setIsSpeaking(true);
        };

        utterance.onend = () => {
            setIsSpeaking(false);
        };

        utterance.onerror = () => {
            setIsSpeaking(false);
        };

        window.speechSynthesis.speak(utterance);
    };

    // -----------------------------
    // GENERATE QUESTION
    // -----------------------------

    const questionMutation = useMutation({
        mutationFn: generateInterviewQuestion,

        onSuccess: (data) => {
            console.log("Interview question:", data);

            const newQuestion = data?.question;

            setQuestion(newQuestion);
            setEvaluation(null);
            setAnswer("");

            if (newQuestion?.question) {
                setTimeout(() => {
                    speakQuestion(newQuestion.question);
                }, 300);
            }
        },

        onError: (error) => {
            console.error(error);
            toast.error(getErrorMessage(error));
        },
    });

    // -----------------------------
    // EVALUATE ANSWER
    // -----------------------------

    const evaluationMutation = useMutation({
        mutationFn: evaluateInterviewAnswer,

        onSuccess: (data) => {
            console.log("Evaluation:", data);

            setEvaluation(data?.evaluation || null);

            toast.success("Answer evaluated!");
        },

        onError: (error) => {
            console.error(error);
            toast.error(getErrorMessage(error));
        },
    });

    // -----------------------------
    // CAMERA
    // -----------------------------

    const startCamera = async () => {
        try {
            setCameraError("");

            const stream =
                await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });

            streamRef.current = stream;

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error("Camera error:", error);

            setCameraError(
                "Camera or microphone permission was denied."
            );
        }
    };

    // -----------------------------
    // START INTERVIEW
    // -----------------------------

    const handleStartInterview = async () => {
        if (!role.trim()) {
            toast.error("Please enter your target role.");
            return;
        }

        setStarted(true);

        await startCamera();

        questionMutation.mutate(role);
    };

    // -----------------------------
    // SPEECH RECOGNITION
    // -----------------------------

    const startListening = () => {
        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            toast.error(
                "Speech recognition is not supported. Please use Chrome."
            );

            return;
        }

        const recognition = new SpeechRecognition();

        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognitionRef.current = recognition;

        recognition.onstart = () => {
            setIsListening(true);
            setInterimAnswer("");
        };

        recognition.onresult = (event) => {
            let finalText = "";
            let temporaryText = "";

            for (
                let i = event.resultIndex;
                i < event.results.length;
                i++
            ) {
                const transcript =
                    event.results[i][0].transcript;

                if (event.results[i].isFinal) {
                    finalText += transcript + " ";
                } else {
                    temporaryText += transcript;
                }
            }

            if (finalText) {
                setAnswer((previous) =>
                    `${previous} ${finalText}`.trim()
                );
            }

            setInterimAnswer(temporaryText);
        };

        recognition.onerror = (event) => {
            console.error(
                "Speech recognition error:",
                event.error
            );

            setIsListening(false);

            if (event.error === "not-allowed") {
                toast.error(
                    "Microphone permission was denied."
                );
            }
        };

        recognition.onend = () => {
            setIsListening(false);
            setInterimAnswer("");
        };

        recognition.start();
    };

    // -----------------------------
    // STOP LISTENING
    // -----------------------------

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            recognitionRef.current = null;
        }

        setIsListening(false);
        setInterimAnswer("");
    };

    // -----------------------------
    // SUBMIT ANSWER
    // -----------------------------

    const handleSubmitAnswer = () => {
        stopListening();

        if (!answer.trim()) {
            toast.error("Please provide your answer.");
            return;
        }

        if (!question?.question) {
            toast.error("No interview question available.");
            return;
        }

        evaluationMutation.mutate({
            role,
            question: question.question,
            answer,
        });
    };

    // -----------------------------
    // NEXT QUESTION
    // -----------------------------

    const handleNextQuestion = () => {
        stopListening();

        setAnswer("");
        setEvaluation(null);
        setInterimAnswer("");

        questionMutation.mutate(role);
    };

    // -----------------------------
    // CLEANUP
    // -----------------------------

    useEffect(() => {
        return () => {
            window.speechSynthesis?.cancel();

            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }

            if (streamRef.current) {
                streamRef.current
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    // -----------------------------
    // UI
    // -----------------------------

    return (
        <div className="page-shell py-6">
            <div className="mx-auto max-w-6xl">

                {/* HEADER */}

                <div className="mb-6">
                    {/* <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                        AI Interview
                    </p> */}

                    <h1 className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">
                        AI Mock Interview
                    </h1>

                    <p className="mt-2 text-slate-600 dark:text-slate-300">
                        Practice technical interviews with an AI interviewer.
                    </p>
                </div>

                {/* START SCREEN */}

                {!started && (
                    <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">

                        <div className="text-center">

                            <div className="text-6xl">
                                🎤
                            </div>

                            <h2 className="mt-5 text-2xl font-bold text-slate-950 dark:text-white">
                                Start Your Mock Interview
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                The AI interviewer will ask technical
                                questions based on your selected role.
                            </p>

                        </div>

                        <div className="mt-8">

                            <label className="block">

                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Target Role
                                </span>

                                <input
                                    value={role}
                                    onChange={(event) =>
                                        setRole(event.target.value)
                                    }
                                    placeholder="e.g. AI Engineer"
                                    className="mt-2 w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                />

                            </label>

                        </div>

                        <Button
                            className="mt-6 w-full"
                            onClick={handleStartInterview}
                            disabled={questionMutation.isPending}
                        >
                            {questionMutation.isPending
                                ? "Starting Interview..."
                                : "🎤 Start Interview"}
                        </Button>

                    </div>
                )}

                {/* INTERVIEW */}

                {started && (
                    <div className="space-y-6">

                        {/* AI + USER */}

                        <div className="grid gap-6 lg:grid-cols-2">

                            {/* AI */}

                            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">

                                <div className="border-b border-slate-200 p-4 dark:border-slate-800">

                                    <p className="font-semibold text-slate-900 dark:text-white">
                                        🤖 AI Interviewer
                                    </p>

                                </div>

                                <div className="flex min-h-[360px] flex-col items-center justify-center bg-slate-950 p-8">

                                    {/* AVATAR */}

                                    <div className="relative flex h-64 w-64 items-center justify-center">

                                        {isSpeaking && (
                                            <>
                                                <div className="absolute h-64 w-64 animate-ping rounded-full border border-blue-400/30" />

                                                <div
                                                    className="absolute h-52 w-52 rounded-full border-2 border-blue-400/40"
                                                    style={{
                                                        animation:
                                                            "pulse 1s ease-in-out infinite",
                                                    }}
                                                />

                                                <div
                                                    className="absolute h-44 w-44 rounded-full border-2 border-blue-500/60"
                                                    style={{
                                                        animation:
                                                            "pulse 0.7s ease-in-out infinite",
                                                    }}
                                                />
                                            </>
                                        )}

                                        <div
                                            className={`relative z-10 flex h-40 w-40 items-center justify-center rounded-full bg-slate-900 text-7xl transition-all duration-300 ${
                                                isSpeaking
                                                    ? "scale-105 shadow-[0_0_70px_rgba(59,130,246,0.7)]"
                                                    : "shadow-[0_0_30px_rgba(59,130,246,0.25)]"
                                            }`}
                                        >
                                            🤖
                                        </div>

                                    </div>

                                    <p className="mt-6 text-sm font-medium text-white">
                                        {isSpeaking
                                            ? "🔊 AI is speaking..."
                                            : "🤖 AI Interviewer"}
                                    </p>

                                    {questionMutation.isPending && (
                                        <p className="mt-2 text-sm text-slate-400">
                                            Thinking...
                                        </p>
                                    )}

                                </div>

                            </div>

                            {/* USER */}

                            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">

                                <div className="border-b border-slate-200 p-4 dark:border-slate-800">

                                    <p className="font-semibold text-slate-900 dark:text-white">
                                        👤 You
                                    </p>

                                </div>

                                <div className="relative min-h-[360px] bg-black">

                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        muted
                                        playsInline
                                        className="h-full min-h-[360px] w-full object-cover"
                                    />

                                    {cameraError && (
                                        <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm text-white">
                                            {cameraError}
                                        </div>
                                    )}

                                </div>

                            </div>

                        </div>

                        {/* QUESTION */}

                        <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950/30">

                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                                Interview Question
                            </p>

                            <h2 className="mt-3 text-xl font-semibold leading-8 text-slate-950 dark:text-white">
                                {questionMutation.isPending
                                    ? "Preparing your question..."
                                    : question?.question ||
                                      "Waiting for question..."}
                            </h2>

                            {question && (
                                <div className="mt-4 flex gap-3">

                                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600">
                                        {question.topic}
                                    </span>

                                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600">
                                        {question.difficulty}
                                    </span>

                                </div>
                            )}

                        </div>

                        {/* ANSWER */}

     {question && !evaluation && (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">

        {/* Header */}
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    🎤 Your Answer
                </p>

                <p className="text-xs text-slate-500">
                    Speak naturally
                </p>
            </div>

            <span
                className={`h-2.5 w-2.5 rounded-full ${
                    isListening
                        ? "animate-pulse bg-red-500"
                        : "bg-slate-300"
                }`}
            />
        </div>

        {/* Answer text */}
        <div className="mt-3 h-16 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-900">

            {answer || interimAnswer ? (
                <p className="text-sm leading-5 text-slate-700 dark:text-slate-300">
                    {answer}

                    {interimAnswer && (
                        <span className="text-slate-400">
                            {" "}{interimAnswer}
                        </span>
                    )}
                </p>
            ) : (
                <p className="text-xs text-slate-400">
                    Your spoken answer will appear here...
                </p>
            )}

        </div>

        {/* Controls */}
        <div className="mt-3 flex items-center justify-between">

            <div className="flex items-center gap-2">

                {!isListening ? (
                    <button
                        type="button"
                        onClick={startListening}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-lg text-white transition hover:bg-blue-700"
                    >
                        🎤
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={stopListening}
                        className="flex h-10 w-10 animate-pulse items-center justify-center rounded-full bg-red-500 text-lg text-white"
                    >
                        ⏹
                    </button>
                )}

                <span className="text-xs text-slate-500">
                    {isListening
                        ? "Listening..."
                        : "Click to speak"}
                </span>

            </div>

            <Button
                onClick={handleSubmitAnswer}
                disabled={
                    evaluationMutation.isPending ||
                    !answer.trim()
                }
            >
                {evaluationMutation.isPending
                    ? "Evaluating..."
                    : "Submit Answer"}
            </Button>

        </div>

    </div>
)}

                        {/* EVALUATION */}

                        {evaluation && (
                            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">

                                <div className="text-center">

                                    <p className="text-sm font-medium text-slate-500">
                                        Your Score
                                    </p>

                                    <p className="mt-2 text-5xl font-bold text-blue-600">
                                        {evaluation.score}
                                        <span className="text-2xl text-slate-400">
                                            /10
                                        </span>
                                    </p>

                                </div>

                                <div className="mt-6">

                                    <h3 className="font-semibold text-slate-900 dark:text-white">
                                        💬 Feedback
                                    </h3>

                                    <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">
                                        {evaluation.feedback}
                                    </p>

                                </div>

                                <div className="mt-6">

                                    <h3 className="font-semibold text-slate-900 dark:text-white">
                                        ✅ Strengths
                                    </h3>

                                    <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600 dark:text-slate-300">

                                        {evaluation.strengths?.map(
                                            (item, index) => (
                                                <li key={index}>
                                                    {item}
                                                </li>
                                            )
                                        )}

                                    </ul>

                                </div>

                                <div className="mt-6">

                                    <h3 className="font-semibold text-slate-900 dark:text-white">
                                        🎯 Improvements
                                    </h3>

                                    <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600 dark:text-slate-300">

                                        {evaluation.improvements?.map(
                                            (item, index) => (
                                                <li key={index}>
                                                    {item}
                                                </li>
                                            )
                                        )}

                                    </ul>

                                </div>

                                <div className="mt-6 rounded-2xl bg-slate-50 p-5 dark:bg-slate-900">

                                    <h3 className="font-semibold text-slate-900 dark:text-white">
                                        💡 Ideal Answer
                                    </h3>

                                    <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">
                                        {evaluation.idealAnswer}
                                    </p>

                                </div>

                                <Button
                                    className="mt-6 w-full"
                                    onClick={handleNextQuestion}
                                    disabled={questionMutation.isPending}
                                >
                                    {questionMutation.isPending
                                        ? "Preparing..."
                                        : "Next Question →"}
                                </Button>

                            </div>
                        )}

                    </div>
                )}

            </div>
        </div>
    );
}