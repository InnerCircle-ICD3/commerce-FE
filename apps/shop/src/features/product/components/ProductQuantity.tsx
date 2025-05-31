"use client";

import { useRef, useState } from "react";
import AddToCart from "./AddToCart";
import type { ProductType } from "../types";

export default function ProductQuantity({ product }: { product: ProductType }) {
    const [quantity, setQuantity] = useState(0);
    const [selectedButton, setSelectedButton] = useState<number | null>(null);
    const [isInputActive, setIsInputActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

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
            <div className="flex flex-wrap gap-2">
                <div
                    className={`flex items-center h-10 w-[4.5rem] border rounded-md box-border ${isInputActive ? "border-black" : "border-gray-300"}`}
                >
                    <input
                        ref={inputRef}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={quantity === 0 ? "" : quantity}
                        onChange={handleCustomQuantityChange}
                        onFocus={handleInputFocus}
                        className="w-full h-full px-2 text-sm focus:outline-none text-center appearance-none bg-transparent m-0 border-none leading-normal"
                        placeholder="입력"
                        maxLength={3}
                    />
                </div>

                {/* 수량 버튼들 */}
                {[10, 20, 30, 40, 50, 60]
                    .filter(qty => qty <= product.stockQuantity)
                    .map(qty => (
                        <button
                            key={`qty-${qty}`}
                            type="button"
                            onClick={() => handleButtonSelect(qty)}
                            className={`h-10 px-4 border rounded-md min-w-[3.75rem] text-center text-sm cursor-pointer ${
                                selectedButton === qty ? "border-black font-semibold" : "border-gray-300 opacity-90"
                            }`}
                        >
                            {qty}
                        </button>
                    ))}
            </div>

            {/* 추가 설명 */}
            {(product.limitDescription || product.additionalDescription) && (
                <div className="text-xs text-gray-400 space-y-1">
                    {product.limitDescription && <p>{product.limitDescription}</p>}
                    {product.additionalDescription && <p>{product.additionalDescription}</p>}
                </div>
            )}

            {/* 장바구니 버튼 */}
            <AddToCart productId={product.id} title={product.title} stockQuantity={product.stockQuantity} quantity={quantity} />
        </div>
    );
}
