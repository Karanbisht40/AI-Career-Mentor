import express from "express";
import multer from "multer";
import { protect } from "../middleware/auth.middleware.js";
import { analyzeResumeController } from "../controllers/resume.controller.js";

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are allowed."));
        }
    },
});

router.post(
    "/",
    protect,
    upload.single("resume"),
    analyzeResumeController
);

export default router;