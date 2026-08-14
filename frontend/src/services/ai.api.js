import { api } from "../utils/api.js";

export const generateCareerChat = async (payload) => {
    const { data } = await api.post("/ai/chat", payload);
    return data;
};

export const generateRoadmap = async (payload) => {
    const { data } = await api.post("/ai/roadmap", payload);
    return data;
};

export const analyzeResume = async (file) => {
    const formData = new FormData();

    formData.append("resume", file);

    const { data } = await api.post("/ai/resume", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return data;
};

export const generateInterviewQuestion = async (role) => {
    const { data } = await api.post("/ai/interview/question", {
        role,
    });

    return data;
};

export const evaluateInterviewAnswer = async ({
    role,
    question,
    answer,
}) => {
    const { data } = await api.post("/ai/interview/evaluate", {
        role,
        question,
        answer,
    });

    return data;
};
