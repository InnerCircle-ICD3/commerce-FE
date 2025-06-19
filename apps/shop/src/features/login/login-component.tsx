"use client";

import React from "react";
import { KakaoIcon, NaverIcon, GoogleIcon } from "@/src/shared/components/shared/Icon";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginComponent() {
    const router = useRouter();

    const handleNaverLogin = () => {
        // Safari에서 팝업 차단 문제를 해결하기 위한 추가 설정
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

        // NextAuth의 signIn 함수를 사용하여 네이버 로그인 시작
        signIn("naver", {
            callbackUrl: "/main", // 로그인 성공 후 리다이렉트될 URL
            redirect: true, // 자동 리다이렉트 활성화
        }).catch((error) => {
            console.error("네이버 로그인 중 오류:", error);

            // Safari에서 발생할 수 있는 팝업 차단 오류 처리
            if (isSafari && error.name === 'AbortError') {
                alert("Safari에서 팝업이 차단되었습니다. 팝업 허용 설정을 확인해주세요.");
            }
        });
    };

    // Kakao 로그인 처리 함수 (나중에 구현 예정)
    const handleKakaoLogin = () => {
        // TODO: 카카오 로그인 구현
        alert("카카오 로그인은 아직 구현되지 않았습니다.");
    };

    // Google 로그인 처리 함수 (나중에 구현 예정)
    const handleGoogleLogin = () => {
        // TODO: 구글 로그인 구현
        alert("구글 로그인은 아직 구현되지 않았습니다.");
    };

    return (
        <main className="w-full min-h-[80vh] flex items-center justify-center mt-[-3rem]" role="main">
            {/* 로그인 섹션 */}
            <section className="w-[25rem] bg-white rounded-2xl p-6" aria-labelledby="login-heading">
                <header className="flex flex-col items-center mb-6">
                    <h1 id="login-heading" className="text-2xl font-bold mb-4">로그인</h1>
                    <p className="text-base text-[#171719] text-center whitespace-nowrap">
                        SNS로 간편하게 로그인하고 더 많은 서비스를 즐겨보세요!
                    </p>
                </header>

                <div className="space-y-2" role="group" aria-labelledby="social-login-group">
                    <h2 id="social-login-group" className="sr-only">소셜 로그인 옵션</h2>

                    {/* 네이버 로그인 버튼 */}
                    <button
                        type="button"
                        className="w-full h-12 rounded-lg bg-[#00c73c] flex items-center justify-center gap-2 hover:bg-[#00b33a] focus:outline-none focus:ring-2 focus:ring-[#00c73c] focus:ring-offset-2 transition-colors"
                        onClick={handleNaverLogin}
                        aria-label="네이버 계정으로 로그인"
                    >
                        <span className="w-5 h-5 flex items-center justify-center" aria-hidden="true">
                            <NaverIcon />
                        </span>
                        <span className="text-sm font-semibold text-white">네이버 간편 로그인</span>
                    </button>
                </div>
            </section>
        </main>
    );
}
