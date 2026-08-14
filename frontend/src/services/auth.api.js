import { api } from "../utils/api.js";

export const registerRequest = async (payload) => {
    const { data } = await api.post("/auth/register", payload);
    return data;
};

export const loginRequest = async (payload) => {
    const { data } = await api.post("/auth/login", payload);
    return data;
};

export const logoutRequest = async () => {
    const { data } = await api.post("/auth/logout");
    return data;
};
