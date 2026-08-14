import express from "express";
import {
    getCurrentUser,
    updateProfile,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/me", protect, getCurrentUser);
router.put("/profile", protect, updateProfile);

export default router;