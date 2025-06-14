"use client";

import { Button } from "@/src/shared/components/shared/button";
import { useToast } from "@/src/shared/hooks/useToast";
import { formatNumber } from "@/src/shared/utils/formatUtils";

interface PaymentSummaryProps {
    items: {
        productId: number;
        productName: string;
        unitPrice: number;
        quantity: number;
    }[];
    totalPrice: number;
    shippingFee: number;
}
export default function PaymentSummary({ items, totalPrice, shippingFee }: PaymentSummaryProps) {
    const { toast, ToastUI } = useToast();

    return (
        <div>
            <h4 className="text-lg font-bold mb-10">구매 금액</h4>

            <div>
                <ul>
                    {items.map(item => (
                        <li key={item.productId} className="flex justify-between items-center mb-4">
                            <span>
                                {item.productName}(x{item.quantity})
                            </span>
                            <span>₩ {formatNumber(item.unitPrice * item.quantity)}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex justify-between items-center mb-4">
                <span>배송비</span>
                <span>₩ {formatNumber(shippingFee)}</span>
            </div>
            <div className="h-[1px] bg-gray-200 my-4" />
            <div className="flex justify-between text-lg font-bold mb-10">
                <span>Total</span>
                <span>₩ {formatNumber(totalPrice)}</span>
            </div>
            <Button className="w-full" type="submit">
                결제하기
            </Button>
            {ToastUI}
        </div>
    );
}
