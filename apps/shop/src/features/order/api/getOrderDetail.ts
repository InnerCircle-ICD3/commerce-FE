import { fetchClient } from "@/src/shared/fetcher";
import type { AddressType, OrderType } from "../types";

export const getOrderDetail = async (orderId: string) => {
    const fetch = fetchClient();
    const response = await fetch<OrderType>(`/api/orders/${orderId}`);
    return response;
};
