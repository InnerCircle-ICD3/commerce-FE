import { createFileRoute, redirect } from "@tanstack/react-router";
import RootLayout from "@/features/common/layout/RootLayout";

// 인증 상태 확인 함수
const isAuthenticated = () => {
    try {
        const storage = localStorage.getItem("admin-auth-storage");
        if (!storage) return false;

        const parsed = JSON.parse(storage);
        return parsed?.state?.isAuthenticated === true && parsed?.state?.tokens?.accessToken;
    } catch (error) {
        console.error("인증 상태 확인 오류:", error);
        return false;
    }
};

export const Route = createFileRoute("/_authenticated")({
    component: RootLayout,
    beforeLoad: () => {
        // 로그인되지 않은 경우 로그인 페이지로 리디렉션
        if (!isAuthenticated()) {
            throw redirect({
                to: "/login",
            });
        }
    },
});
