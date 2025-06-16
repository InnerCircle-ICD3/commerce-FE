import { fetchClient } from "@/src/shared/fetcher";
import type { OrderListItem } from "../types/orderListItem";

type GetOrderListResponse = {
    content: OrderListItem[];
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
};

export const getOrderList = async (page?: number): Promise<{ data: GetOrderListResponse | null; error: Error | null }> => {
    const fetch = fetchClient();
    const response = await fetch<GetOrderListResponse>(`/api/orders?page=${page}`);
    return response;
};
