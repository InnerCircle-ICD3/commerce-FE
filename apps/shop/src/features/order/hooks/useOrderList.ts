import { useQuery } from "@tanstack/react-query";
import { getOrderList } from "../api/getOrderList";
import type { OrderListItem } from "../types/orderListItem";
import { useEffect, useState } from "react";

export const useOrderList = (page?: number) => {
    const [orderList, setOrderList] = useState<OrderListItem[]>([]);
    const { data } = useQuery({
        queryKey: ["orderList", page],
        queryFn: () => getOrderList(page),
    });
    useEffect(() => {
        if (data) {
            setOrderList(prev => [...prev, ...data.data.content]);
        }
    }, [data]);

    return { data: orderList, totalPages: data?.data.totalPages || 1 };
};
