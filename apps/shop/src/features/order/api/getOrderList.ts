import type { OrderListItem } from "../types/orderListItem";

type GetOrderListResponse = {
    content: OrderListItem[];
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
};

export const getOrderList = async (page?: number): Promise<{ data: GetOrderListResponse; error: Error | null }> => {
    // const fetch = fetchClient();
    const response = await fetch(`http://localhost:3000/api/orders?page=${page}`);
    const data = await response.json();
    return data;
};
