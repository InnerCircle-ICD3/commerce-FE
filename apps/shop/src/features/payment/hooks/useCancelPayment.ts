import { useMutation } from "@tanstack/react-query";
import { cancelPayment } from "../api/cancelPayment";

interface CancelPaymentProps {
    onSuccess?: () => void;
    onError?: () => void;
}
export const useCancelPayment = ({ onSuccess, onError }: CancelPaymentProps) => {
    return useMutation({
        mutationFn: cancelPayment,
        onSuccess,
        onError,
    });
};
