import { fetcher } from "@/shared/kyInstance";

interface GetOrderDetailResponse {
    orderId: number;
    orderNumber: string;
    orderStatus: string;
    trackingNumber: string;
    paymentNumber: string;
    paymentMethod: string;
    itemsSubTotal: number;
    shippingFee: number;
    finalTotalPrice: number;
    items: [
        {
            orderItemId: number;
            productId: number;
            name: string;
            thumbnail: string;
            unitPrice: number;
            quantity: number;
            itemSubTotal: number;
        },
    ];
    shippingInfo: {
        recipientName: string;
        recipientPhone: string;
        zipCode: string;
        address1: string;
        address2: string;
        deliveryMessage: string;
    };
    orderedAt: string;
    paidAt: string;
    cancellable: boolean;
    cancelRequested: boolean;
    cancelledAt: string;
    refundable: boolean;
    refundRequested: boolean;
    refundRequestedAt: string;
    refunded: boolean;
    refundedAt: string;
}

export const getOrderDetail = async (orderId: number) => {
    const response = await fetcher<GetOrderDetailResponse>(`admin/orders/${orderId}`);
    return response;
};
