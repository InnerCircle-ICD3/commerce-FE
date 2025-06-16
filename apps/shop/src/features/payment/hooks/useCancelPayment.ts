import { useMutation } from "@tanstack/react-query";
import { cancelPayment } from "../api/cancelPayment";

export const useCancelPayment = () => {
    return useMutation({
        mutationFn: cancelPayment,
    });
};
