import { fetchServer } from "@/src/shared/fetcher";
import type { OrderStatus } from "../types";

interface OrderStatusData {
    code: OrderStatus;
    label: string;
}

export const getOrderStatus = async () => {
    const fetch = fetchServer();
    const response = await fetch<OrderStatusData[]>("/orders/status");
    return response;
};
