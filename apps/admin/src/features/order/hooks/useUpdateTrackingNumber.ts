import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTrackingNumber } from "../api/updateTrackingNumber";

export const useUpdateTrackingNumber = (orderId: number) => {
    const queryClient = useQueryClient();

    const { mutate: updateTrackingNumberMutation } = useMutation({
        mutationFn: updateTrackingNumber,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orderDetail", orderId] });
        },
        onError: error => {
            console.error(error);
        },
    });

    return { updateTrackingNumberMutation };
};
