import Image from "next/image";
import { formatNumber } from "@/src/shared/utils/formatUtils";
import Link from "next/link";
import type { OrderDetailData } from "../types/orderDetail";

interface OrderProductProps {
    products: OrderDetailData["items"];
    reviewable: boolean;
}

export const OrderProduct = ({ products, reviewable }: OrderProductProps) => {
    return (
        <div className="mb-10">
            <h2 className="text-xl font-bold mb-4">주문 상품</h2>
            <div className="border border-gray-300 border-opacity-20 rounded-xl p-4">
                {products.map((product, index) => (
                    <Link key={product.orderItemId} href="/product/1" className="block cursor-pointer">
                        <div className={`py-6 ${index < products.length - 1 ? "border-b border-gray-300 border-opacity-20" : ""}`}>
                            <div className="flex gap-4">
                                <div className="w-20 h-20 relative rounded overflow-hidden">
                                    <Image
                                        src={product.thumbnail}
                                        alt={product.name}
                                        fill
                                        sizes="5rem"
                                        style={{ objectFit: "cover" }}
                                        className="rounded"
                                        {...(index === 0 ? { priority: true } : {})}
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold mb-2">{product.name}</h3>
                                    <div className="flex items-center">
                                        <span className="text-[#257a57] font-bold">₩</span>
                                        <span className="text-[#257a57] font-bold ml-1">{formatNumber(product.unitPrice)}</span>
                                        <span className="text-[#257a57] ml-2 text-xs">
                                            ({product.quantity} x ₩{formatNumber(product.unitPrice)})
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="flex gap-4 mt-6">
                <button type="button" className="flex-1 py-3 border border-black rounded-lg font-semibold">
                    배송 조회
                </button>
                {reviewable && (
                    <button type="button" className="flex-1 py-3 bg-[#257a57] text-white rounded-lg font-semibold">
                        리뷰 작성
                    </button>
                )}
            </div>
        </div>
    );
};
