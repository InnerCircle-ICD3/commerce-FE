import { fetchClient } from "@/src/shared/fetcher";

interface CancelPaymentData {
    message: string;
}

export const cancelPayment = async (orderNumber: string) => {
    const fetch = fetchClient();
    const response = await fetch<CancelPaymentData>("/payments/cancel", {
        method: "POST",
        body: JSON.stringify({
            orderNumber,
        }),
    });
    console.log(response);
    return response;
};
