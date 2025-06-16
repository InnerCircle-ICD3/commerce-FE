import { useMutation } from "@tanstack/react-query";
import { refundPayment } from "../api/refundPaypment";

export const useRefundPayment = () => {
    return useMutation({
        mutationFn: refundPayment,
    });
};
