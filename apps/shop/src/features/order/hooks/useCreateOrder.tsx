import { fetchClient } from "@/src/shared/fetcher";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

interface CreateOrderParams {
    addressId: number | null;
    deliveryMessage: string | null;
    cartItemIds: number[];
}

interface UseCreateOrderProps {
    onSuccess?: (data: CreateOrderResponse | null) => void;
    onError?: (error: CreateOrderError) => void;
}

interface CreateOrderResponse {
    orderNumber: string;
}

interface CreateOrderError {
    code: string;
    message: string;
}

const createOrderSchema = z.object({
    addressId: z.number({ message: "주소를 선택해주세요." }),
    deliveryMessage: z.string().optional(),
    cartItemIds: z.array(z.number({ message: "상품을 선택해주세요." })).min(1, { message: "상품을 선택해주세요." }),
});

const createOrder = async (params: CreateOrderParams): Promise<CreateOrderResponse | null> => {
    try {
        const validatedParams = createOrderSchema.parse(params);
        const fetch = fetchClient();
        const response = await fetch<CreateOrderResponse>("/api/orders", {
            method: "POST",
            body: JSON.stringify(validatedParams),
        });
        return response.data;
    } catch (e) {
        if (e instanceof z.ZodError) {
            throw new Error(e.errors[0].message);
        }
        throw new Error("주문 생성에 실패했습니다.");
    }
};

export default function useCreateOrder(props?: UseCreateOrderProps) {
    const { mutate: createOrderMutate, isPending } = useMutation<CreateOrderResponse | null, CreateOrderError, CreateOrderParams>({
        mutationFn: (params: CreateOrderParams) => createOrder(params),
        onSuccess: props?.onSuccess,
        onError: props?.onError,
    });

    return {
        createOrderMutate,
        isPending,
    };
}
