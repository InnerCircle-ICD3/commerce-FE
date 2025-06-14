export type OrderListItem = {
    orderNumber: string;
    orderName: string;
    orderStatus: "주문완료" | "배송 준비중" | "배송중" | "배송완료";
    finalTotalPrice: number;
    cancelable: boolean;
    refundable: boolean;
    orderedAt: string;
    mainProductThumbnail: string;
};
