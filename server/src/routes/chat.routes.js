import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { chatController } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", protect, chatController);

export default router;