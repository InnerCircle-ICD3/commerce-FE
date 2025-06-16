import { useMutation } from "@tanstack/react-query";
import { refundPayment } from "../api/refundPaypment";

interface RefundPaymentProps {
    onSuccess?: () => void;
    onError?: () => void;
}
export const useRefundPayment = ({ onSuccess, onError }: RefundPaymentProps) => {
    return useMutation({
        mutationFn: refundPayment,
        onSuccess,
        onError,
    });
};
