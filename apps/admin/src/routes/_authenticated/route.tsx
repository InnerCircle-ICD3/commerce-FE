import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "../__root";
import RootLayout from "@/features/common/layout/RootLayout";

// 인증 상태 확인 함수
const isAuthenticated = () => {
    const authToken = localStorage.getItem("auth-token");
    return authToken === "abcd";
};

export const Route = createRoute({
    getParentRoute: () => rootRoute,
    id: "authenticated",
    component: RootLayout,
    beforeLoad: () => {
        // 로그인되지 않은 경우 로그인 페이지로 리디렉션
        if (!isAuthenticated()) {
            return {
                redirect: "/login",
            };
        }
        return {};
    },
});
