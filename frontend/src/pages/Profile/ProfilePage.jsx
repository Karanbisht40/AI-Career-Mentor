import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { fetchCurrentUser, updateProfileRequest } from "../../services/user.api.js";
import { queryKeys } from "../../utils/queryKeys.js";
import { getErrorMessage } from "../../utils/errors.js";
import LoadingState from "../../components/common/LoadingState.jsx";
import ErrorState from "../../components/common/ErrorState.jsx";
import Button from "../../components/ui/Button.jsx";
import Input from "../../components/ui/Input.jsx";
import Textarea from "../../components/ui/Textarea.jsx";
import { Card } from "../../components/ui/Card.jsx";

export default function ProfilePage() {
    const queryClient = useQueryClient();
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: queryKeys.currentUser,
        queryFn: fetchCurrentUser,
    });

    const user = data?.user;
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        values: user
            ? {
                name: user.name || "",
                avatar: user.avatar || "",
                careerGoal: user.careerGoal || "",
                currentSkills: Array.isArray(user.currentSkills) ? user.currentSkills.join(", ") : "",
                dailyStudyHours: user.dailyStudyHours ?? 0,
                targetMonths: user.targetMonths ?? 0,
                   experienceLevel: user.experienceLevel || "Beginner",
            }
            : undefined,
    });

    const updateMutation = useMutation({
        mutationFn: updateProfileRequest,
        onSuccess: async (response) => {
            toast.success(response.message || "Profile updated");
            await queryClient.invalidateQueries({ queryKey: queryKeys.currentUser });
            reset({
                name: response.user?.name || "",
                avatar: response.user?.avatar || "",
                careerGoal: response.user?.careerGoal || "",
                currentSkills: Array.isArray(response.user?.currentSkills) ? response.user.currentSkills.join(", ") : "",
                dailyStudyHours: response.user?.dailyStudyHours ?? 0,
                targetMonths: response.user?.targetMonths ?? 0,
            });
        },
        onError: (err) => toast.error(getErrorMessage(err)),
    });

    const onSubmit = (values) => {
        updateMutation.mutate({
            ...values,
            currentSkills: values.currentSkills
                ? values.currentSkills
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter(Boolean)
                : [],
            dailyStudyHours: Number(values.dailyStudyHours),
            targetMonths: Number(values.targetMonths),
        });
    };

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

    return (
        <div className="page-shell py-8">
            <Card className="mx-auto max-w-4xl p-6 sm:p-8">
                <h1 className="section-title">Profile</h1>
                <p className="section-subtitle">Keep your mentor context current so every recommendation stays relevant.</p>

                <form className="mt-8 grid gap-5 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
                    <Input label="Name" error={errors.name?.message} {...register("name", { required: "Name is required." })} />
                    <Input label="Avatar URL" placeholder="https://..." error={errors.avatar?.message} {...register("avatar")} />
                    <Textarea label="Career Goal" className="md:col-span-2" error={errors.careerGoal?.message} {...register("careerGoal")} />
                    <Textarea
                        label="Current Skills"
                        className="md:col-span-2"
                        placeholder="React, Node.js, MongoDB"
                        error={errors.currentSkills?.message}
                        {...register("currentSkills")}
                    />
                    <Input
                        label="Daily Study Hours"
                        type="number"
                        min="0"
                        step="0.5"
                        error={errors.dailyStudyHours?.message}
                        {...register("dailyStudyHours", { valueAsNumber: true, min: 0 })}
                    />
                    <Input
                        label="Target Months"
                        type="number"
                        min="0"
                        step="1"
                        error={errors.targetMonths?.message}
                        {...register("targetMonths", { valueAsNumber: true, min: 0 })}

                    />
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-medium">Experience Level</span>

                        <select
                            className="rounded-lg border border-slate-300 p-3"
                            {...register("experienceLevel")}
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </label>
                    <div className="md:col-span-2 flex justify-end">
                        <Button type="submit" disabled={updateMutation.isPending}>
                            {updateMutation.isPending ? "Saving..." : "Save Profile"}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
