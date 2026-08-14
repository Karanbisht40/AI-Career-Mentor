import { NavLink, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../ui/Button.jsx";
// import ThemeToggle from "../common/ThemeToggle.jsx";
import { useAuthStore } from "../../store/authStore.js";
import { logoutRequest } from "../../services/auth.api.js";
import { toast } from "react-hot-toast";

const linkClass = ({ isActive }) =>
    `nav-link ${isActive ? "nav-link-active" : ""}`;

export default function Navbar() {
    const navigate = useNavigate();
    const token = useAuthStore((state) => state.token);
    const clearAuth = useAuthStore((state) => state.clearAuth);

    const handleLogout = async () => {
        try {
            await logoutRequest();
        } finally {
            clearAuth();
            toast.success("Logged out successfully");
            navigate("/");
        }
    };

    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-white/70 backdrop-blur-xl bg-white">
            <div className="page-shell py-4">
                <div className="flex items-center justify-between gap-4">
                    <Link to="/" className="flex items-center gap-3">
                        <motion.div
                            animate={{ rotate: [0, 6, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-white shadow-lg :bg-white dark:text-slate-950"
                        >
                            AI
                        </motion.div>
                        <div>
                            <p className="text-sm font-semibold tracking-[0.2em] text-slate-500 uppercase">Career Mentor</p>
                            <p className="text-sm text-slate-600 text-slate-600">AI guidance for your next move</p>
                        </div>
                    </Link>

                    <nav className="hidden items-center gap-2 lg:flex">
                        <NavLink to="/" className={linkClass} end>
                            Home
                        </NavLink>
                        {token ? (
                            <>
                                <NavLink to="/dashboard" className={linkClass}>
                                    Dashboard
                                </NavLink>
                                <NavLink to="/chat" className={linkClass}>
                                    AI Chat
                                </NavLink>
                                <NavLink to="/roadmap" className={linkClass}>
                                    Roadmap
                                </NavLink>
                                <NavLink to="/resume" className={linkClass}>
                                    Resume
                                </NavLink>
                                <NavLink to="/interview" className={linkClass}>
                                    Interview
                                </NavLink>
                            </>
                        ) : null}
                    </nav>

                    <div className="flex items-center gap-3">
                        {/* <ThemeToggle /> */}
                        {token ? (
                            <>
                                <Link to="/profile" className="secondary-button hidden sm:inline-flex">
                                    Profile
                                </Link>
                                <Button className="hidden sm:inline-flex" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="secondary-button hidden sm:inline-flex">
                                    Login
                                </Link>
                                <Link to="/register" className="primary-button hidden sm:inline-flex">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    <nav className="mt-4 flex flex-wrap gap-2 lg:hidden">
                        <NavLink to="/" className={linkClass} end>
                            Home
                        </NavLink>

                        {token ? (
                            <>
                                <NavLink to="/dashboard" className={linkClass}>
                                    Dashboard
                                </NavLink>

                                <NavLink to="/chat" className={linkClass}>
                                    Chat
                                </NavLink>

                                <NavLink to="/roadmap" className={linkClass}>
                                    Roadmap
                                </NavLink>

                                <NavLink to="/resume" className={linkClass}>
                                    Resume
                                </NavLink>

                                <NavLink to="/interview" className={linkClass}>
                                    Interview
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login" className={linkClass}>
                                    Login
                                </NavLink>

                                <NavLink to="/register" className={linkClass}>
                                    Register
                                </NavLink>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}