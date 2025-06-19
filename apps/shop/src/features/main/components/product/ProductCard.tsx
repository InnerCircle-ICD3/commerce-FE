'use client';

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { ProductFeature } from "./ProductFeature";
import AddToCart from "@/src/features/product/components/AddToCart";
import { formatCurrency } from "@/src/shared/utils/formatUtils";

interface ProductBadge {
    text: string;
    variant: "default" | "yellow" | "purple" | "red" | "green";
}

interface ProductFeatureType {
    icon?: string;
    value: string;
    label?: string;
    strength?: number;
}

export interface ProductCardProps {
    productId: number;
    badges: ProductBadge[];
    image: string;
    features: ProductFeatureType[];
    name: string;
    description: string;
    price: number;
    unit: string;
    stockQuantity: number;
}

// 기본 대체 이미지 URL
const fallbackImageUrl = "https://cdn.builder.io/api/v1/image/assets/TEMP/4c7bfa7b14aca451340208bfc07390f055298c80";

export const ProductCard = ({ productId, badges, image, features, name, description, price, unit, stockQuantity }: ProductCardProps) => {
    const [imgSrc, setImgSrc] = useState(image);
    const router = useRouter();

    // 이미지 로드 오류 처리
    const handleImageError = () => {
        setImgSrc(fallbackImageUrl);
    };

    // 상품 카드 클릭 핸들러
    const handleCardClick = () => {
        router.push(`/product/${productId}`);
    };
    return (
        <article
            className="w-full h-full pt-4 pb-6 px-4 bg-white rounded-xl border border-gray-200/10 flex flex-col justify-start items-start gap-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={handleCardClick}
        >
            <div className="self-stretch flex-1 flex flex-col justify-between items-center gap-3">
                <div className="self-stretch flex flex-col justify-start items-start gap-3">
                    {/* 이미지 영역 */}
                    <div className="self-stretch flex items-center justify-center overflow-hidden aspect-[136/117] relative">
                        <img
                            src={imgSrc}
                            alt={name}
                            className="w-full h-full object-cover"
                            onError={handleImageError}
                        />
                        {/* 뱃지 영역 */}
                        {badges && badges.length > 0 && (
                            <div className="absolute top-2 left-2 flex flex-col gap-1">
                                {badges.slice(0, 2).map((badge, index) => (
                                    <span
                                        key={`badge-${index}`}
                                        className={`px-2 py-1 rounded text-xs font-medium ${badge.variant === "yellow"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : badge.variant === "red"
                                                ? "bg-red-100 text-red-800"
                                                : badge.variant === "green"
                                                    ? "bg-green-100 text-green-800"
                                                    : badge.variant === "purple"
                                                        ? "bg-purple-100 text-purple-800"
                                                        : "bg-gray-100 text-gray-800"
                                            }`}
                                    >
                                        {badge.text}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 특징 영역 */}
                    <div className="self-stretch flex justify-center items-center gap-4">
                        {(features || []).map((feature, index) => {
                            const featureKey = `feature-${index}-${feature.value.replace(/\s+/g, "-")}`;
                            return (
                                <Fragment key={featureKey}>
                                    {index > 0 && <div className="w-0 h-5 origin-top-left border-l border-gray-200" />}
                                    <ProductFeature {...feature} />
                                </Fragment>
                            );
                        })}
                    </div>

                    {/* 제품 정보 영역 */}
                    <div className="self-stretch flex flex-col justify-start items-start gap-4">
                        <div className="self-stretch flex flex-col justify-start items-start gap-2">
                            <h3 className="self-stretch text-center text-black text-base font-bold leading-normal">{name}</h3>
                            {description && (
                                <p className="self-stretch h-10 text-center text-neutral-900 text-sm font-normal leading-relaxed overflow-hidden">
                                    {description}
                                </p>
                            )}
                        </div>
                        <div className="self-stretch flex flex-col justify-start items-center gap-0.5">
                            <div className="self-stretch flex justify-center items-start gap-1">
                                <span className="text-center text-emerald-700 text-2xl font-bold leading-relaxed">{formatCurrency(price)}</span>
                            </div>
                            {unit && <p className="text-center text-neutral-700 text-sm">{unit}</p>}
                        </div>
                    </div>
                </div>

                {/* 버튼 영역 */}
                <div className="self-stretch h-12 px-1 py-0.5" onClick={(e) => e.stopPropagation()}>
                    <AddToCart productId={productId} title={name} stockQuantity={stockQuantity} withPopup={true} />
                </div>
            </div>
        </article>
    );
};
