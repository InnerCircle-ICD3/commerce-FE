"use client";

import { useRouter } from "next/navigation";
import type { CartItem } from "@/src/features/cart/types/cart";
import { formatNumber } from "@/src/shared/utils/formatUtils";
import { useCheckoutCartStore } from "@/src/features/cart/stores/checkoutCartStore";

const SLEEVE_CAPSULE_COUNT = 10;

export default function Summary({ cartItems }: { cartItems: CartItem[] }) {
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const router = useRouter();

    const handleCheckout = () => {
        useCheckoutCartStore.getState().setCartItems(cartItems);
        const cartItemIds = cartItems.map(item => item.cartItemId).join(",");
        router.push(`/order/checkout?cartItemIds=${cartItemIds}`);
    };

    return (
        <div
            className="
                p-4 border-t border-gray-200 w-full 
                lg:flex lg:flex-col lg:justify-start lg:items-start lg:relative lg:px-12 lg:py-10 lg:rounded-2xl lg:border lg:border-[#E8E8EA] lg:min-w-md"
        >
            <h2 className="text-xl font-bold text-left text-black mb-6">구매 금액</h2>
            {cartItems.map(item => (
                <div key={item.cartItemId} className="flex justify-between w-full items-center mt-2">
                    <p className="text-sm text-left text-[#47484C]">
                        {item.productName}(x{item.quantity})
                    </p>
                    <p>&#8361; {formatNumber(item.price * item.quantity)}</p>
                </div>
            ))}
            <hr className="border-t border-gray-300 my-4" />
            <div className="flex justify-between w-full items-center mt-2 font-bold">
                <p>Total</p>
                <p>&#8361; {formatNumber(totalPrice)}</p>
            </div>
            <button
                type="button"
                className="flex justify-center items-center self-stretch flex-shrink-0 mt-4 w-full h-12 relative gap-2 px-4 py-3 rounded-lg bg-[#257a57] text-sm font-semibold text-center text-white"
                onClick={handleCheckout}
            >
                {formatNumber(totalPrice)}원 구매하기
            </button>
        </div>
    );
}
