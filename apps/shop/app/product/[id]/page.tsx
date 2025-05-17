import { ProductPage } from "@/src/features/product/components/ProductPage";
import { getProduct, getProductReviews, getProductReviewStats, getRecommendedProducts } from "@/src/features/product/api/productApi";

interface ProductDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const [product, reviews, reviewStats, recommendedProducts] = await Promise.all([
        getProduct(id),
        getProductReviews(id),
        getProductReviewStats(id),
        getRecommendedProducts(id),
    ]);

    return <ProductPage product={product} reviews={reviews} reviewStats={reviewStats} recommendedProducts={recommendedProducts} />;
}
