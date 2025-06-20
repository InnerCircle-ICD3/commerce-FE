"use client";

import { useState } from "react";
import { CancelIcon } from "@/src/shared/icons/Cancel";

type AddToCartPopupProps = {
    stockQuantity: number;
    onClose: () => void;
    onAddToCart: (quantity: number) => void;
};

export default function AddToCartPopup({ stockQuantity, onClose, onAddToCart }: AddToCartPopupProps) {
    const [selectedSleeveQuantity, setSelectedSleeveQuantity] = useState<number | "">("");
    // 재고를 슬리브 단위로 계산 (10캡슐 = 1슬리브)
    const maxSleeveQuantity = Math.floor(stockQuantity / 10);
    const sleeveQuantities = [1, 2, 3, 5, 10, 20].filter(quantity => quantity <= maxSleeveQuantity);

    const handleSleeveQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseInt(event.target.value);

        if (!Number.isNaN(value) && value >= 0) {
            setSelectedSleeveQuantity(value);
        } else {
            setSelectedSleeveQuantity("");
        }
    };

    const handleSleeveQuantitySelect = (sleeveQuantity: number) => {
        setSelectedSleeveQuantity(sleeveQuantity);
    };

    const handleAddToCart = () => {
        if (Number.isNaN(selectedSleeveQuantity) || selectedSleeveQuantity === "") return;

        const capsuleQuantity = Number(selectedSleeveQuantity);
        onAddToCart(capsuleQuantity);
    };

    // 선택된 슬리브에 해당하는 총 캡슐 수량
    const totalCapsules = selectedSleeveQuantity === "" ? 0 : Number(selectedSleeveQuantity) * 10;

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
                    {" "}
                    <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-4">
                        <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2">
                            <p className="flex-grow-0 flex-shrink-0 text-xl font-bold text-left text-black">수량 선택</p>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span className="px-2 py-1 bg-gray-100 rounded text-xs">1슬리브 = 10캡슐</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 w-full">
                            <div className="flex items-center gap-3">
                                <label htmlFor="sleeve-quantity-input" className="text-sm font-medium text-gray-700 min-w-[60px]">
                                    슬리브:
                                </label>
                                <input
                                    id="sleeve-quantity-input"
                                    type="number"
                                    min="1"
                                    max={maxSleeveQuantity}
                                    placeholder="슬리브 수량"
                                    className="flex-1 h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#257a57] focus:border-transparent"
                                    value={selectedSleeveQuantity}
                                    onChange={handleSleeveQuantityChange}
                                />
                                <span className="text-sm text-gray-600 min-w-[80px]">= {totalCapsules}캡슐</span>
                            </div>

                            {sleeveQuantities.length > 0 && (
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm text-gray-600">빠른 선택:</p>
                                    <div className="flex justify-start items-center gap-2 flex-wrap">
                                        {sleeveQuantities.map(sleeveQuantity => (
                                            <button
                                                key={sleeveQuantity}
                                                type="button"
                                                className={`flex flex-col justify-center items-center px-4 py-3 rounded-lg border transition-all ${
                                                    selectedSleeveQuantity === sleeveQuantity
                                                        ? "border-[#257a57] bg-[#257a57]/5 shadow-sm"
                                                        : "border-gray-200 hover:border-gray-300"
                                                }`}
                                                onClick={() => handleSleeveQuantitySelect(sleeveQuantity)}
                                            >
                                                <span
                                                    className={`text-lg font-semibold ${
                                                        selectedSleeveQuantity === sleeveQuantity ? "text-[#257a57]" : "text-gray-800"
                                                    }`}
                                                >
                                                    {sleeveQuantity}슬리브
                                                </span>
                                                <span className="text-xs text-gray-500 mt-1">{sleeveQuantity * 10}캡슐</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {maxSleeveQuantity === 0 && (
                                <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">
                                    재고가 부족합니다. (현재 재고: {stockQuantity}캡슐)
                                </div>
                            )}
                        </div>
                    </div>
                    <button
                        type="button"
                        className={`flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 h-12 relative gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                            selectedSleeveQuantity && selectedSleeveQuantity > 0
                                ? "bg-[#257a57] hover:bg-[#1e6b4a] text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                        onClick={handleAddToCart}
                        disabled={!selectedSleeveQuantity || selectedSleeveQuantity <= 0}
                    >
                        {selectedSleeveQuantity && selectedSleeveQuantity > 0
                            ? `장바구니 담기 (${selectedSleeveQuantity}슬리브 / ${totalCapsules}캡슐)`
                            : "수량을 선택해주세요"}
                    </button>
                </div>
            </div>
        </div>
    );
}
