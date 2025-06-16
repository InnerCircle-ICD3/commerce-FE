import { Button } from "@/src/shared/components/shared/button";
import { ArrowIcon } from "@/src/shared/components/shared/Icon";
import { formatCurrency } from "@/src/shared/utils/formatUtils";
import Link from "next/link";
import { useState } from "react";
import { useOrderList } from "../hooks/useOrderList";
import type { OrderStatus } from "../types";
import { useCancelPayment } from "../../payment/hooks/useCancelPayment";
import { useRefundPayment } from "../../payment/hooks/useRefundPayment";
import { cva } from "class-variance-authority";
import Image from "next/image";
import type { OrderListItem } from "../types/orderListItem";

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

    const { mutate: cancelPayment } = useCancelPayment();
    const { mutate: refundPayment } = useRefundPayment();

    // 주문 상태별 버튼 구성 정의
    const getButtonsByStatus = (order: OrderListItem): ButtonConfig[] => {
        switch (order.orderStatus) {
            case "WAITING_FOR_PAYMENT":
                return [
                    { text: "주문 취소", variant: "outline", onClick: () => cancelPayment(order.orderNumber) },
                    { text: "배송 조회", isGreen: true },
                ];
            case "SHIPPED":
                return [{ text: "배송 조회", isGreen: true }];
            case "DELIVERED":
                return [
                    { text: "반품 신청", variant: "outline", onClick: () => refundPayment(order.orderNumber) },
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
            {orders?.map(order => (
                <div key={order.orderNumber} className="w-full p-6 border border-gray-300/30 rounded-xl">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-base">{order.orderStatus}</span>
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
                            <Image src={order.mainProductThumbnail} alt={`${order.orderName} 이미지`} fill sizes="5rem" className="object-cover" />
                        </div>
                        <div className="flex flex-col justify-between">
                            <h3 className="font-bold text-sm">{order.orderName}</h3>
                            <div className="text-emerald-700 font-bold text-sm">{formatCurrency(order.finalTotalPrice)}</div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        {getButtonsByStatus(order).map(button => (
                            <Link key={`${order.orderName}-${button.text}`} href={`/order/${order.orderNumber}`} className="flex-1">
                                <Button
                                    variant={button.variant}
                                    className={buttonStyle({ color: button.isGreen ? "green" : "default" })}
                                    onClick={button.onClick}
                                >
                                    {button.text}
                                </Button>
                            </Link>
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
        </div>
    );
};
