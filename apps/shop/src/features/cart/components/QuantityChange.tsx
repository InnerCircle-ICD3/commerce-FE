"use client";

import { QuantityDecreaseIcon, QuantityIncreaseIcon } from "@/src/shared/components/shared/Icon";
import { fetchClient } from "@/src/shared/fetcher";
import { useToast } from "@/src/shared/hooks/useToast";
import { useEffect, useState, useRef, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { UpdateCartItemRequest, UpdateCartItemResponse } from "../types/cart";

type QuantityChangeProps = {
    cartItemId: number;
    initQuantity: number;
    stockQuantity: number;
};

export default function QuantityChange({ cartItemId, initQuantity, stockQuantity }: QuantityChangeProps) {
    const [quantity, setQuantity] = useState<number>(initQuantity);
    const [pendingQuantity, setPendingQuantity] = useState<number>(initQuantity);
    const { toast, ToastUI } = useToast();
    const fetch = fetchClient();
    const queryClient = useQueryClient();
    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isUpdatingRef = useRef<boolean>(false);

    // initQuantity가 변경되면 quantity 상태를 동기화 (API 호출 없이)
    useEffect(() => {
        setQuantity(initQuantity);
        setPendingQuantity(initQuantity);
    }, [initQuantity]);
    
      // 디바운싱된 API 호출 함수
    const debouncedChangeQuantity = useCallback((newQuantity: number) => {
        // 이전 타이머 클리어
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        // 새로운 타이머 설정 (500ms 후 API 호출)
        debounceTimeoutRef.current = setTimeout(() => {
            changeQuantity(newQuantity);
        }, 500);
    }, []);

    // 컴포넌트 언마운트 시 타이머 정리
    useEffect(() => {
        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, []);

    const onMinusClick = () => {
        const newQuantity = pendingQuantity - 1;
        if (newQuantity > 0) {
            setPendingQuantity(newQuantity);
            debouncedChangeQuantity(newQuantity);
        }
    };

    const onPlusClick = () => {
        const newQuantity = pendingQuantity + 1;
        if (newQuantity <= stockQuantity) {
            setPendingQuantity(newQuantity);
            debouncedChangeQuantity(newQuantity);
        }
    };    
    
    const changeQuantity = (newQuantity: number) => {
        // 이미 업데이트 중이면 무시
        if (isUpdatingRef.current) {
            return;
        }

        isUpdatingRef.current = true;

        const requestBody: UpdateCartItemRequest = {
            quantity: newQuantity,
        };

        fetch<UpdateCartItemResponse>(`/cart-items/${cartItemId}`, {
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
                        message: `재고가 ${res.data.stockQuantity}개로 한정되어 ${res.data.quantity}개만 장바구니에 추가되었습니다.`,
                    });
                }

                setQuantity(res.data.quantity);
                setPendingQuantity(res.data.quantity);
                
                // React Query 캐시 무효화하여 최신 데이터로 업데이트
                queryClient.invalidateQueries({ queryKey: ["cart"] });
            })
            .catch(error => {
                // 실패 시 원래 수량으로 복원
                setPendingQuantity(quantity);
                
                toast({
                    message: "수량 변경에 실패했습니다.",
                });

                console.error(`수량 변경 실패: ${error.code} - ${error.message || "알 수 없는 오류"}`);
            })
            .finally(() => {
                isUpdatingRef.current = false;
            });
    };

    return (
        <>
            <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2">
                <button type="button" onClick={onMinusClick}>
                    <QuantityDecreaseIcon />
                </button>                <input
                    type="number"
                    className={`flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 w-[4rem] h-8 relative gap-2 px-4 py-2 rounded border-[0.5px] border-[#70737c]/[0.22] text-base font-semibold text-center text-black ${stockQuantity === 0 ? "bg-gray-100" : ""}`}
                    value={pendingQuantity}
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
