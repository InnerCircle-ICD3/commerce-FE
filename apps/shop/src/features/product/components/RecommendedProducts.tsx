"use client";

import type { RecommendedProductType } from "@/src/features/product/types";
import AddToCart from "@/src/features/product/components/AddToCart";
import { formatCurrency } from "@/src/shared/utils/formatUtils";

interface RecommendedProductsProps {
    products: RecommendedProductType[];
}

export function RecommendedProducts({ products }: RecommendedProductsProps) {
    return (
        <section className="py-16 bg-[#f7f7f8]">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-8">추천 제품</h2>

                <div className="grid grid-cols-3 gap-8">
                    {products.map(product => (
                        <div key={`recommended-${product.id}`} className="bg-white rounded-xl overflow-hidden h-[28rem] relative">
                            <div className="p-4 h-full">
                                <div className="h-48 mb-6 flex justify-center">
                                    <img src={product.image} alt={product.title} className="h-full object-contain" />
                                </div>

                                <div className="space-y-2 text-center">
                                    <h3 className="text-xl font-bold">{product.title}</h3>
                                    <p className="text-sm text-[#171719]">{product.description}</p>
                                </div>

                                <div className="absolute bottom-[5.625rem] left-0 right-0 flex justify-center">
                                    <div className="text-[#257a57] font-bold text-2xl">{formatCurrency(product.price)}</div>
                                </div>

                                <AddToCart productId={product.id} title={product.title} stockQuantity={product.stockQuantity} withPopup={true} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
