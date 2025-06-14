import { useQuery } from "@tanstack/react-query";
import { getOrderDetail } from "../api/getOrderDetail";

export const useOrderDetail = (orderId: string) => {
    return useQuery({
        queryKey: ["orderDetail", orderId],
        queryFn: () => getOrderDetail(orderId),
    });
};
