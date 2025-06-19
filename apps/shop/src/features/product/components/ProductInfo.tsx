import type { ProductType } from "@/src/features/product/types";
import ProductQuantity from "./ProductQuantity";
import { formatCurrency } from "@/src/shared/utils/formatUtils";

interface ProductInfoProps {
    product: ProductType;
}

export function ProductInfo({ product }: ProductInfoProps) {
    // 백엔드 데이터로부터 UI에 필요한 정보 생성 (안전하게 처리)
    const intensityLabel = product?.intensity || "알 수 없음";
    const statusLabel = product?.quantity > 0 ? "판매중" : "품절";
    const cupSizeLabel = product?.cupSize || "사이즈 불명";
    const isSoldOut = product?.quantity === 0;
    const productPrice = product?.price || 0;

    const badges = [
        {
            text: intensityLabel,
            bgColor: "rgba(55, 56, 60, 0.16)",
        },
        {
            text: statusLabel,
            bgColor: isSoldOut ? "#ff0000" : "#00aa00",
            textColor: "#ffffff",
        },
    ];

    const description = `${intensityLabel} 강도의 ${cupSizeLabel} 사이즈 커피`;

    return (
        <div className="flex flex-col gap-8 w-full max-w-xl">
            {/* 뱃지 영역 */}
            <div className="flex flex-wrap gap-2">
                {badges.map((badge, index) => (
                    <div
                        key={`${badge.text}-${index}`}
                        className="px-2.5 py-1.5 rounded-md text-xs"
                        style={{
                            backgroundColor: badge.bgColor,
                            color: badge.textColor || (badge.bgColor === "#ffc000" ? "#171719" : "#fff"),
                        }}
                    >
                        {badge.text}
                    </div>
                ))}
            </div>

            {/* 제품 제목 및 설명 */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold leading-9 tracking-tight">{product?.name || "제품명 없음"}</h1>
                <p className="text-base text-gray-900">{description}</p>
            </div>
            
            {/* 가격 정보 */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-2xl border border-emerald-100 shadow-sm">
                <div className="space-y-3">
                    {/* 메인 가격 */}
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-emerald-700 tracking-tight">
                            {formatCurrency(productPrice)}
                        </span>
                        <span className="text-lg text-emerald-600 font-medium">
                            / 슬리브
                        </span>
                    </div>
                    
                    {/* 상세 정보 */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <span className="text-sm text-gray-700 font-medium">
                                1슬리브 = 10캡슐
                            </span>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-600">캡슐당</p>
                            <p className="text-lg font-semibold text-emerald-600">
                                {formatCurrency(Math.round(productPrice / 10))}
                            </p>
                        </div>
                    </div>
                    
                    {/* 절약 정보 (선택사항) */}
                    <div className="bg-white/70 p-3 rounded-lg border border-emerald-200">
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-emerald-700 font-medium">
                                편리한 캡슐 포장으로 언제든 신선한 커피
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 수량 선택 */}
            <ProductQuantity product={product} />
        </div>
    );
}
