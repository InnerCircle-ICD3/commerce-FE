import { fetchClient } from "@/src/shared/fetcher";
import type { PaymentMethod } from "../types/paymentMethod";

type GetPaymentMethodsReponse = PaymentMethod[];

export const getPaymentMethods = async () => {
    const fetch = fetchClient();
    const response = await fetch<GetPaymentMethodsReponse>("/api/payment/methods");

    return response;
};
