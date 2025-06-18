import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { useAuthStore } from "../stores/authStore";
import { useNaverAuth } from "./useNaverAuth";

export const useAuth = () => {
    const navigate = useNavigate();
    const { login, logout, setLoading } = useAuthStore();
    const { loginWithNaver, handleNaverCallback } = useNaverAuth();

    // 네이버 로그인 시작
    const startNaverLogin = useCallback(() => {
        setLoading(true);
        loginWithNaver();
    }, [loginWithNaver, setLoading]);

    // 네이버 콜백 처리
    const processNaverCallback = useCallback(
        async (code: string, state: string) => {
            setLoading(true);

            try {
                const tokens = await handleNaverCallback(code, state);

                if (tokens) {
                    login(tokens);
                    // 로그인 성공 시 대시보드로 이동
                    navigate({ to: "/" });
                    return true;
                }

                console.error("로그인 실패: 토큰을 받을 수 없습니다.");
                return false;
            } catch (error) {
                console.error("로그인 처리 중 오류:", error);
                return false;
            } finally {
                setLoading(false);
            }
        },
        [handleNaverCallback, login, navigate, setLoading],
    );

    // 로그아웃
    const signOut = useCallback(() => {
        logout();
        navigate({ to: "/login" });
    }, [logout, navigate]);

    return {
        startNaverLogin,
        processNaverCallback,
        signOut,
    };
};
