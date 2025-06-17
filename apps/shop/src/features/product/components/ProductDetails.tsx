"use client";
import { useState } from "react";
import type { ProductType } from "@/src/features/product/types";
import { CupSizeCircleIcon } from "@/src/shared/components/shared/Icon";

interface ProductDetailsProps {
    product: ProductType;
}

export function ProductDetails({ product }: ProductDetailsProps) {
    // 안전하게 product 속성들 추출
    const productName = product?.name || "제품명 없음";
    const cupSizeLabel = product?.cupSize || "사이즈 불명";
    // const productQuantity = product?.quantity || 0;
    // const productPrice = product?.price || 0;
    // const intensityLabel = product?.intensity || "알 수 없음";
    // const statusLabel = product?.isSoldOut ? "품절" : "판매중";

    /*
    const [isExpanded, setIsExpanded] = useState(false);
    
    // 백엔드에서 제공하지 않는 정보들을 생성
    const aromaFeatures = ["풍부한 향", "깊은 맛", "부드러운 질감"];
    const bodyLevel = 3; // 기본값
    const bitterLevel = 2; // 기본값
    const acidLevel = 2; // 기본값
    const roastLevel = 3; // 기본값
    
    // 제품 상세정보 생성
    const detailText = `○ 제품명: ${productName}
        ○ 내용량: ${productQuantity}개입
        ○ 가격: ₩${productPrice.toLocaleString()}
        ○ 강도: ${intensityLabel}
        ○ 사이즈: ${cupSizeLabel}
        ○ 상태: ${statusLabel}
    `;
    
    const getRatingBar = (level: number, maxLevel = 5) => {
        return (
            <div className="flex items-center gap-4">
                <div className="flex w-96 h-1">
                    {Array.from({ length: maxLevel }).map((_, i) => (
                        <div
                            key={`rating-bar-${level}-${i}-${Math.random()}`}
                            className={`w-1/5 h-full ${i < level ? "bg-black" : "bg-[#f7f7f8]"}`}
                        />
                    ))}
                </div>
            </div>
        );
    };
    */

    return (
        <section className="bg-[#fafafa] py-16">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-xl p-12">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-black">{productName}</h2>
                        <p className="text-sm text-[#37383c] opacity-60">*캡슐에는 그림에 표시된 원료가 들어있지 않습니다.</p>
                    </div>

                    <div className="mt-10 grid grid-cols-2 gap-8">
                        {/* 커피 사이즈 섹션 */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">커피 사이즈</h3>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#f7f7f8] flex items-center justify-center">
                                    <CupSizeCircleIcon size="md" />
                                </div>
                                <div>
                                    <p className="text-sm">{cupSizeLabel}</p>
                                    <p className="text-sm">더블 에스프레소</p>
                                </div>
                            </div>
                        </div>

                        {/* 아로마 특징 섹션 */}
                        {/* <div>
                            <h3 className="text-xl font-bold mb-4">주요 아로마 특징</h3>
                            <div className="flex gap-6">
                                {aromaFeatures.map((feature, index) => (
                                    <p key={`feature-${feature.substring(0, 10)}-${index}`} className="text-sm whitespace-pre-line">
                                        {feature}
                                    </p>
                                ))}
                            </div>
                        </div> */}
                    </div>

                    {/* 커피 정보 섹션 */}
                    {/* <div className="mt-8">
                        <h3 className="text-xl font-bold mb-4">커피 정보</h3>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                            <div>
                                <h4 className="text-sm font-bold mb-2">바디감</h4>
                                {getRatingBar(bodyLevel)}
                            </div>
                            <div>
                                <h4 className="text-sm font-bold mb-2">쓴맛</h4>
                                {getRatingBar(bitterLevel)}
                            </div>
                            <div>
                                <h4 className="text-sm font-bold mb-2">산미</h4>
                                {getRatingBar(acidLevel)}
                            </div>
                            <div>
                                <h4 className="text-sm font-bold mb-2">로스팅</h4>
                                {getRatingBar(roastLevel)}
                            </div>
                        </div>
                    </div> */}

                    {/* 제품 상세정보 섹션 - isExpanded 상태에 따라 표시 */}
                    {/* {isExpanded && (
                        <div className="mt-10">
                            <h3 className="text-xl font-bold mb-4">제품 상세정보</h3>
                            <div className="text-sm leading-relaxed">
                                <div className="space-y-2">
                                    <pre className="font-sans whitespace-pre-line">{detailText}</pre>
                                </div>
                            </div>
                        </div>
                    )} */}

                    {/* 추가 상세정보 버튼 */}
                    {/* <div className="mt-10 flex justify-center">
                        <button
                            type="button"
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="px-8 py-3 border border-black rounded-lg font-semibold text-sm flex items-center gap-2 cursor-pointer"
                        >
                            {isExpanded ? "상세정보 닫기" : "상세정보 보기"}
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`transform transition-transform ${isExpanded ? "rotate-180" : ""}`}
                                aria-hidden="true"
                            >
                                <path d="M8 10L4 6H12L8 10Z" fill="currentColor" />
                            </svg>
                        </button>
                    </div> */}
                </div>
            </div>
        </section>
    );
}
