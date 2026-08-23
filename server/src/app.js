// Purpose: Create and configure the Express application for the backend.
// This file keeps framework setup separate from the server startup logic.

import path from "path";
import { fileURLToPath } from "url";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import aiRoutes from "./routes/ai.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import interviewRoutes from "./routes/interview.routes.js";

// ES module path setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// React production build location
const frontendPath = path.join(__dirname, "../../frontend/dist");

const app = express();

// Core application middleware
app.use(helmet());

app.use(
    cors({
        origin: process.env.CORS_ORIGIN || true,
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// API route registration
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/ai/chat", chatRoutes);
app.use("/api/ai/resume", resumeRoutes);
app.use("/api/ai/interview", interviewRoutes);

// Basic health check
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is running.",
    });
});

// Serve React frontend
app.use(express.static(frontendPath));

// React SPA fallback
app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

// Global error handling must stay last
app.use(errorMiddleware);

export default app;