"use client";

import type { RecommendedProductType } from "@/src/features/product/types";
import { useToast } from "@/src/shared/hooks/useToast";

interface RecommendedProductsProps {
    products: RecommendedProductType[];
}

export function RecommendedProducts({ products }: RecommendedProductsProps) {
    const { toast, ToastUI } = useToast();

    // 장바구니 추가
    const handleAddToCart = (productId: number, productName: string) => {
        toast({
            message: `${productName} 상품이 장바구니에 추가되었습니다.`,
        });
        console.log(`장바구니 추가 (${productId})`); // 여기에 장바구니 추가 로직 구현
    };

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
                                    <div className="text-[#257a57] font-bold text-2xl">₩ {product.price.toLocaleString()}</div>
                                </div>

                                <div className="absolute bottom-4 left-4 right-4">
                                    <button
                                        type="button"
                                        className={`w-full py-4 rounded-lg font-semibold ${
                                            product.inStock
                                                ? "bg-[#257a57] text-white hover:bg-[#1e6647] active:scale-[0.98] transition-all cursor-pointer"
                                                : "bg-[#f4f4f5] text-[#37383c] opacity-30 cursor-not-allowed"
                                        }`}
                                        disabled={!product.inStock}
                                        onClick={() => product.inStock && handleAddToCart(product.id, product.title)}
                                    >
                                        {product.inStock ? "장바구니 담기" : "일시품절"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 장바구니 토스트 컴포넌트 */}
            {ToastUI}
        </section>
    );
}
