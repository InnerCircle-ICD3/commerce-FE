"use client";

import React from "react";
import { KakaoIcon, NaverIcon, GoogleIcon } from "@/src/shared/components/shared/Icon";
import { useUserStore } from "@packages/stores/userStore";
import { useRouter } from "next/navigation";

export default function LoginComponent() {
    const router = useRouter();

    const { login } = useUserStore();

    // TODO : 네이버 로그인 적용 후 삭제 예정
    const handleTestLogin = () => {
        // 테스트용 사용자 정보
        const userInfo = {
            id: "123",
            name: "김팔공",
            nickname: "팔공팔공일",
            email: "user1234@kakao.com",
        };
        
        const testUser = userInfo;

        // 테스트용 토큰
        const testToken = "test_token_123456";

        // 로그인 처리
        login(testUser, testToken);
        
        // 메인 페이지로 리다이렉트
        router.push("/main");
    };

    return (
        <div className="w-full min-h-[80vh] flex items-center justify-center mt-[-3rem]">
            {/* 메인 컨텐츠 */}
            <div className="w-[25rem] bg-white rounded-2xl p-6">
                <div className="flex flex-col items-center mb-6">
                    <h2 className="text-2xl font-bold mb-4">로그인</h2>
                    <p className="text-base text-[#171719] text-center whitespace-nowrap">SNS로 간편하게 로그인하고 더 많은 서비스를 즐겨보세요!</p>
                </div>

                <div className="space-y-2">
                    {/* 카카오 로그인 버튼 */}
                    <button type="button" className="w-full h-12 rounded-lg bg-[#fee500] flex items-center justify-center gap-2">
                        <div className="w-5 h-5 flex items-center justify-center">
                            <KakaoIcon />
                        </div>
                        <span className="text-sm font-semibold">카카오 간편 로그인</span>
                    </button>

                    {/* 네이버 로그인 버튼 */}
                    <button 
                        type="button" 
                        className="w-full h-12 rounded-lg bg-[#00c73c] flex items-center justify-center gap-2"
                        onClick={handleTestLogin}
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
