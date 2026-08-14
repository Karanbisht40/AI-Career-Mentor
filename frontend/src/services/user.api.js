import { api } from "../utils/api.js";

export const fetchCurrentUser = async () => {
    const { data } = await api.get("/users/me");
    return data;
};

export const updateProfileRequest = async (payload) => {
    const { data } = await api.put("/users/profile", payload);
    return data;
};
