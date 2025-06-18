import { cva } from "class-variance-authority";
import OrderCheckoutItem from "./OrderCheckoutItem";

interface OrderCheckListProps {
    items: {
        cartItemId: number;
        productId: number;
        name: string;
        unitPrice: number;
        quantity: number;
        thumbnail: string;
    }[];
}

const itemContainer = cva("border-b border-gray-200", {
    variants: {
        isLast: {
            true: "border-b-0",
        },
    },
});
export default function OrderCheckoutList({ items }: OrderCheckListProps) {
    return (
        <div>
            {items.map((item, index) => (
                <div key={item.cartItemId} className={itemContainer({ isLast: index === items.length - 1 })}>
                    <OrderCheckoutItem key={item.name} {...item} />
                </div>
            ))}
        </div>
    );
}
