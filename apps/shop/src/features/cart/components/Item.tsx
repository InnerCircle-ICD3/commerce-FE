"use client";

import { CancelIcon } from "@/src/shared/icons/Cancel";
import QuantityChange from "./QuantityChange";
import { formatNumber } from "@/src/shared/utils/formatUtils";

interface ItemProps {
    productId: number;
    name: string;
    price: number;
    quantity: number;
    stockQuantity: number;
    image: string;
    selected: boolean;
    onSelectChange: () => void;
    onDelete: () => void;
}

const LOW_STOCK_QUANTITY = 10;
const QUANTITY_STEP = 10;

export default function Item({ productId, name, price, quantity, stockQuantity, image, selected, onSelectChange, onDelete }: ItemProps) {
    const totalPrice = (quantity / QUANTITY_STEP) * price;

    const getQuantityMessage = () => {
        if (stockQuantity === 0) {
            return "상품이 품절되었습니다.";
        }

        return `품절 임박! 남은 수량: ${stockQuantity}`;
    };

    return (
        <div className="md:min-w-md">
            <div className="flex justify-between items-center">
                <input type="checkbox" className="w-4.5 h-4.5" checked={selected} onChange={onSelectChange} />
                <button type="button" onClick={onDelete}>
                    <CancelIcon className="w-6 h-6" />
                </button>
            </div>
            <div className="flex items-center gap-4 p-4 border-b border-gray-200">
                <img src={image} alt={name} className="w-16 h-16 object-cover" />
                <div className="flex flex-col flex-grow">
                    <div className="flex flex-col justify-start items-start flex-grow gap-2">
                        <h2 className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-black">{name}</h2>
                        <div className="flex gap-1 items-center">
                            <p className="flex-grow-0 flex-shrink-0 text-sm font-bold text-center text-[#257a57]">
                                &#8361; {formatNumber(totalPrice)}
                            </p>
                            <p className="flex-grow-0 flex-shrink-0 text-xs text-center text-[#257a57]">
                                ({quantity} x &#8361;{formatNumber(price)})
                            </p>
                        </div>
                        <QuantityChange productId={productId} initQuantity={quantity} stockQuantity={stockQuantity} />
                    </div>
                    <div>{stockQuantity < LOW_STOCK_QUANTITY && <p className="text-red-500 text-xs font-bold mt-2">{getQuantityMessage()}</p>}</div>
                </div>
            </div>
        </div>
    );
}
