"use client";

import SearchProduct from "@/src/features/product/components/SearchProduct";
import Tags from "./Tags";
import { SubNav } from "./SubNav";
import Link from "next/link";
import ChatButton from "@/src/features/chat/components/ChatButton";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCart } from "@/src/features/cart/hooks/useCart";

function Header() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const { data: cartData } = useCart();

    // 장바구니 아이템 총 개수 계산
    const cartItemCount = cartData?.cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;

    // 로그아웃 처리 함수
    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push("/main");
        router.refresh();
    };

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
                    <Link href="/cart" className="relative">
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d83c3984fea3767c661c7b9a7ae20f706764920a"
                            alt="장바구니"
                            className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
                        />
                        {cartItemCount > 0 && (
                            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
                                {cartItemCount > 99 ? '99+' : cartItemCount}
                            </div>
                        )}
                    </Link>

                    {session?.user ? (
                        <div className="flex items-center gap-4">
                            <Link href="/mypage">
                                <img
                                    src={
                                        session.user.image ||
                                        "https://cdn.builder.io/api/v1/image/assets/TEMP/bb40dd9fddf419c3fe59ba9750479588879625e9"
                                    }
                                    alt="마이페이지"
                                    className="object-cover w-8 h-8 rounded-full"
                                />
                            </Link>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">{session.user.name || session.user.email}</span>
                                <button type="button" onClick={handleLogout} className="text-xs text-gray-500 hover:text-gray-700 text-left">
                                    로그아웃
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href="/mypage">
                                <img
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/bb40dd9fddf419c3fe59ba9750479588879625e9"
                                    alt="마이페이지"
                                    className="object-cover w-8 h-8 rounded-full"
                                />
                            </Link>
                            {status !== "loading" && (
                                <Link href="/login" className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                    로그인
                                </Link>
                            )}
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
