"use client";

import { Button } from "@/src/shared/components/shared/button";
import { useToast } from "@/src/shared/hooks/useToast";
import type { CartItem } from "@/app/cart/page";

interface PaymentSummaryProps {
    cartItems: CartItem[];
}
export default function PaymentSummary({ cartItems }: PaymentSummaryProps) {
    const { toast, ToastUI } = useToast();

    return (
        <div>
            <h4 className="text-lg font-bold mb-10">구매 금액</h4>

            <div>
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id} className="flex justify-between mb-2 ">
                            <span>{item.title}</span>
                            <span>₩ {item.price}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="h-[1px] bg-gray-200 my-4" />
            <div className="flex justify-between text-lg font-bold mb-10">
                <span>Total</span>
                <span>₩ 35,000</span>
            </div>
            <Button className="w-full" type="submit">
                결제하기
            </Button>
            {ToastUI}
        </div>
    );
}
