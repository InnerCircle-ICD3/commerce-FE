"use client";

import CartProduct from "@/src/features/cart/components/CartProduct";
import CartSectionLayout from "@/src/features/cart/components/CartSectionLayout";
import Summary from "@/src/features/cart/components/Summary";
import ErrorComponent from "@/src/shared/components/shared/ErrorComponent";
import { useCart } from "@/src/features/cart/hooks/useCart";
import Loading from "@/src/shared/components/shared/Loading";
import { ErrorBoundary } from "@/src/shared/components/shared/ErrorBoundary";

export default function CartPageClient() {
    const { data, isLoading, isError, error } = useCart();

    const items = data?.cartItems ?? [];
    const inStockItems = items.filter(item => item.stockQuantity >= item.quantity);
    return (
        <ErrorBoundary>
            <div className="flex flex-col lg:flex-row justify-center items-center max-w-screen-xl mx-auto px-2 lg:px-8">
                <CartSectionLayout>
                    {isLoading ? (
                        <Loading />
                    ) : isError ? (
                        <ErrorComponent message={error?.message || "장바구니 불러오기 실패"} />
                    ) : (
                        <CartProduct cartItems={items} />
                    )}
                </CartSectionLayout>
                <CartSectionLayout>
                    <Summary cartItems={inStockItems} />
                </CartSectionLayout>
            </div>
        </ErrorBoundary>
    );
}
