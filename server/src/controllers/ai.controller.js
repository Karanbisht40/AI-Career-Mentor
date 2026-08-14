import { generateRoadmap } from "../services/ai.service.js";

export const generateRoadmapController = async (req, res) => {
    try {
        const {
            careerGoal,
            experienceLevel,
            currentSkills,
            dailyStudyHours,
            targetMonths,
        } = req.body;

        // Validate required fields
        if (
            !careerGoal ||
            !experienceLevel ||
            !currentSkills ||
            !dailyStudyHours ||
            !targetMonths
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        const result = await generateRoadmap({
            careerGoal,
            experienceLevel,
            currentSkills,
            dailyStudyHours,
            targetMonths,
        });

        return res.status(200).json({
            success: true,
            roadmap: result.roadmap,
        });

    } catch (error) {
        console.error("Gemini Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};