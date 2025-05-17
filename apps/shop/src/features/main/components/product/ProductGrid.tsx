import { BannerCard } from "./BannerCard";
import { ProductCard, type ProductCardProps } from "./ProductCard";

type BannerItem = {
    type: "banner";
    id?: string;
    image: string;
    title: string;
    description: string;
};

type ProductItem = ProductCardProps & {
    type: "product";
};

type ProductGridItem = BannerItem | ProductItem;

interface ProductGridProps {
    products: ProductGridItem[];
}

/**
 * ProductItem 타입인지 확인하는 타입 가드
 */
const isProductItem = (item: ProductGridItem): item is ProductItem => {
    return item.type === "product";
};

/**
 * BannerItem 타입인지 확인하는 타입 가드
 */
const isBannerItem = (item: ProductGridItem): item is BannerItem => {
    return item.type === "banner";
};

/**
 * 안정적인 고유 키 생성 함수
 */
const getUniqueKey = (product: ProductGridItem, index: number): string => {
    // 유효한 ID가 있는 경우 사용
    if ("id" in product && typeof product.id === "string" && product.id) {
        return product.id;
    }

    // 타입에 따라 적절한 식별자 생성
    if (isBannerItem(product)) {
        return `banner-${index}-${product.title.substring(0, 10).replace(/\s+/g, "-")}`;
    }

    if (isProductItem(product)) {
        return `product-${index}-${product.name.substring(0, 10).replace(/\s+/g, "-")}`;
    }

    // 기본 키 생성
    return `item-${index}`;
};

export const ProductGrid = ({ products }: ProductGridProps) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {products.map((product, index) => {
                const uniqueKey = getUniqueKey(product, index);

                if (isBannerItem(product)) {
                    return <BannerCard key={uniqueKey} image={product.image} title={product.title} description={product.description} />;
                }

                return <ProductCard key={uniqueKey} {...product} />;
            })}
        </div>
    );
};
