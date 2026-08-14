import { PDFParse } from "pdf-parse";
import { analyzeResume } from "../services/resume.service.js";

export const analyzeResumeController = async (req, res) => {
    try {
        console.log("FILE:", req.file);

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Resume PDF is required.",
            });
        }

        console.log("Resume received:", req.file.originalname);
        console.log("File type:", req.file.mimetype);
        console.log("File size:", req.file.size);

        const parser = new PDFParse({
            data: req.file.buffer,
        });

        const pdfData = await parser.getText();

        await parser.destroy();

        console.log("Extracted text length:", pdfData.text.length);

        if (!pdfData.text.trim()) {
            return res.status(400).json({
                success: false,
                message: "Could not extract text from the resume.",
            });
        }

        const result = await analyzeResume(pdfData.text);

        console.log("AI analysis generated successfully");

        return res.status(200).json({
            success: true,
            analysis: result,
        });

    } catch (error) {
        console.error("Resume Analysis Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};