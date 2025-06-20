"use client";

import AddCartPopup from "@/src/features/product/components/AddCartPopup";
import AddToCartButton from "@/src/features/product/components/AddToCartButton";
import { type CustomError, fetchClient } from "@/src/shared/fetcher";
import { useToast } from "@/src/shared/hooks/useToast";
import { useState } from "react";
import type { AddCartItemResponse } from "../../cart/types/cart";
import { useSession } from "next-auth/react";
import ConfirmDialog from "@/src/shared/components/shared/ConfirmDialog";
type AddToCartProps = {
    productId: number;
    title: string;
    stockQuantity: number;
    withPopup?: boolean;
    quantity?: number;
};

export default function AddToCart({ productId, title, stockQuantity, withPopup = false, quantity }: AddToCartProps) {
    const { data: session } = useSession();
    const { toast, ToastUI } = useToast();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(false);
    const inStock = stockQuantity > 0;

    const onButtonClick = () => {
        if (!session) {
            setIsLoginAlertOpen(true);
            return;
        }

        if (!inStock) {
            return;
        }

        if (withPopup) {
            setIsPopupOpen(true);
        } else {
            if (!quantity && quantity !== 0) return;
            validateQuantity(quantity) && addToCart(quantity);
        }
    };

    const validateQuantity = (quantity: number) => {
        if (quantity < 1) {
            toast({
                message: "수량은 1개 이상이어야 합니다.",
            });

            return false;
        }

        if (quantity > stockQuantity) {
            toast({
                message: `재고가 부족합니다. 현재 재고는 ${stockQuantity}개입니다.`,
            });

            return false;
        }

        return true;
    };

    const addToCart = (quantity: number) => {
        const fetch = fetchClient();
        fetch<AddCartItemResponse>("/cart-items", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                productId,
                quantity: quantity,
            }),
        })
            .then(res => {
                if (res.data) {
                    showToast(res.data);
                }
            })
            .catch(error => {
                showErrorToast(error as CustomError);
            });
    };

    const onAddToCartInPopup = (quantity: number) => {
        if (!validateQuantity(quantity)) {
            return;
        }

        addToCart(quantity);
        setIsPopupOpen(false);
    };

    const showToast = (res: AddCartItemResponse) => {
        if (res.requiresQuantityAdjustment) {
            toast({
                message: `재고가 ${res.stockQuantity}개로 한정되어 ${res.quantity}개만 장바구니에 추가되었습니다.`,
            });
        } else {
            toast({
                message: `${title} 상품이 장바구니에 담겼습니다.`,
            });
        }
    };

    const showErrorToast = (error: CustomError) => {
        toast({
            message: "장바구니에 추가하는 데 실패했습니다.",
        });

        console.error(`장바구니 추가 실패: ${error.code} - ${error.message}`);
    };

    const handlePopupClose = () => {
        setIsPopupOpen(false);
    };

    const handleConfirmLoginAlert = () => {
        setIsLoginAlertOpen(false);
        window.location.href = "/login"; // 로그인 페이지로 이동
    };

    return (
        <>
            <AddToCartButton inStock={inStock} onClick={onButtonClick} />
            {isPopupOpen && <AddCartPopup stockQuantity={stockQuantity} onClose={handlePopupClose} onAddToCart={onAddToCartInPopup} />}
            {ToastUI}
            {isLoginAlertOpen && (
                <ConfirmDialog
                    open={isLoginAlertOpen}
                    title={"장바구니 담기"}
                    description={
                        <>
                            <span className="block mb-1">로그인 후 장바구니에 상품을 추가할 수 있습니다.</span>
                            <span>로그인 페이지로 이동하시겠습니까?</span>
                        </>
                    }
                    cancelText="취소"
                    confirmText="확인"
                    onCancel={() => setIsLoginAlertOpen(false)}
                    onConfirm={handleConfirmLoginAlert}
                />
            )}
        </>
    );
}
