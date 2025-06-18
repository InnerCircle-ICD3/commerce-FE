import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState, Tokens, User } from "../types/auth";

interface AuthStore extends AuthState {
    // Actions
    setTokens: (tokens: Tokens) => void;
    setUser: (user: User) => void;
    login: (tokens: Tokens) => void;
    logout: () => void;
    clearAuth: () => void;
    setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        set => ({
            // Initial state
            user: null,
            tokens: null,
            isAuthenticated: false,
            isLoading: false,

            // Actions
            setTokens: (tokens: Tokens) => {
                set({ tokens });
            },

            setUser: (user: User) => {
                set({ user });
            },

            login: (tokens: Tokens) => {
                const user: User = {
                    id: tokens.userId,
                    email: tokens.email,
                    nickname: tokens.nickname,
                    name: tokens.nickname, // nickname을 name으로 사용
                };

                set({
                    tokens,
                    user,
                    isAuthenticated: true,
                    isLoading: false,
                });
            },

            logout: () => {
                set({
                    user: null,
                    tokens: null,
                    isAuthenticated: false,
                    isLoading: false,
                });
            },

            clearAuth: () => {
                set({
                    user: null,
                    tokens: null,
                    isAuthenticated: false,
                    isLoading: false,
                });
            },

            setLoading: (isLoading: boolean) => {
                set({ isLoading });
            },
        }),
        {
            name: "admin-auth-storage", // localStorage key
            partialize: state => ({
                tokens: state.tokens,
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        },
    ),
);

// Selectors (optional - for better performance)
export const useUser = () => useAuthStore(state => state.user);
export const useTokens = () => useAuthStore(state => state.tokens);
export const useIsAuthenticated = () => useAuthStore(state => state.isAuthenticated);
export const useIsLoading = () => useAuthStore(state => state.isLoading);
