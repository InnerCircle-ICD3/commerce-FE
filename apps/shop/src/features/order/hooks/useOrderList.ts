import { useQuery } from "@tanstack/react-query";
import { getOrderList } from "../api/getOrderList";

export const useOrderList = () => {
    return useQuery({
        queryKey: ["orderList"],
        queryFn: () => getOrderList(),
    });
};
