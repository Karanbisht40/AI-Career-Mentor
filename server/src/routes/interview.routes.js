import express from "express";
import { protect } from "../middleware/auth.middleware.js";

import {
    getInterviewQuestion,
    evaluateAnswer,
} from "../controllers/interview.controller.js";

const router = express.Router();

router.post(
    "/question",
    protect,
    getInterviewQuestion
);

router.post(
    "/evaluate",
    protect,
    evaluateAnswer
);

export default router;