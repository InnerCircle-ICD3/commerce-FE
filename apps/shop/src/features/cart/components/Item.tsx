"use client";

import QuantityChange from "./QuantityChange";

interface ItemProps {
    title: string;
    price: number;
    quantity: number;
    stockQuantity: number;
    image: string;
}

const LOW_STOCK_QUANTITY = 10;

export default function Item({ title, price, quantity, stockQuantity, image }: ItemProps) {
    // todo: 재고가 10개 이하일 때 표시하는 부분의 디자인은 아직 안나옴
    const getQuantityMessage = () => {
        if (quantity <= 0) {
            return "품절";
        }

        return `품절 임박! 남은 수량: ${stockQuantity}`;
    };

    return (
        <div className="md:min-w-md">
            <div className="flex justify-between items-center">
                <input type="checkbox" className="w-4.5 h-4.5" />
                <button type="button">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex-grow-0 flex-shrink-0 w-6 h-6 relative"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <path
                            d="M6.39945 18.6537L5.3457 17.5999L10.9457 11.9999L5.3457 6.39994L6.39945 5.34619L11.9995 10.9462L17.5995 5.34619L18.6532 6.39994L13.0532 11.9999L18.6532 17.5999L17.5995 18.6537L11.9995 13.0537L6.39945 18.6537Z"
                            fill="#37383C"
                            fillOpacity="0.61"
                        />
                    </svg>
                </button>
            </div>
            <div className="flex items-center gap-4 p-4 border-b border-gray-200">
                <img src={image} alt={title} className="w-16 h-16 object-cover" />
                <div className="flex flex-col flex-grow">
                    <div className="flex flex-col justify-start items-start flex-grow gap-2">
                        <h2 className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-black">{title}</h2>
                        <div className="flex gap-1 items-center">
                            <p className="flex-grow-0 flex-shrink-0 text-sm font-bold text-center text-[#257a57]">&#8361; {price.toLocaleString()}</p>
                            <p className="flex-grow-0 flex-shrink-0 text-xs text-center text-[#257a57]">
                                ({quantity} x &#8361;{price.toLocaleString()})
                            </p>
                        </div>
                        <QuantityChange initQuantity={quantity} />
                    </div>
                    <div>{stockQuantity < LOW_STOCK_QUANTITY && <p className="text-red-500 text-xs font-bold">{getQuantityMessage()}</p>}</div>
                </div>
            </div>
        </div>
    );
}
