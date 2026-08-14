import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/authStore.js";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";
import AppLayout from "./components/layout/AppLayout.jsx";
import LandingPage from "./pages/Home/LandingPage.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import RegisterPage from "./pages/Register/RegisterPage.jsx";
import DashboardPage from "./pages/Dashboard/DashboardPage.jsx";
import ProfilePage from "./pages/Profile/ProfilePage.jsx";
import ChatPage from "./pages/Chat/ChatPage.jsx";
import RoadmapPage from "./pages/Roadmap/RoadmapPage.jsx";
import ResumePage from "./pages/Resume/ResumePage.jsx";
import InterviewPage from "./pages/Interview/InterviewPage.jsx";

export default function App() {
   
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route index element={<LandingPage />} />
                <Route
                    path="login"
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    }
                />
                <Route
                    path="register"
                    element={
                        <PublicRoute>
                            <RegisterPage />
                        </PublicRoute>
                    }
                />
                <Route
                    path="dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="chat"
                    element={
                        <ProtectedRoute>
                            <ChatPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="roadmap"
                    element={
                        <ProtectedRoute>
                            <RoadmapPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="resume"
                    element={
                        <ProtectedRoute>
                            <ResumePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="interview"
                    element={
                        <ProtectedRoute>
                            <InterviewPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="*"
                    element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />}
                />
            </Route>
        </Routes>
    );
}
