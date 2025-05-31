import type { OrderItemType } from "@/src/features/order/types";
import Image from "next/image";

interface OrderItemProps {
    orderItem: OrderItemType;
}

export const OrderItem = ({ orderItem }: OrderItemProps) => {
    const totalPrice = orderItem.finalPrice * orderItem.quantity;
    return (
        <div>
            <Image src={orderItem.thumbnail} alt={orderItem.name} width={100} height={100} />
            <p>{orderItem.name}</p>
            <p>
                ₩{totalPrice} ({orderItem.quantity}x₩{orderItem.price})
            </p>
        </div>
    );
};
