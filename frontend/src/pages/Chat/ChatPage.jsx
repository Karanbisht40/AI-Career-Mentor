import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Textarea from "../../components/ui/Textarea.jsx";
import Button from "../../components/ui/Button.jsx";
import { generateCareerChat } from "../../services/ai.api.js";
import { getErrorMessage } from "../../utils/errors.js";

export default function ChatPage() {
    const [messages, setMessages] = useState([]);
    const bottomRef = useRef(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: { message: "" },
    });
    const submitChat = handleSubmit((values) => mutation.mutate(values));

    const mutation = useMutation({
        mutationFn: generateCareerChat,
        onSuccess: (data, variables) => {
            setMessages((prev) => [
                ...prev,
                {
                    sender: "user",
                    text: variables.message,
                },
                {
                    sender: "ai",
                    text: data.reply,
                },
            ]);

            reset();

            toast.success("Mentor response generated");
        },
        onError: (error) => toast.error(getErrorMessage(error)),
    });

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, [messages, mutation.isPending]);

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            if (!mutation.isPending) {
                submitChat();
            }
        }
    };

    return (
        <div className="page-shell py-6">
            <div className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <div className="border-b border-slate-200 px-4 py-4 sm:px-6 dark:border-slate-800">
                   
                    <h1 className="mt-2 text-xl font-semibold text-slate-950 dark:text-white sm:text-2xl">
                        Chat with your career mentor
                    </h1>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        Ask about roles, skills, study plans, or interview prep.
                    </p>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
                    {messages.length === 0 ? (
                        <div className="flex min-h-full items-center justify-center">
                            <div className="max-w-md text-center">
                                <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
                                    Start a conversation
                                </h2>
                                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                    
                                </p>
                            </div>
                        </div>
                    ) : null}

                    <div className="space-y-4">
                        {messages.map((msg, index) => (
                            <div
                                key={`${msg.sender}-${index}`}
                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm sm:max-w-[75%] ${msg.sender === "user"
                                        ? "bg-blue-600 text-white"
                                        : "border border-slate-200 bg-slate-100 text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                                        }`}
                                >
                                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] opacity-70">
                                        {msg.sender === "user" ? "You" : "AI Mentor"}
                                    </p>
                                    <p className="whitespace-pre-wrap">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </div>
                </div>

                <div className="border-t border-slate-200 p-4 sm:p-6 dark:border-slate-800">
                    <form className="space-y-3" onSubmit={submitChat}>
                        <Textarea
                            label=""
                            placeholder="Message your mentor..."
                            error={errors.message?.message}
                            className="min-h-28 resize-none rounded-3xl"
                            onKeyDown={handleKeyDown}
                            {...register("message", {
                                required: "Message is required.",
                            })}
                        />

                        <div className="flex items-center justify-between gap-3">
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Press Enter to send, Shift+Enter for a new line.
                            </p>
                            <div className="flex items-center gap-3">
                                <Button type="button" variant="secondary" onClick={() => {
                                    reset();
                                    setMessages([]);
                                }}>
                                    Clear
                                </Button>
                                <Button type="submit" disabled={mutation.isPending}>
                                    {mutation.isPending ? "Sending..." : "Send"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
