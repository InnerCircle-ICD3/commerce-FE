import { formatNumber } from "@/src/shared/utils/formatUtils";
import Image from "next/image";

interface OrderCheckoutItemProps {
    name: string;
    unitPrice: number;
    quantity: number;
    thumbnail: string;
}

export default function OrderCheckoutItem({ name, unitPrice, quantity, thumbnail }: OrderCheckoutItemProps) {
    return (
        <div className="flex items-center gap-4 py-4 px-8">
            <div>
                <Image src={thumbnail} alt={name} width={64} height={64} />
            </div>
            <div>
                <p className="font-bold mb-2">{name}</p>
                <p className="text-[#257A57]">
                    <span className="font-bold">₩ {formatNumber(unitPrice * quantity)} </span>
                    <span className="text-xs">
                        ({quantity}x₩{formatNumber(unitPrice)})
                    </span>
                </p>
            </div>
        </div>
    );
}
