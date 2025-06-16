import { fetchClient } from "@/src/shared/fetcher";

interface RefundPaymentData {
    message: string;
}

export const refundPayment = async (orderNumber: string) => {
    const fetch = fetchClient();
    const response = await fetch<RefundPaymentData>("/payments/refund", {
        method: "POST",
        body: JSON.stringify({
            orderNumber,
        }),
    });

    return response;
};
