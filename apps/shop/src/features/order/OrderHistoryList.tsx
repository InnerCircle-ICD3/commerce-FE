import { Button } from "@/src/shared/components/shared/button";
import Image from "next/image";
import type { ReactNode } from "react";
import type { OrderHistoryItem } from "@/src/features/order/mocks/orderHistoryMock";
import { ArrowIcon } from "@/src/shared/components/shared/Icon";

interface OrderHistoryListProps {
    orders: OrderHistoryItem[];
}

interface ButtonConfig {
    text: string;
    variant?: "outline" | "default";
    isGreen?: boolean;
}

export const OrderHistoryList = ({ orders }: OrderHistoryListProps) => {
    // 주문 상태별 버튼 구성 정의
    const getButtonsByStatus = (status: string): ButtonConfig[] => {
        switch (status) {
            case "준비중":
                return [
                    { text: "주문 취소", variant: "outline" },
                    { text: "배송 조회", isGreen: true },
                ];
            case "배송중":
                return [
                    { text: "반품 신청", variant: "outline" },
                    { text: "배송 조회", isGreen: true },
                ];
            case "배송완료":
                return [
                    { text: "반품 신청", variant: "outline" },
                    { text: "배송 조회", variant: "outline" },
                ];
            case "반품완료":
                return [
                    { text: "반품 정보", variant: "outline" },
                    { text: "장바구니 담기", variant: "outline" },
                ];
            default:
                return [];
        }
    };

    // 공통 버튼 스타일 클래스
    const baseButtonClass = "flex-1 h-10 text-sm font-semibold";
    const greenButtonClass = "bg-[#257a57] border-[#257a57] hover:bg-[#1a5f42] hover:border-[#1a5f42]";

    return (
        <div className="flex flex-col w-full gap-4">
            {orders.map(order => (
                <div key={order.id} className="w-full p-6 border border-gray-300/30 rounded-xl">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-base">{order.status}</span>
                            {order.statusDate && <span className="text-emerald-700 text-sm">{order.statusDate}</span>}
                        </div>
                        <button type="button" className="p-1.5">
                            <ArrowIcon direction="right" title="주문 상세 보기" />
                        </button>
                    </div>

                    <div className="flex gap-4 mb-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden relative">
                            <Image src={order.imageSrc} alt={`${order.productName} 이미지`} fill sizes="5rem" className="object-cover" />
                        </div>
                        <div className="flex flex-col justify-between">
                            <h3 className="font-bold text-sm">{order.productName}</h3>
                            <div className="text-emerald-700 font-bold text-sm">₩ {order.price.toLocaleString("ko-KR")}</div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        {getButtonsByStatus(order.status).map(button => (
                            <Button
                                key={`${order.id}-${button.text}`}
                                variant={button.variant}
                                className={`${baseButtonClass} ${button.isGreen ? greenButtonClass : ""}`}
                            >
                                {button.text}
                            </Button>
                        ))}
                    </div>
                </div>
            ))}

            <Button variant="outline" className="w-48 h-12 mx-auto flex items-center justify-center gap-1 text-sm font-semibold">
                더보기
                <ArrowIcon direction="down" size="sm" strokeWidth={1.5} title="더 많은 주문 내역 보기" />
            </Button>
        </div>
    );
};
