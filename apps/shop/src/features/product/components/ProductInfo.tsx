import type { ProductType } from "@/src/features/product/types";
import ProductQuantity from "./ProductQuantity";
import AddToCart from "./AddToCart";
import { formatCurrency } from "@/src/shared/utils/formatUtils";

interface ProductInfoProps {
    product: ProductType;
}

export function ProductInfo({ product }: ProductInfoProps) {
    // 백엔드 데이터로부터 UI에 필요한 정보 생성 (안전하게 처리)
    const intensityLabel = product?.intensity || "알 수 없음";
    const statusLabel = product?.isSoldOut ? "품절" : "판매중";
    const cupSizeLabel = product?.cupSize || "사이즈 불명";
    const isSoldOut = product?.isSoldOut || false;
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
    const pricePerUnit = `1 개당 ₩${productPrice.toLocaleString()}`;

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
            <div className="space-y-2">
                <div className="flex items-center">
                    <span className="text-2xl font-bold text-emerald-700">{formatCurrency(productPrice)}</span>
                </div>
                <p className="text-sm text-gray-600">{pricePerUnit}</p>
            </div>

            {/* 수량 선택 */}
            <ProductQuantity product={product} />
        </div>
    );
}
