import { getOrderStatusLabel } from "@/src/shared/utils/getOrderStatusLabel";
import type { OrderStatus } from "../types";

interface OrderInfoProps {
    orderNumber: string;
    orderedAt: string;
    orderStatus: OrderStatus;
}

export const OrderInfo = ({ orderNumber, orderedAt, orderStatus }: OrderInfoProps) => {
    return (
        <div className="mb-10">
            <p className="text-[#2e2f33] opacity-90 text-base">{orderedAt}</p>
            <h2 className="text-xl font-bold my-2">주문 번호 {orderNumber}</h2>
            <p className="text-base font-bold text-[#257a57]">{getOrderStatusLabel(orderStatus)}</p>
        </div>
    );
};
