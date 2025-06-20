import { useQuery } from "@tanstack/react-query";
import { getOrderDetail } from "../api/getOrderDetail";

export const useOrderDetail = (orderId: number) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["orderDetail", orderId],
        queryFn: () => getOrderDetail(orderId),
    });

    return { order: data, isLoading, error };
};
