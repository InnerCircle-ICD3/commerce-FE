import type { OrderType } from "@/src/features/order/types";

interface OrderListProps {
    orders: OrderType[];
}
export default function OrderList({ orders }: OrderListProps) {
    return (
        <div>
            <h2>주문 상태</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.orderNumber}>{order.orderNumber}</li>
                ))}
            </ul>
        </div>
    );
}
