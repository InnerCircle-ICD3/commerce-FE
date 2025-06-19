import { Button } from "@/src/shared/components/shared/button";
import { ArrowIcon } from "@/src/shared/components/shared/Icon";
import { useState } from "react";
import { useOrderList } from "../hooks/useOrderList";
import type { OrderListItem } from "../types/orderListItem";
import { CancelOrderModal } from "./CancelOrderModal";

import type { OrderStatus } from "../types";
import { useToast } from "@/src/shared/hooks/useToast";
import { OrderHistoryItem } from "./OrderHistoryItem";


interface OrderHistoryListProps {
    status: OrderStatus | null;
    period: 3 | 6 | 12 | null;
}

export const OrderHistoryList = ({ status, period }: OrderHistoryListProps) => {
    const { data: orders, hasNextPage, fetchNextPage } = useOrderList({ status, period });
    const [cancelOrderData, setCancelOrderData] = useState<OrderListItem | null>(null);

    const { toast, ToastUI } = useToast();
    const onCancelOrder = () => {
        toast({ message: "주문 취소가 완료되었습니다." });
        setCancelOrderData(null);
    };


    // 주문 상태별 버튼 구성 정의

    return (
        <div className="flex flex-col w-full gap-4">
            {orders?.pages.map(({ data }) =>
                data?.content.map(order => <OrderHistoryItem key={order.orderNumber} order={order} onClickCancelOrder={setCancelOrderData} />),
            )}

            <Button
                variant="outline"
                className="w-48 h-12 mx-auto flex items-center justify-center gap-1 text-sm font-semibold"
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage}
            >
                더보기
                <ArrowIcon direction="down" size="sm" strokeWidth={1.5} title="더 많은 주문 내역 보기" />
            </Button>
            {cancelOrderData && (
                <CancelOrderModal order={cancelOrderData} onClickClose={() => setCancelOrderData(null)} onCancelOrder={onCancelOrder} />
            )}
            {ToastUI}

        </div>
    );
};
