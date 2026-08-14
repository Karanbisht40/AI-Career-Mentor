import ai from "../config/gemini.js";

export const generateInterviewQuestion = async (role) => {
    const prompt = `
You are an expert technical interviewer.

Conduct a technical interview for this role:

Role: ${role}

Generate ONE interview question.

The question should be appropriate for the candidate's role
and should test practical technical knowledge.

Return ONLY valid JSON:

{
    "question": "",
    "topic": "",
    "difficulty": "Easy"
}

Difficulty must be one of:
Easy, Medium, Hard
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
    });

    let text = response.text.trim();

    text = text
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

    try {
        return JSON.parse(text);
    } catch (error) {
        console.error("Interview question JSON error:", text);
        throw new Error("AI returned an invalid interview question.");
    }
};


export const evaluateInterviewAnswer = async (
    role,
    question,
    answer
) => {
    const prompt = `
You are an expert technical interviewer.

Candidate Role:
${role}

Question:
${question}

Candidate Answer:
${answer}

Evaluate the candidate's answer.

Consider:
- Technical correctness
- Understanding
- Clarity
- Practical knowledge
- Completeness

Return ONLY valid JSON:

{
    "score": 0,
    "feedback": "",
    "strengths": [],
    "improvements": [],
    "idealAnswer": ""
}

Score must be between 0 and 10.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
    });

    let text = response.text.trim();

    text = text
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

    try {
        return JSON.parse(text);
    } catch (error) {
        console.error("Interview evaluation JSON error:", text);
        throw new Error("AI returned an invalid interview evaluation.");
    }
};