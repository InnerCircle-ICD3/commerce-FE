import { fetchClient } from "@/src/shared/fetcher";
import type { OrderPrepareResponse } from "../types/orderPrepare";

export const orderPrepare = async (
    cartItemIds: string,
): Promise<{
    data: OrderPrepareResponse | null;
    error: Error | null;
}> => {
    const fetch = fetchClient();
    const response = await fetch<OrderPrepareResponse>(`/orders/prepare?cartItemIds=${cartItemIds}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer Simeple-Token",
        },
    });
    return response;
};
