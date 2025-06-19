"use client";

import { useRef, useState } from "react";
import AddToCart from "./AddToCart";
import type { ProductType } from "../types";

export default function ProductQuantity({ product }: { product: ProductType }) {
    const [quantity, setQuantity] = useState(0);
    const [selectedButton, setSelectedButton] = useState<number | null>(null);
    const [isInputActive, setIsInputActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // 안전하게 product 속성들 추출
    const productQuantity = product?.quantity || 0;
    const productId = product?.id || 0;
    const productName = product?.name || "제품명 없음";

    // 숫자 버튼 클릭시
    const handleButtonSelect = (buttonValue: number) => {
        setQuantity(buttonValue);
        setSelectedButton(buttonValue);
        if (inputRef.current) {
            inputRef.current.blur();
        }
    };

    const handleCustomQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 입력 허용 (정규식으로 검사)

        if (value === "") {
            setQuantity(0);
        } else {
            let numValue = Number.parseInt(value, 10);

            if (numValue > 999) {
                numValue = 999;
            }

            setQuantity(numValue);
        }
        setSelectedButton(null); // 직접 입력 시 선택된 버튼 초기화
    };

    // 입력창 클릭시 선택된 버튼 해제 및 입력창 활성화
    const handleInputFocus = () => {
        setSelectedButton(null);
        setIsInputActive(true);
    };

    return (
        <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-4">
            <h3 className="text-base font-bold mb-3">수량</h3>

            {/* 직접 입력 필드 */}
            <div className="flex flex-col gap-2">
                <label htmlFor="quantity-input" className="text-sm text-gray-600">
                    직접 입력
                </label>
                <div className="relative">
                    <input
                        id="quantity-input"
                        ref={inputRef}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={quantity === 0 ? "" : quantity}
                        onChange={handleCustomQuantityChange}
                        onFocus={handleInputFocus}
                        onBlur={() => setIsInputActive(false)}
                        className={`w-24 h-10 px-3 text-sm border-2 rounded-lg focus:outline-none transition-colors ${
                            isInputActive ? "border-[#257a57]" : "border-gray-300 bg-white hover:border-gray-400"
                        }`}
                        placeholder="0"
                        maxLength={3}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">개</span>
                </div>
            </div>

            {/* 빠른 선택 버튼들 */}
            <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-600">빠른 선택</span>
                <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 5, 10, 20]
                        .filter(qty => qty <= productQuantity)
                        .map(qty => (
                            <button
                                key={`qty-${qty}`}
                                type="button"
                                onClick={() => handleButtonSelect(qty)}
                                className={`h-10 px-4 border rounded-md min-w-[3.75rem] text-center text-sm cursor-pointer transition-colors ${
                                    selectedButton === qty
                                        ? "border-[#257a57] bg-[#257a57] text-white font-semibold"
                                        : "border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                                }`}
                            >
                                {qty}
                            </button>
                        ))}
                </div>
            </div>

            {/* 장바구니 버튼 */}
            <AddToCart productId={productId} title={productName} stockQuantity={productQuantity} quantity={quantity} />
        </div>
    );
}
