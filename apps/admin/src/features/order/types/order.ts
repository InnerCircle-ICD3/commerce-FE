export type OrderListItem = {
    orderId: number;
    orderNumber: string;
    trackingNumber: string | null;
    orderName: string;
    orderStatus: string;
    finalTotalPrice: number;
    orderedAt: string;
    customerId: number;
    customerName: string;
};

export type OrderStatus = {
    code: string;
    label: string;
};
