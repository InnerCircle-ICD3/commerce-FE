import { ProductPage } from "@/src/features/product/components/ProductPage";
import { getProduct, getProductReviews, getProductReviewStats, getRecommendedProducts } from "@/src/features/product/api/productApi";

export const metadata = {
    title: "상품 상세 페이지",
    description: "선택한 상품의 상세 정보와 리뷰를 확인할 수 있습니다.",
};

interface ProductDetailPageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductDetailPage({ params, searchParams }: ProductDetailPageProps) {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    const id = resolvedParams.id;
    const sort = (resolvedSearchParams.sort as string) || "";

    const [product, review, reviewStats] = await Promise.all([
        getProduct(id),
        getProductReviews(id, 0, sort), // 정렬 파라미터 추가
        getProductReviewStats(id),
    ]);

    return <ProductPage product={product} reviews={review.content} reviewStats={reviewStats} />;
}
