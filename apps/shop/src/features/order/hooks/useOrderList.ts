import { useQuery } from "@tanstack/react-query";
import { getOrderList } from "../api/getOrderList";
import type { OrderListItem } from "../types/orderListItem";
import { useEffect, useState } from "react";

export const useOrderList = (page?: number) => {
    const [orderList, setOrderList] = useState<OrderListItem[]>([]);
    const { data: orderListData } = useQuery({
        queryKey: ["orderList", page],
        queryFn: () => getOrderList(page),
    });
    useEffect(() => {
        const orderList = orderListData?.data?.content;
        if (orderList) {
            setOrderList(prev => [...prev, ...orderList]);
        }
    }, [orderListData]);

    return { data: orderList, totalPages: orderListData?.data?.totalPages || 1 };
};
