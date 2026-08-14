import ai from "../config/gemini.js";

export const generateChatReply = async (message) => {
    const prompt = `
You are an expert AI Career Mentor.

Answer the following career question professionally.

Question:
${message}
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
    });

    return response.text;
};