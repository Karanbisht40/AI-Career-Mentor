import {
    generateInterviewQuestion,
    evaluateInterviewAnswer,
} from "../services/interview.service.js";

export const getInterviewQuestion = async (req, res) => {
    try {
        const { role } = req.body;

        if (!role) {
            return res.status(400).json({
                success: false,
                message: "Role is required.",
            });
        }

        const result = await generateInterviewQuestion(role);

        return res.status(200).json({
            success: true,
            question: result,
        });

    } catch (error) {
        console.error("Interview Question Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to generate interview question.",
        });
    }
};


export const evaluateAnswer = async (req, res) => {
    try {
        const {
            role,
            question,
            answer,
        } = req.body;

        if (!role || !question || !answer) {
            return res.status(400).json({
                success: false,
                message: "Role, question and answer are required.",
            });
        }

        const result = await evaluateInterviewAnswer(
            role,
            question,
            answer
        );

        return res.status(200).json({
            success: true,
            evaluation: result,
        });

    } catch (error) {
        console.error("Interview Evaluation Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to evaluate interview answer.",
        });
    }
};