import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { generateRoadmapController } from "../controllers/ai.controller.js";

const router = express.Router();

// Generate AI Roadmap
router.post("/roadmap", protect, generateRoadmapController);

export default router;