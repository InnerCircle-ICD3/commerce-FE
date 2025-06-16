import type { OrderStatus } from ".";

export type OrderListItem = {
    orderNumber: string;
    orderName: string;
    orderStatus: OrderStatus;
    finalTotalPrice: number;
    cancelable: boolean;
    refundable: boolean;
    orderedAt: string;
    mainProductThumbnail: string;
};
