import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "../api/cancelOrder";

interface UseCancelOrderProps {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

export const useCancelOrder = ({ onSuccess, onError }: UseCancelOrderProps) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (orderId: string) => cancelOrder(orderId),
        onSuccess: (_, orderId) => {
            queryClient.invalidateQueries({ queryKey: ["orderList"] });
            queryClient.invalidateQueries({ queryKey: ["orderDetail"] });
            onSuccess?.();
        },
        onError: (error, orderId) => {
            onError?.(error);
        },
    });
};
