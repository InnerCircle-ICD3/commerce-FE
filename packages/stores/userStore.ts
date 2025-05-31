import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// 사용자 정보 타입 정의
export interface User {
    id: string;
    email: string;
}

// 사용자 스토어 상태 타입 정의
interface UserState {
    user: User | null;
    token: string | null;
    isLoggedIn: boolean;

    // 액션들
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    login: (user: User, token: string) => void;
    logout: () => void;
}


export const useUserStore = create<UserState>()(
    // persist 미들웨어를 사용해 로컬 스토리지에 상태 유지
    persist(
        set => ({
            user: null,
            isLoggedIn: false,
            token: null,

            // 사용자 정보 설정
            setUser: user =>
                set(() => ({
                    user,
                    isLoggedIn: !!user,
                })),

            // 토큰 설정
            setToken: token => set(() => ({ token })),

            // 로그인 처리
            login: (user, token) =>
                set(() => ({
                    user,
                    token,
                    isLoggedIn: true,
                })),

            // 로그아웃 처리
            logout: () =>
                set(() => ({
                    user: null,
                    token: null,
                    isLoggedIn: false,
                })),
        }),
        {
            name: "user-storage", // 로컬 스토리지 키 이름
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
