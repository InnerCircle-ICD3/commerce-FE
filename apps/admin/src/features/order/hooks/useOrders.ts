import { useQuery } from "@tanstack/react-query";
import { getOrders, type GetOrdersRequestDto } from "../api/getOrders";

export const useOrders = (requestDto: GetOrdersRequestDto) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["orders", requestDto],
        queryFn: () => getOrders(requestDto),
    });

    const orders = data?.content;
    const totalPages = data?.totalPages;
    const totalElements = data?.totalElements;

    return { orders, totalPages, totalElements, isLoading, error };
};
