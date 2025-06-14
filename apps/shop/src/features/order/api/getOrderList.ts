import { fetchClient } from "@/src/shared/fetcher";
import type { OrderType } from "../types";

export const getOrderList = async () => {
    const fetch = fetchClient();
    const response = await fetch<OrderType[]>("/api/orders");
    return response;
};
