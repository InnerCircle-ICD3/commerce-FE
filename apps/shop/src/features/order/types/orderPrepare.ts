import type { PaymentMethod } from "../../payment/types/paymentMethod";

export type OrderPrepareResponse = {
    cartItemIds: number[];
    itemsSubtotal: number;
    shippingFee: number;
    finalTotalPrice: number;
    items: {
        cartItemId: number;
        productId: number;
        name: string;
        thumbnail: string;
        unitPrice: number;
        quantity: number;
        itemSubtotal: number;
    }[];
    shippingInfo: {
        addressId: number;
        recipientName: string;
        recipientPhone: string;
        zipCode: string;
        address1: string;
        address2: string;
        isDefault: boolean;
        alias: string;
    };
    paymentMethod: PaymentMethod[];
};
