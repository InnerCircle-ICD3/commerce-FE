import { fetchClient } from "@/src/shared/fetcher";
import type { OrderType } from "../types";

interface CancelOrderResponse {
    orderNumber: string;
}

export const cancelOrder = async (orderId: string) => {
    const fetch = fetchClient();
    const response = await fetch<CancelOrderResponse>(`/orders/${orderId}/cancel`, {
        method: "POST",
    });

    return response;
};
