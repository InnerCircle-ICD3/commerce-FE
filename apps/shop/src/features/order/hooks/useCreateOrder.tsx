import { fetchClient } from "@/src/shared/fetcher";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import type { AddressType } from "../types";

interface CreateOrderParams {
    cartItemIds: number[];
    shippingInfo: Omit<AddressType, "addressId"> & { deliveryMessage: string };
    paymentMethod: string;
}

interface UseCreateOrderProps {
    onSuccess?: (data: { data: CreateOrderResponse | null; error: Error | null }) => void;
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
    shippingInfo: z.object({
        alias: z.string().optional(),
        address1: z.string().min(1, "주소를 입력해주세요."),
        address2: z.string().min(1, "상세주소를 입력해주세요."),
        zipCode: z.string().min(1, "우편번호를 입력해주세요."),
        recipientName: z.string().min(1, "받는 사람 이름을 입력해주세요."),
        recipientPhone: z.string().min(1, "받는 사람 전화번호를 입력해주세요."),
        isDefault: z.boolean().optional(),
        deliveryMessage: z.string().optional(),
    }),
    cartItemIds: z.array(z.number()).min(1, "상품을 선택해주세요."),
    paymentMethod: z.string().min(1, "결제 수단을 선택해주세요."),
});

const createOrder = async (params: CreateOrderParams): Promise<{ data: CreateOrderResponse | null; error: Error | null }> => {
    try {
        const validatedParams = createOrderSchema.parse(params);
        const fetch = fetchClient();
        const response = await fetch<CreateOrderResponse>("/orders", {
            method: "POST",
            body: JSON.stringify(validatedParams),
        });
        return response;
    } catch (e) {
        if (e instanceof z.ZodError) {
            throw new Error(e.errors[0].message);
        }
        throw new Error("주문 생성에 실패했습니다.");
    }
};

export default function useCreateOrder(props?: UseCreateOrderProps) {
    const { mutate: createOrderMutate, isPending } = useMutation<
        {
            data: CreateOrderResponse | null;
            error: Error | null;
        },
        CreateOrderError,
        CreateOrderParams
    >({
        mutationFn: (params: CreateOrderParams) => createOrder(params),
        onSuccess: props?.onSuccess,
        onError: props?.onError,
    });

    return {
        createOrderMutate,
        isPending,
    };
}
