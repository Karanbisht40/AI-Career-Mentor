import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginRequest } from "../../services/auth.api.js";
import { useAuthStore } from "../../store/authStore.js";
import { getErrorMessage } from "../../utils/errors.js";
import Button from "../../components/ui/Button.jsx";
import Input from "../../components/ui/Input.jsx";
import { Card } from "../../components/ui/Card.jsx";

export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const setAuth = useAuthStore((state) => state.setAuth);
    const from = location.state?.from?.pathname || "/dashboard";

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { email: "", password: "" },
    });

    const loginMutation = useMutation({
        mutationFn: loginRequest,
        onSuccess: (data) => {
            setAuth({ token: data.token, user: data.user });
            toast.success(data.message || "Welcome back");
            navigate(from, { replace: true });
        },
        onError: (error) => toast.error(getErrorMessage(error)),
    });

    const onSubmit = (values) => loginMutation.mutate(values);

    return (
        <div className="page-shell flex min-h-[calc(100vh-9rem)] items-center py-10">
            <Card className="mx-auto w-full max-w-lg p-8">
                <p className="text-sm font-semibold tracking-[0.25em] text-blue-600 uppercase dark:text-blue-400">Welcome back</p>
                <h1 className="section-title mt-3">Login to your mentor dashboard</h1>
                <p className="section-subtitle">Use your authenticated session to manage your profile and AI career tools.</p>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
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
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        error={errors.password?.message}
                        {...register("password", { required: "Password is required." })}
                    />
                    <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
                        {loginMutation.isPending ? "Signing in..." : "Login"}
                    </Button>
                </form>

                <p className="mt-6 text-sm text-slate-600 text-slate-600">
                    Don’t have an account? <Link className="font-semibold text-blue-600 dark:text-blue-400" to="/register">Create one</Link>
                </p>
            </Card>
        </div>
    );
}
