import { fetchClient } from "@/src/shared/fetcher";
import type { OrderListItem } from "../types/orderListItem";
import type { OrderStatus } from "../types";

type GetOrderListResponse = {
    content: OrderListItem[];
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
};

export const getOrderList = async (
    page?: number,
    status?: OrderStatus | null,
    period?: 3 | 6 | 12 | null,
): Promise<{ data: GetOrderListResponse | null; error: Error | null }> => {
    const fetch = fetchClient();
    const searchParams = new URLSearchParams();
    if (page) searchParams.set("page", page.toString());
    if (status) searchParams.set("status", status);
    if (period) searchParams.set("period", period.toString());
    const response = await fetch<GetOrderListResponse>(`/orders?${searchParams.toString()}`);
    return response;
};
