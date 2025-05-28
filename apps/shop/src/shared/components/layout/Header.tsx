"use client";

import SearchProduct from "@/src/features/product/components/SearchProduct";
import Tags from "./Tags";
import { SubNav } from "./SubNav";
import Link from "next/link";
import ChatButton from "@/src/features/chat/components/ChatButton";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Header() {
    const router = useRouter();
    // useSession 훅을 사용하여 세션 정보 가져오기
    const { data: session, status } = useSession();
    const [mounted, setMounted] = useState(false);
    
    // 클라이언트 사이드 렌더링 확인
    useEffect(() => {
        setMounted(true);
    }, []);
    
    // 로그아웃 처리 함수
    const handleLogout = async () => {
        // NextAuth 로그아웃 처리
        await signOut({ redirect: false });
        // 메인 페이지로 리다이렉트
        router.push('/main');
        // 페이지 새로고침하여 상태 갱신
        router.refresh();
    };
    
    // 세션 로딩 중이거나 마운트 전에는 아무것도 표시하지 않음
    if (status === 'loading' || !mounted) {
        return (
            <div className="w-full bg-white">
                <header className="flex flex-wrap gap-8 items-center px-6 py-4 mx-auto max-w-7xl">
                    {/* 로딩 중인 헤더 UI */}
                </header>
            </div>
        );
    }
    
    return (
        <div className="w-full bg-white border-b border-gray-200">
            <header className="flex flex-wrap gap-8 items-center px-6 py-4 mx-auto max-w-7xl">
                <div className="self-stretch my-auto text-2xl font-bold tracking-tight leading-snug text-center text-black whitespace-nowrap">
                    <Link href="/main" className="cursor-pointer">
                        <h1 className="self-stretch text-black">801 COFFEE</h1>
                    </Link>
                </div>

                <SearchProduct />

                <nav className="flex gap-6 justify-center items-center self-stretch my-auto">
                    <Link href="/cart">
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d83c3984fea3767c661c7b9a7ae20f706764920a"
                            alt="장바구니"
                            className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
                        />
                    </Link>
                    
                    {session?.user ? (
                        <div className="flex items-center gap-4">
                            <Link href="/mypage">
                                <img
                                    src={session.user.image || "https://cdn.builder.io/api/v1/image/assets/TEMP/bb40dd9fddf419c3fe59ba9750479588879625e9"}
                                    alt="마이페이지"
                                    className="object-cover w-8 h-8 rounded-full"
                                />
                            </Link>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">
                                    {session.user.name || session.user.email}
                                </span>
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
            {/* <Tags /> */}
            {/* <SubNav /> */}
        </div>
    );

}

export default Header;
