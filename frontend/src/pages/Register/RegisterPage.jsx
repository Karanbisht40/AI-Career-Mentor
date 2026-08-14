import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerRequest } from "../../services/auth.api.js";
import { getErrorMessage } from "../../utils/errors.js";
import Button from "../../components/ui/Button.jsx";
import Input from "../../components/ui/Input.jsx";
import { Card } from "../../components/ui/Card.jsx";

export default function RegisterPage() {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    });

    const registerMutation = useMutation({
        mutationFn: registerRequest,
        onSuccess: (data) => {
            toast.success(data.message || "Account created successfully");
            navigate("/login", { replace: true });
        },
        onError: (error) => toast.error(getErrorMessage(error)),
    });

    const onSubmit = ({ confirmPassword, ...values }) => registerMutation.mutate(values);

    return (
        <div className="page-shell flex min-h-[calc(100vh-9rem)] items-center py-10">
            <Card className="mx-auto w-full max-w-lg p-8">
                <p className="text-sm font-semibold tracking-[0.25em] text-blue-600 uppercase dark:text-blue-400"></p>
                <h1 className="section-title mt-3">Create your account</h1>
                <p className="section-subtitle">Set up your mentor workspace and unlock personalized guidance.</p>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label="Name"
                        placeholder="Your full name"
                        autoComplete="name"
                        error={errors.name?.message}
                        {...register("name", { required: "Name is required." })}
                    />
                    <Input
                        label="Email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        error={errors.email?.message}
                        {...register("email", { required: "Email is required." })}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="At least 6 characters"
                        autoComplete="new-password"
                        error={errors.password?.message}
                        {...register("password", {
                            required: "Password is required.",
                            minLength: { value: 6, message: "Password must be at least 6 characters." },
                        })}
                    />
                    <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                        error={errors.confirmPassword?.message}
                        {...register("confirmPassword", {
                            validate: (value) => value === watch("password") || "Passwords do not match.",
                        })}
                    />
                    <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
                        {registerMutation.isPending ? "Creating account..." : "Register"}
                    </Button>
                </form>

                <p className="mt-6 text-sm text-slate-600 text-slate-600">
                    Already have an account? <Link className="font-semibold text-blue-600 dark:text-blue-400" to="/login">Login</Link>
                </p>
            </Card>
        </div>
    );
}
