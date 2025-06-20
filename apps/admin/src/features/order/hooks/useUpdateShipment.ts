import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderShipped } from "../api/updateOrderShipped";
import { updateOrderDelivered } from "../api/updateOrderDelivered";

export const useUpdateShipment = (orderId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (status: "shipped" | "delivered") => {
            if (status === "shipped") {
                return updateOrderShipped(orderId);
            }
            return updateOrderDelivered(orderId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orderDetail", orderId] });
        },
    });
};
