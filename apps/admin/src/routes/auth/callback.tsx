import { useAuth } from "@/features/auth/hooks/useAuth";
import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

// 콜백 컴포넌트
function AuthCallback() {
    const { processNaverCallback } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleCallback = async () => {
            // URL에서 code와 state 파라미터 추출
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get("code");
            const state = urlParams.get("state");
            const error = urlParams.get("error");

            if (error) {
                console.error("OAuth 에러:", error);
                alert("로그인 중 오류가 발생했습니다.");
                navigate({ to: "/login" });
                return;
            }

            if (code && state) {
                const success = await processNaverCallback(code, state);
                if (!success) {
                    alert("로그인에 실패했습니다. 다시 시도해주세요.");
                    navigate({ to: "/login" });
                }
            } else {
                console.error("필수 파라미터가 누락되었습니다.");
                navigate({ to: "/login" });
            }
        };

        handleCallback();
    }, [processNaverCallback, navigate]);

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">로그인 처리 중...</p>
            </div>
        </div>
    );
}

export const Route = createFileRoute("/auth/callback")({
    component: AuthCallback,
});
