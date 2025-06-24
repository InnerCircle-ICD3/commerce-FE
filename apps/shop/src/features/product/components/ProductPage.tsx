import { Breadcrumbs } from "./Breadcrumbs";
import { ProductImage } from "./ProductImage";
import { ProductInfo } from "./ProductInfo";
import { ProductDetails } from "./ProductDetails";
import { ProductVideo } from "./ProductVideo";
import { ProductReviews } from "./ProductReviews";
import { RecommendedProducts } from "./RecommendedProducts";
import ChatButton from "@/src/features/chat/components/ChatButton";
import type { ProductType, RecommendedProductType, ReviewType } from "@/src/features/product/types";
import type { ReviewStats } from "@/src/features/product/mocks/productMock";

interface ProductPageProps {
    product: ProductType;
    reviews: ReviewType[];
    reviewStats: ReviewStats;
    recommendedProducts: RecommendedProductType[];
}

export function ProductPage({ product, reviews, reviewStats, recommendedProducts }: ProductPageProps) {
    const breadcrumbItems = [{ label: product.name, isCurrent: true }];

    // 채팅을 위한 상품 정보 구성
    const productInfoForChat = {
        id: product.id.toString(),
        title: product.name,
        price: product.price,
        image: product.thumbnail,
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <main>
                <div className="max-w-screen-xl mx-auto px-6">
                    <Breadcrumbs items={breadcrumbItems} />

                    <section className="py-10 flex flex-wrap lg:flex-nowrap gap-12 mb-16 justify-center">
                        <ProductImage thumbnail={product.thumbnail} detailImage={product.detailImage} title={product.name} />
                        <ProductInfo product={product} />
                    </section>
                </div>

                <ProductDetails product={product} />
                <ProductVideo detailImage={product.detailImage} />
                <ProductReviews productId={product.id.toString()} reviews={reviews} reviewStats={reviewStats} />
                {/* <RecommendedProducts products={recommendedProducts} /> */}
            </main>

            {/* 플로팅 채팅 버튼에 상품 정보 전달 */}
            <ChatButton isFloating={true} productInfo={productInfoForChat} />
        </div>
    );
}
