import type { OrderStatus } from ".";

export type OrderListItem = {
    orderNumber: string;
    orderName: string;
    orderStatus: OrderStatus;
    finalTotalPrice: number;
    cancellable: boolean;
    refundable: boolean;
    orderedAt: string;
    mainProductThumbnail: string;
    trackingNumber: string | null;
};
