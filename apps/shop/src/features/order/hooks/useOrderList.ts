import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getOrderList } from "../api/getOrderList";
import type { OrderStatus } from "../types";

export const useOrderList = ({ status, period }: { status: OrderStatus | null; period: 3 | 6 | 12 | null }) => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["orderList", status, period],
        queryFn: ({ pageParam = 1 }) => getOrderList(pageParam, status, period),
        getNextPageParam: lastPage => {
            const page = lastPage.data?.page || 1;
            const totalPages = lastPage.data?.totalPages || 0;
            if (page >= totalPages) {
                return undefined;
            }
            return page + 1;
        },
        initialPageParam: 1,
    });

    return { data, fetchNextPage, hasNextPage, isFetchingNextPage };
};
