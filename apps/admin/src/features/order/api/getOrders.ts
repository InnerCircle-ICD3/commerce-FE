import { fetcher } from "@/shared/kyInstance";
import type { OrderListItem } from "../types/order";

interface GetOrdersResponse {
    content: OrderListItem[];
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
}

export interface GetOrdersRequestDto {
    page: number;
    dateTo?: string;
    dateFrom?: string;
    orderNumber?: string;
    status?: string;
    nickname?: string;
    productName?: string;
}

export type SearchOrderType = "orderNumber" | "status" | "nickname" | "productName" | "dateTo" | "dateFrom" | "page";

export const getOrders = async (requestDto: GetOrdersRequestDto) => {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(requestDto)) {
        if (value) {
            searchParams.set(key, value);
        }
    }
    const response = await fetcher<GetOrdersResponse>(`admin/orders?${searchParams.toString()}`);
    return response;
};
