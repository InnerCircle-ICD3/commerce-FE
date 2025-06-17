"use client";

import Image from "next/image";
import { formatNumber } from "@/src/shared/utils/formatUtils";
import Link from "next/link";
import type { OrderDetailData } from "../types/orderDetail";
import CreateReviewModal from "@/src/features/reviewCreate/components/CreateReviewModal";
import { useState } from "react";

type OrderDetailItem = OrderDetailData["items"][number] & {
    reviewWritten?: boolean;
    orderNumber: string;
};

interface OrderProductProps {
    products: OrderDetailItem[];
    reviewable: boolean;
}

export const OrderProduct = ({ products, reviewable }: OrderProductProps) => {
    const [reviewingProduct, setReviewingProduct] = useState<OrderDetailItem | null>(null);

    return (
        <>
            <div className="mb-10">
                <h2 className="text-xl font-bold mb-4">주문 상품</h2>
                <div className="border border-gray-300 border-opacity-20 rounded-xl p-4">
                    {products.map((product, index) => (
                        <div
                            key={product.orderItemId}
                            className={`py-6 ${index < products.length - 1 ? "border-b border-gray-300 border-opacity-20" : ""}`}
                        >
                            <Link href="/product/1" className="block cursor-pointer">
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
                            </Link>
                            {reviewable && !product.reviewWritten && (
                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="px-4 py-2 text-sm bg-[#257a57] text-white rounded-lg font-medium hover:bg-[#1e6447] transition-colors"
                                        onClick={e => {
                                            e.preventDefault();
                                            setReviewingProduct(product);
                                        }}
                                    >
                                        리뷰 작성
                                    </button>
                                </div>
                            )}
                            {product.reviewWritten && (
                                <button type="button" className="px-4 py-2 text-sm bg-[#F5F5F5] text-black rounded-lg font-medium" disabled={true}>
                                    리뷰 작성 완료
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                <div className="mt-6">
                    <button
                        type="button"
                        className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                        배송 조회
                    </button>
                </div>
            </div>
            {reviewingProduct && (
                <CreateReviewModal
                    product={{
                        productId: reviewingProduct.productSnapshotId,
                        title: reviewingProduct.name,
                        imageUrl: reviewingProduct.thumbnail,
                    }}
                    orderNumber={reviewingProduct.orderNumber}
                    isOpen={!!reviewingProduct}
                    onClickClose={() => setReviewingProduct(null)}
                />
            )}
        </>
    );
};
