import { createFileRoute, redirect } from "@tanstack/react-router";
import AuthLayout from "@/features/common/layout/AuthLayout";
import LoginComponent from "@/features/login/LoginComponent";

// 인증 상태 확인 함수 (새로운 zustand 기반)
const isAuthenticated = () => {
    try {
        const storage = localStorage.getItem("admin-auth-storage");
        if (!storage) return false;

        const parsed = JSON.parse(storage);
        return parsed?.state?.isAuthenticated === true && parsed?.state?.tokens?.accessToken;
    } catch (error) {
        return false;
    }
};

function LoginPage() {
    return (
        <AuthLayout>
            <LoginComponent />
        </AuthLayout>
    );
}

export const Route = createFileRoute("/login")({
    component: LoginPage,
    beforeLoad: () => {
        // 이미 로그인된 경우 대시보드로 리디렉션
        if (isAuthenticated()) {
            throw redirect({
                to: "/",
            });
        }
    },
});
