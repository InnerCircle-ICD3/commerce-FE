import { useAuth } from "@/features/auth/hooks/useAuth";
import { useIsLoading } from "@/features/auth/stores/authStore";
import { NaverIcon } from "@/shared/components/shared/Icon";

export default function LoginComponent() {
    const { startNaverLogin } = useAuth();
    const isLoading = useIsLoading();

    const handleNaverLogin = () => {
        startNaverLogin();
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
            {/* 메인 컨텐츠 */}
            <div className="w-[25rem] bg-white rounded-2xl p-6 shadow-md">
                <div className="flex flex-col items-center mb-6">
                    <h2 className="text-2xl font-bold mb-4">관리자 로그인</h2>
                    <p className="text-base text-[#171719] text-center whitespace-nowrap">관리자 계정으로 로그인해주세요</p>
                </div>

                <div className="space-y-2">
                    {/* 네이버 로그인 버튼 */}
                    <button
                        type="button"
                        className="w-full h-12 rounded-lg bg-[#00c73c] flex items-center justify-center gap-2 disabled:opacity-50"
                        onClick={handleNaverLogin}
                        disabled={isLoading}
                    >
                        <div className="w-5 h-5 flex items-center justify-center">
                            <NaverIcon />
                        </div>
                        <span className="text-sm font-semibold text-white">{isLoading ? "로그인 중..." : "네이버 간편 로그인"}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
