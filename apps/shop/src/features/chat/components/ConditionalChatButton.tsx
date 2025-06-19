"use client";

import { usePathname } from "next/navigation";
import ChatButton from "./ChatButton";

export default function ConditionalChatButton() {
    const pathname = usePathname();

    // 상품 상세페이지인지 확인 (/product/[id] 패턴)
    const isProductDetailPage = pathname?.includes('/product/') && !pathname?.includes('/products');

    // 상품 상세페이지가 아닐 때만 플로팅 버튼 표시
    if (isProductDetailPage) {
        return null;
    }

    return <ChatButton isFloating={true} />;
} 