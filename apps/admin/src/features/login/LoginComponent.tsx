import { useNavigate } from "@tanstack/react-router";
import { KakaoIcon, NaverIcon, GoogleIcon } from "@/shared/components/shared/Icon";

export default function LoginComponent() {
    const navigate = useNavigate();

    const handleLogin = () => {
        // 실제 로그인 로직은 여기에 구현
        localStorage.setItem("auth-token", "abcd"); // 테스트용 토큰 저장
        // 테스트를 위해 바로 대시보드로 이동하도록 함
        navigate({ to: "/" });
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
                    {/* 카카오 로그인 버튼 */}
                    <button
                        type="button"
                        className="w-full h-12 rounded-lg bg-[#fee500] flex items-center justify-center gap-2"
                        onClick={handleLogin}
                    >
                        <div className="w-5 h-5 flex items-center justify-center">
                            <KakaoIcon />
                        </div>
                        <span className="text-sm font-semibold">카카오 간편 로그인</span>
                    </button>

                    {/* 네이버 로그인 버튼 */}
                    <button
                        type="button"
                        className="w-full h-12 rounded-lg bg-[#00c73c] flex items-center justify-center gap-2"
                        onClick={handleLogin}
                    >
                        <div className="w-5 h-5 flex items-center justify-center">
                            <NaverIcon />
                        </div>
                        <span className="text-sm font-semibold text-white">네이버 간편 로그인</span>
                    </button>

                    {/* 구글 로그인 버튼 */}
                    <button
                        type="button"
                        className="w-full h-12 rounded-lg bg-white border border-gray-200/70 flex items-center justify-center gap-2"
                        onClick={handleLogin}
                    >
                        <div className="w-5 h-5 flex items-center justify-center">
                            <GoogleIcon />
                        </div>
                        <span className="text-sm font-semibold">Google 간편 로그인</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
