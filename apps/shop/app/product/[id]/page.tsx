import { ProductPage } from "@/src/features/product/components/ProductPage";
import { getProduct, getProductReviews, getProductReviewStats, getRecommendedProducts } from "@/src/features/product/api/productApi";

interface ProductDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const [product, review, reviewStats] = await Promise.all([
        getProduct(id),
        getProductReviews(id, 0), // 페이지는 0으로 고정
        getProductReviewStats(id),
    ]);

    return <ProductPage product={product} reviews={review.content} reviewStats={reviewStats} />;
}
