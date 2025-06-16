import type { ProductType } from "@/src/features/product/types";
import ProductQuantity from "./ProductQuantity";
import AddToCart from "./AddToCart";
import { formatCurrency } from "@/src/shared/utils/formatUtils";

interface ProductInfoProps {
    product: ProductType;
}

export function ProductInfo({ product }: ProductInfoProps) {
    return (
        <div className="flex flex-col gap-8 w-full max-w-xl">
            {/* 뱃지 영역 */}
            {/* <div className="flex flex-wrap gap-2">
                {product.badges.map((badge, index) => (
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
            </div> */}

            {/* 제품 제목 및 설명 */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold leading-9 tracking-tight">{product.name}</h1>
                {/* <p className="text-base text-gray-900">{product.description}</p> */}
            </div>

            {/* 가격 정보 */}
            <div className="space-y-2">
                <div className="flex items-center">
                    <span className="text-2xl font-bold text-emerald-700">{formatCurrency(product.price)}</span>
                </div>
                {product.price && <p className="text-sm text-gray-600">{product.price}</p>}
            </div>

            {/* 수량 선택 */}
            <ProductQuantity product={product} />
        </div>
    );
}
