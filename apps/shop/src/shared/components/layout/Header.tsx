"use client";

import SearchProduct from "@/src/features/product/components/SearchProduct";
import Tags from "./Tags";
import { SubNav } from "./SubNav";
import Link from "next/link";
import ChatButton from "@/src/features/chat/components/ChatButton";
import { useUserStore } from "@packages/stores/userStore";
import { useEffect, useState } from "react";
import router from "next/dist/client/router";

function Header() {
    // 클라이언트 사이드에서만 실행되도록 처리
    const [mounted, setMounted] = useState(false);
    
    // Zustand 사용자 상태 스토어에서 필요한 값과 함수 가져오기
    const { user, isLoggedIn, logout } = useUserStore();
    
    // 클라이언트 사이드 렌더링 확인
    useEffect(() => {
        setMounted(true);
    }, []);
    
    // 로그아웃 처리 함수
    const handleLogout = () => {
        logout();
        router.push("/main");
    };
    
    return (
        <div className="w-full bg-white">
            <header className="flex flex-wrap gap-8 items-center px-6 py-4 mx-auto max-w-7xl">
                <div className="self-stretch my-auto text-2xl font-bold tracking-tight leading-snug text-center text-black whitespace-nowrap">
                    <Link href="/main" className="cursor-pointer">
                        <h1 className="self-stretch text-black">801 COFFEE</h1>
                    </Link>
                </div>

                <SearchProduct />

                <nav className="flex gap-6 justify-center items-center self-stretch my-auto">
                    <ChatButton />
                    <Link href="/cart">
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d83c3984fea3767c661c7b9a7ae20f706764920a"
                            alt="장바구니"
                            className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
                        />
                    </Link>
                    
                    {mounted && isLoggedIn ? (
                        <div className="flex items-center gap-4">
                            <Link href="/mypage">
                                <img
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/bb40dd9fddf419c3fe59ba9750479588879625e9"
                                    alt="마이페이지"
                                    className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
                                />
                            </Link>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">{user?.email}</span>
                                <button 
                                    type="button"
                                    onClick={handleLogout}
                                    className="text-xs text-gray-500 hover:text-gray-700 text-left"
                                >
                                    로그아웃
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link 
                                href="/login" 
                                className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                로그인
                            </Link>
                    
                        </div>
                    )}
                </nav>
            </header>
            <Tags />
            <SubNav />
        </div>
    );

}

export default Header;
