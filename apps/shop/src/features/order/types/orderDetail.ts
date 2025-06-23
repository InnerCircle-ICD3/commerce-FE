import type { OrderStatus } from ".";
import type { PaymentStatus } from "../../payment/types";

// 주문 상세 페이지 관련 UI 타입들
export interface Product {
    id: string;
    name: string;
    price: number;
    quantity: number;
    unitPrice: number;
    imageSrc: string;
}

export interface PaymentItem {
    id: string;
    name: string;
    price: number;
}

export interface ShippingInfo {
    name: string;
    address: string;
    phone: string;
    memo?: string;
}

export interface OrderDetailData {
    orderNumber: string;
    orderStatus: OrderStatus;
    paymentNumber: string;
    paymentStatus: PaymentStatus;
    paymentMethod: string;
    itemsSubTotal: number;
    shippingFee: number;
    finalTotalPrice: number;
    trackingNumber: string | null;
    items: {
        orderItemId: string;
        productId: number;
        name: string;
        thumbnail: string;
        unitPrice: number;
        quantity: number;
        itemSubTotal: number;
    }[];
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
    refundRequested: boolean;
    cancelReason: string;
    canceledAt: string;
    refundable: boolean;
    refundReason: string;
    refundRequestedAt: string;
    refunded: boolean;
    refunedAt: string;
    reviewable: boolean;
    reviewWritten: boolean;
}
