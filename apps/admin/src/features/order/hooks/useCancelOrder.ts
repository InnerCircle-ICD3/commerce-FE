import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "../api/cancelOrder";

export const useCancelOrder = (orderId: number) => {
    const queryClient = useQueryClient();

    const {
        mutate: cancelOrderMutation,
        isPending,
        error,
    } = useMutation({
        mutationFn: () => cancelOrder(orderId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orderDetail", orderId] });
        },
        onError: error => {
            console.error(error);
        },
    });

    return { cancelOrderMutation, isPending, error };
};
