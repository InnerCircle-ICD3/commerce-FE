import { fetchClient } from "@/src/shared/fetcher";

type CreatePaymentResponse = {
    paymentNumber?: string;
};

type CreatePaymentParams = {
    orderNumber: string;
    transactionId: string;
};

export const createPayment = async (params: CreatePaymentParams) => {
    const fetch = fetchClient();

    const response = await fetch<CreatePaymentResponse>("/payments", {
        method: "POST",
        body: JSON.stringify(params),
    });

    return {
        data: {
            ...response.data,
            orderNumber: params.orderNumber,
        },
        error: response.error,
    };
};
