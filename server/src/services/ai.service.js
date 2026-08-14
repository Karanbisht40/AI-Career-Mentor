import ai from "../config/gemini.js";

export const generateRoadmap = async (user) => {
    const prompt = `
You are an expert AI Career Mentor.

Create a personalized learning roadmap.

User Details:

Career Goal: ${user.careerGoal}

Experience Level: ${user.experienceLevel}

Current Skills:
${user.currentSkills.join(", ")}

Daily Study Hours:
${user.dailyStudyHours}

Target Months:
${user.targetMonths}

Return ONLY valid JSON.

Format:

{
  "roadmap": [
    {
      "month": 1,
      "title": "Python Fundamentals",
      "topics": [
        "Variables",
        "Loops",
        "Functions"
      ],
      "project": "Build a Calculator",
      "goal": "Master Python Basics"
    }
  ]
}

Rules:
- Do not return markdown.
- Do not use triple backticks.
- Do not add explanations.
- Return only valid JSON.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
    });

    const text = response.text;

    try {
        return JSON.parse(text);
    } catch (error) {
        console.error("JSON Parse Error:", error);
        console.log(text);

        throw new Error("Gemini returned invalid JSON.");
    }
};