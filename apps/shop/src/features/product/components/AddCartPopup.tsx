"use client";

import { useState } from "react";
import { CancelIcon } from "@/src/shared/icons/Cancel";

type AddToCartPopupProps = {
    stockQuantity: number;
    onClose: () => void;
    onAddToCart: (quantity: number) => void;
};

export default function AddToCartPopup({ stockQuantity, onClose, onAddToCart }: AddToCartPopupProps) {
    const [selectedQuantity, setSelectedQuantity] = useState<number | "">("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const quantities = [10, 20, 30, 40, 50, 60].filter(quantity => quantity <= stockQuantity);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseInt(event.target.value);

        if (!Number.isNaN(value)) {
            setSelectedQuantity(value);
            setErrorMessage(null);
        } else {
            setSelectedQuantity("");
            setErrorMessage(null);
        }
    };

    const handleQuantitySelect = (quantity: number) => {
        setSelectedQuantity(quantity);
        setErrorMessage(null);
    };

    const handleAddToCart = () => {
        if (Number.isNaN(selectedQuantity)) return;

        const quantity = selectedQuantity === "" ? 0 : Number(selectedQuantity);
        onAddToCart(quantity);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div className="flex flex-col justify-start items-end w-[600px] overflow-hidden rounded-2xl">
                <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative px-6 py-4 bg-white border-t-0 border-r-0 border-b border-l-0 border-[#E8E8EA]">
                    <p className="flex-grow-0 flex-shrink-0 text-2xl font-bold text-center text-black">장바구니 담기</p>
                    <button type="button" onClick={onClose}>
                        <CancelIcon className="w-8 h-8 relative" />
                    </button>
                </div>
                <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-10 px-6 pt-6 pb-10 bg-white">
                    <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-4">
                        <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2">
                            <p className="flex-grow-0 flex-shrink-0 text-xl font-bold text-left text-black">수량</p>
                        </div>
                        <input
                            type="number"
                            placeholder="수량을 입력해 주세요."
                            className="flex justify-start items-center flex-grow-0 flex-shrink-0 w-[552px] h-10 relative gap-2.5 px-1 pb-2 border-t-0 border-r-0 border-b border-l-0 border-black"
                            value={selectedQuantity}
                            onChange={handleQuantityChange}
                        />
                        {errorMessage && <p className="text-xs text-red-500 mt-1">{errorMessage}</p>}
                        <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-2">
                            {quantities.map(quantity => (
                                <button
                                    key={quantity}
                                    type="button"
                                    className={`flex justify-center items-center flex-grow-0 flex-shrink-0 w-[60px] h-8 relative gap-2 px-4 py-3 rounded border ${
                                        selectedQuantity === quantity ? "border-black" : "border-[#E8E8EA]"
                                    }`}
                                    onClick={() => handleQuantitySelect(quantity)}
                                >
                                    <p
                                        className={`flex-grow-0 flex-shrink-0 text-sm text-center ${
                                            selectedQuantity === quantity ? "font-semibold text-black" : "text-[#47484C]"
                                        }`}
                                    >
                                        {quantity}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                    <button
                        type="button"
                        className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 h-12 relative gap-2 px-4 py-3 rounded-lg bg-[#257a57] text-white text-sm font-semibold"
                        onClick={handleAddToCart}
                    >
                        장바구니 담기
                    </button>
                </div>
            </div>
        </div>
    );
}
