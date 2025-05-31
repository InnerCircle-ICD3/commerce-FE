"use client";

import { QuantityDecreaseIcon, QuantityIncreaseIcon } from "@/src/shared/components/shared/Icon";
import { fetchClient } from "@/src/shared/fetcher";
import { useToast } from "@/src/shared/hooks/useToast";
import { useEffect, useState } from "react";
import type { UpdateCartItemRequest, UpdateCartItemResponse } from "../types/cart";

type QuantityChangeProps = {
    productId: number;
    initQuantity: number;
    stockQuantity: number;
};

const QUANTITY_STEP = 10;

export default function QuantityChange({ productId, initQuantity, stockQuantity }: QuantityChangeProps) {
    const [quantity, setQuantity] = useState<number>(initQuantity);
    const { toast, ToastUI } = useToast();
    const fetch = fetchClient();

    useEffect(() => {
        if (quantity !== initQuantity) {
            changeQuantity(quantity);
        }
    }, [initQuantity, quantity]);

    const onMinusClick = () => {
        if (quantity - QUANTITY_STEP > 0) {
            changeQuantity(quantity - QUANTITY_STEP);
        }
    };

    const onPlusClick = () => {
        if (quantity + QUANTITY_STEP <= stockQuantity) {
            changeQuantity(quantity + QUANTITY_STEP);
        }
    };

    const changeQuantity = (newQuantity: number) => {
        const requestBody: UpdateCartItemRequest = {
            productId,
            quantity: newQuantity,
        };

        fetch<UpdateCartItemResponse>("/cart/items", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
        })
            .then(res => {
                if (!res.data) {
                    throw new Error();
                }

                if (res.data.requiresQuantityAdjustment) {
                    toast({
                        message: `수량이 ${QUANTITY_STEP}의 배수가 아니거나 재고가 부족하여 ${res.data.quantity}개로 조정되었습니다.`,
                    });
                }

                setQuantity(res.data.quantity);
            })
            .catch(error => {
                toast({
                    message: `수량 변경에 실패했습니다: ${error.code ?? ""} ${error instanceof Error ? error.message : "알 수 없는 오류"}`,
                });
            });
    };

    return (
        <>
            <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2">
                <button type="button" onClick={onMinusClick}>
                    <QuantityDecreaseIcon />
                </button>
                <input
                    type="number"
                    className={`flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 w-[4rem] h-8 relative gap-2 px-4 py-2 rounded border-[0.5px] border-[#70737c]/[0.22] text-base font-semibold text-center text-black ${stockQuantity === 0 ? "bg-gray-100" : ""}`}
                    value={quantity}
                    readOnly
                    tabIndex={-1}
                />
                <button type="button" onClick={onPlusClick}>
                    <QuantityIncreaseIcon />
                </button>
            </div>
            {ToastUI}
        </>
    );
}
