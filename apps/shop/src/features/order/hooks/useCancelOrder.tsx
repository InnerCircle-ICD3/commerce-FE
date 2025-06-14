import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "../api/cancelOrder";

export const useCancelOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (orderId: string) => cancelOrder(orderId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orderList"] });
            queryClient.invalidateQueries({ queryKey: ["orderDetail"] });
        },
    });
};
