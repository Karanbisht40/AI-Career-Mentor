import { generateChatReply } from "../services/chat.service.js";

export const chatController = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required.",
            });
        }

        const reply = await generateChatReply(message);

        return res.status(200).json({
            success: true,
            reply,
        });

    } catch (error) {
        console.error("Chat Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to generate AI response.",
        });
    }
};