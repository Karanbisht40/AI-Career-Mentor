import { create } from "zustand";

const tokenKey = "aimentor-token";
const userKey = "aimentor-user";

const readStoredUser = () => {
    if (typeof window === "undefined") {
        return null;
    }

    try {
        const storedUser = window.localStorage.getItem(userKey);
        return storedUser ? JSON.parse(storedUser) : null;
    } catch {
        return null;
    }
};

const readStoredToken = () => {
    if (typeof window === "undefined") {
        return null;
    }

    return window.localStorage.getItem(tokenKey);
};

export const useAuthStore = create((set, get) => ({
    token: readStoredToken(),
    user: readStoredUser(),
    isHydrated: true,
    setAuth: ({ token, user }) => {
        if (typeof window !== "undefined") {
            window.localStorage.setItem(tokenKey, token);
            window.localStorage.setItem(userKey, JSON.stringify(user));
        }

        set({ token, user });
    },
    updateUser: (user) => {
        if (typeof window !== "undefined") {
            window.localStorage.setItem(userKey, JSON.stringify(user));
        }

        set({ user });
    },
    clearAuth: () => {
        if (typeof window !== "undefined") {
            window.localStorage.removeItem(tokenKey);
            window.localStorage.removeItem(userKey);
        }

        set({ token: null, user: null });
    },
    isAuthenticated: () => Boolean(get().token),
}));
