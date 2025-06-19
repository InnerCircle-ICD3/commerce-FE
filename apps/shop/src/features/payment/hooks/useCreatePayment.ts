import { useMutation } from "@tanstack/react-query";
import { createPayment } from "../api/createPayment";
import { useRouter } from "next/navigation";

export const useCreatePayment = () => {
    const router = useRouter();
    const { mutate, error } = useMutation({
        mutationFn: createPayment,
        onSuccess: ({ data }) => {
            if (data) {
                router.push(`/order/${data.orderNumber}`);
            }
        },
        retry: 3,
    });

    return { mutate, error };
};
