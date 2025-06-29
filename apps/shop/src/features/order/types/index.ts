import type { PaymentStatus } from "../../payment/types";

export type OrderType = {
    orderNumber: string;
    user: {
        externalId: string;
        name: string;
    };
    orderStatus: OrderStatus;
    paymentStatus: PaymentStatus;
    orderedAt: string;
    paymentNumber: string;
    paymentMethod: string;
    paidAt: string;
    originalPrice: number;
    itemDiscountTotal: number;
    orderDiscountTotal: number;
    totalDiscount: number;
    orderDiscounts: {
        type: string;
        name: string;
        amount: number;
        couponCode: string;
    }[];
    items: OrderItemType[];
    deliveryAddress: DeliveryAddress;
    deliveryMessage: string;
    deliveryTracking: {
        companyCode: string;
        companyName: string;
        trackingNumber: string;
        trackingUrl: string;
    };
    deliveryHistory: {
        status: string;
        label: string;
        updatedAt: string;
    }[];
    statusHistory: {
        type: string;
        status: string;
        updatedAt: string;
    }[];
    cancellable: boolean;
    cancelRequested: boolean;
    cancelReason: string;
    canceledAt: string;
    refundRequested: boolean;
    refundReason: string;
    refundRequestedAt: string;
    refunded: boolean;
    refundedAt: string;
    reviewable: boolean;
    reviewWritten: boolean;
    invoiceUrl: string;
};

export type DeliveryAddress = {
    recipientName: string;
    recipientPhone: string;
    zipCode: string;
    address1: string;
    address2: string;
};

export type OrderItemType = {
    productId: number;
    name: string;
    thumbnail: string;
    price: number;
    quantity: number;
    originalPrice: number;
    discountAmount: number;
    finalPrice: number;
    discounts: {
        type: string;
        name: string;
        amount: number;
        couponCode: string;
    }[];
};

export type AddressType = {
    addressId: number;
    alias: string;
    address1: string;
    address2: string;
    zipCode: string;
    recipientName: string;
    recipientPhone: string;
    isDefault: boolean;
};

export type OrderStatus =
    | "WAITING_FOR_PAYMENT"
    | "PAID"
    | "PREPARING_SHIPMENT"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED"
    | "REFUND_REQUESTED"
    | "REFUNDED"
    | "REFUND_REJECTED";
