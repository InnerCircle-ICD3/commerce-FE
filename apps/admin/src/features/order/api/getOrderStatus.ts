import { get } from "@/shared/kyInstance";
import type { OrderStatus } from "../types/order";

export const getOrderStatus = async () => {
    const response = await get<OrderStatus[]>("orders/status");
    return response;
};
