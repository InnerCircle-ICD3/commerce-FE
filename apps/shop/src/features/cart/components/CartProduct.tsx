"use client";

import Item from "./Item";
import { useState } from "react";
import { type CustomError, fetchClient } from "@/src/shared/fetcher";
import type { CartItem } from "@/src/features/cart/types/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/src/shared/hooks/useToast";

export default function CartProduct({ cartItems }: { cartItems: CartItem[] }) {
    const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);
    const queryClient = useQueryClient();
    const { toast, ToastUI } = useToast();

    const fetch = fetchClient();
    const isAllSelected = cartItems.length > 0 && selectedItemIds.length === cartItems.length;

    const onSelectAllClick = () => {
        if (isAllSelected) {
            setSelectedItemIds([]);
        } else {
            setSelectedItemIds(cartItems.map(item => item.cartItemId));
        }
    };

    const onItemSelectChange = (id: number) => {
        setSelectedItemIds(prev => {
            if (prev.includes(id)) {
                return prev.filter(itemId => itemId !== id);
            }

            return [...prev, id];
        });
    };

    const deleteCartItems = useMutation({
        mutationFn: async (productIds: number[]) => {
            const requestBody: { productIds: number[] } = { productIds };

            await fetch("/cart/items", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });
        },
        onSuccess: () => {
            setSelectedItemIds([]);
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
        onError: (e: unknown) => {
            const err = e as CustomError;
            console.error(`장바구니 아이템 삭제 실패: ${err.code} - ${err.message}`);

            toast({
                message: "장바구니 아이템 삭제 중 오류가 발생했습니다.",
            });
        },
    });

    const onDelete = (id: number) => {
        deleteCartItems.mutate([id]);
    };

    const onDeleteAll = () => {
        if (selectedItemIds.length === 0) return;
        deleteCartItems.mutate(selectedItemIds);
    };

    return (
        <>
            <div className="flex gap-2 w-full justify-between items-center">
                <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2">
                    <input type="checkbox" className="w-4.5 h-4.5" onChange={onSelectAllClick} checked={isAllSelected} aria-checked={isAllSelected} />
                    <p className="flex-grow-0 flex-shrink-0 text-base font-bold text-left text-black">전체선택</p>
                </div>
                <button
                    type="button"
                    className="flex-grow-0 flex-shrink-0 text-sm font-semibold text-center text-[#47484C] p-2 rounded-md border border-[#E8E8EA] disabled:bg-[#E8E8EA] disabled:text-[#858588]"
                    onClick={onDeleteAll}
                    disabled={selectedItemIds.length === 0}
                >
                    전체 삭제
                </button>
            </div>
            {cartItems.map(item => (
                <Item
                    key={item.cartItemId}
                    productId={item.productId}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    stockQuantity={item.stockQuantity}
                    image={item.thumbnail}
                    selected={selectedItemIds.includes(item.cartItemId)}
                    onSelectChange={() => onItemSelectChange(item.cartItemId)}
                    onDelete={() => onDelete(item.cartItemId)}
                />
            ))}
            <div className="flex-grow-0 flex-shrink-0 text-xs text-gray-400 gap-2">
                <p>*수량은 각 제품 캡슐 단위로 변경이 가능합니다.</p>
            </div>
            {ToastUI}
        </>
    );
}
