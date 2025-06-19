"use client";

import { CancelIcon } from "@/src/shared/icons/Cancel";
import QuantityChange from "./QuantityChange";
import { formatNumber } from "@/src/shared/utils/formatUtils";

interface ItemProps {
    cartItemId: number;
    name: string;
    price: number;
    quantity: number;
    stockQuantity: number;
    image: string;
    selected: boolean;
    onSelectChange: () => void;
    onDelete: () => void;
}

const SLEEVE_CAPSULE_COUNT = 10; // 1슬리브 = 10캡슐

export default function Item({ cartItemId, name, price, quantity, stockQuantity, image, selected, onSelectChange, onDelete }: ItemProps) {
    const totalPrice = quantity * price;

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
                        <h2 className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-black">{name}</h2>                        <div className="flex flex-col gap-1">
                            {/* 총 가격 (메인 표시) */}
                            <div className="flex items-baseline gap-2">
                                <span className="text-lg font-bold text-[#257a57]">
                                    ₩{formatNumber(totalPrice)}
                                </span>
                                
                            </div>
                            
                            {/* 단가 정보 */}
                            <div className="flex items-center gap-1 text-xs text-[#257A57]">
                                <span>₩{formatNumber(price)} x {quantity}슬리브</span>
                                <span className="text-xs text-gray-500">
                                    ({quantity * SLEEVE_CAPSULE_COUNT}캡슐, 캡슐당 ₩{formatNumber(price / SLEEVE_CAPSULE_COUNT)})
                                </span>
                            </div>
                        </div>
                        <QuantityChange cartItemId={cartItemId} initQuantity={quantity} stockQuantity={stockQuantity} />
                    </div>
                    <div>{stockQuantity < 1 && <p className="text-red-500 text-xs font-bold mt-2">{getQuantityMessage()}</p>}</div>
                </div>
            </div>
        </div>
    );
}
