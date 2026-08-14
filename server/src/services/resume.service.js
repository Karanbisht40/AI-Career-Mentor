import ai from "../config/gemini.js";

export const analyzeResume = async (resumeText) => {
    const prompt = `
You are an expert technical recruiter and ATS resume reviewer.

Analyze the following resume.

Provide:

1. Overall ATS score out of 100
2. Resume strengths
3. Missing technical skills
4. Weak areas
5. Suggestions to improve the resume
6. Project improvement suggestions
7. Interview preparation suggestions
8. A better professional summary

Resume:

${resumeText}

Return ONLY valid JSON.

Do NOT use markdown.
Do NOT use \`\`\`json.
Do NOT add any explanation outside the JSON.

Use exactly this structure:

{
    "score": 0,
    "strengths": [],
    "missingSkills": [],
    "weakAreas": [],
    "suggestions": [],
    "projectSuggestions": [],
    "interviewPreparation": [],
    "improvedSummary": ""
}
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
    });

    let text = response.text.trim();

    // Remove markdown code fences if Gemini returns them
    text = text
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

    try {
        const parsed = JSON.parse(text);

        console.log("===== PARSED RESUME ANALYSIS =====");
        console.log(JSON.stringify(parsed, null, 2));
        console.log("===================================");

        return parsed;

    } catch (error) {
        console.error("Failed to parse Gemini JSON:", text);

        throw new Error("AI returned an invalid resume analysis.");
    }
};