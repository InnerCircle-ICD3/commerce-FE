import { Button } from "@/src/shared/components/shared/button";
import { ArrowIcon } from "@/src/shared/components/shared/Icon";
import { formatCurrency } from "@/src/shared/utils/formatUtils";
import Link from "next/link";
import { useState } from "react";
import { useOrderList } from "../hooks/useOrderList";
import { cva } from "class-variance-authority";
import type { OrderListItem } from "../types/orderListItem";
import { RefundModal } from "./RefundModal";
import Image from "next/image";
import { getOrderStatusLabel } from "@/src/shared/utils/getOrderStatusLabel";

interface ButtonConfig {
    text: string;
    variant?: "outline" | "default";
    isGreen?: boolean;
    onClick?: () => void;
}
// 공통 버튼 스타일 클래스
const buttonStyle = cva("flex-1 h-10 text-sm font-semibold", {
    variants: {
        color: {
            default: "",
            green: "bg-[#257a57] border-[#257a57] hover:bg-[#1a5f42] hover:border-[#1a5f42]",
        },
    },
});

export const OrderHistoryList = () => {
    const [page, setPage] = useState(1);
    const { data: orders, totalPages } = useOrderList(page);
    const [cancelOrderData, setCancelOrderData] = useState<OrderListItem | null>(null);

    const mockOrders: OrderListItem[] = [
        {
            orderNumber: "1234567890",
            orderStatus: "WAITING_FOR_PAYMENT",
            orderedAt: "2025-01-01",
            mainProductThumbnail: "https://via.placeholder.com/150",
            orderName: "주문 1",
            finalTotalPrice: 100000,
            cancelable: true,
            refundable: true,
        },
        {
            orderNumber: "1234567891",
            orderStatus: "SHIPPED",
            orderedAt: "2025-01-01",
            mainProductThumbnail: "https://via.placeholder.com/150",
            orderName: "주문 1",
            finalTotalPrice: 100000,
            cancelable: true,
            refundable: true,
        },
    ];

    // 주문 상태별 버튼 구성 정의
    const getButtonsByStatus = (order: OrderListItem): ButtonConfig[] => {
        switch (order.orderStatus) {
            case "WAITING_FOR_PAYMENT":
                return [
                    { text: "주문 취소", variant: "outline", onClick: () => setCancelOrderData(order) },
                    { text: "배송 조회", isGreen: true },
                ];
            case "SHIPPED":
                return [{ text: "배송 조회", isGreen: true }];
            case "DELIVERED":
                return [
                    { text: "반품 신청", variant: "outline", onClick: () => setCancelOrderData(order) },
                    { text: "배송 조회", variant: "outline" },
                ];
            case "REFUNDED":
                return [
                    { text: "반품 정보", variant: "outline" },
                    { text: "장바구니 담기", variant: "outline" },
                ];
            default:
                return [];
        }
    };

    return (
        <div className="flex flex-col w-full gap-4">
            {mockOrders?.map(order => (
                <div key={order.orderNumber} className="w-full p-6 border border-gray-300/30 rounded-xl">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-base">{getOrderStatusLabel(order.orderStatus)}</span>
                            {order?.orderedAt && <span className="text-emerald-700 text-sm">{order.orderedAt}</span>}
                        </div>
                        <Link href="/order/123456456789">
                            <button type="button" className="p-1.5">
                                <ArrowIcon direction="right" title="주문 상세 보기" />
                            </button>
                        </Link>
                    </div>

                    <div className="flex gap-4 mb-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden relative">
                            {/* <Image src={order.mainProductThumbnail} alt={`${order.orderName} 이미지`} fill sizes="5rem" className="object-cover" /> */}
                        </div>
                        <div className="flex flex-col justify-between">
                            <h3 className="font-bold text-sm">{order.orderName}</h3>
                            <div className="text-emerald-700 font-bold text-sm">{formatCurrency(order.finalTotalPrice)}</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {getButtonsByStatus(order).map(button => (
                            <Button
                                key={`${order.orderName}-${button.text}`}
                                variant={button.variant}
                                className={buttonStyle({ color: button.isGreen ? "green" : "default" })}
                                onClick={button.onClick}
                                type="button"
                            >
                                {button.text}
                            </Button>
                        ))}
                    </div>
                </div>
            ))}

            <Button
                variant="outline"
                className="w-48 h-12 mx-auto flex items-center justify-center gap-1 text-sm font-semibold"
                onClick={() => setPage(page + 1)}
                disabled={orders?.length === 0 || totalPages <= page}
            >
                더보기
                <ArrowIcon direction="down" size="sm" strokeWidth={1.5} title="더 많은 주문 내역 보기" />
            </Button>
            {cancelOrderData && <RefundModal order={cancelOrderData} onClickClose={() => setCancelOrderData(null)} />}
        </div>
    );
};
