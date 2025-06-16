import { formatCurrency, formatNumber } from "@/src/shared/utils/formatUtils";
import type { OrderDetailData } from "../types/orderDetail";

interface PaymentInfoProps {
    items: OrderDetailData["items"];
    discount: number;
    total: number;
}

export const PaymentInfo = ({ items, discount, total }: PaymentInfoProps) => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">결제 정보</h2>
            <div className="flex flex-col gap-2">
                {items.map(item => (
                    <div key={item.orderItemId} className="flex justify-between">
                        <p className="text-[#2e2f33] opacity-90">{item.name}</p>
                        <p>{formatCurrency(item.itemSubTotal)}</p>
                    </div>
                ))}
                <div className="flex justify-between">
                    <p>할인 금액</p>
                    <p className="text-[#257a57]">{`-${formatNumber(discount)}원`}</p>
                </div>
            </div>
            <hr className="my-4 border-t border-gray-400 opacity-20" />
            <div className="flex justify-between">
                <h3 className="text-xl font-bold">Total</h3>
                <p className="text-xl font-bold">{formatCurrency(total)}</p>
            </div>
        </div>
    );
};
