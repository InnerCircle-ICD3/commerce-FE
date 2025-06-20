import { useQuery } from "@tanstack/react-query";
import { getOrderStatus } from "../api/getOrderStatus";

export const useOrderStatus = () => {
    return useQuery({
        queryKey: ["orderStatus"],
        queryFn: getOrderStatus,
    });
};
