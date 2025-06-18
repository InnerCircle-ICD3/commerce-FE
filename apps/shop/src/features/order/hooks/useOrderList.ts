import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getOrderList } from "../api/getOrderList";

export const useOrderList = () => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["orderList"],
        queryFn: ({ pageParam = 1 }) => getOrderList(pageParam),
        getNextPageParam: lastPage => {
            const page = lastPage.data?.page || 0;
            if (page === lastPage.data?.totalPages) {
                return undefined;
            }
            return page + 1;
        },
        initialPageParam: 1,
    });

    return { data, fetchNextPage, hasNextPage, isFetchingNextPage };
};
