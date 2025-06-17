import ProductReviewsPage from "@/src/features/productReviews/components/ProductReviewsPage";
import { getProduct, getProductReviews } from "@/src/features/product/api/productApi";

interface ReviewsPageProps {
    params: Promise<{
        id: string;
    }>;
    searchParams: Promise<{
        page?: string;
        sort?: string;
    }>;
}

export default async function ReviewsPage({ params, searchParams }: ReviewsPageProps) {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    const productId = resolvedParams.id;
    const page = Number.parseInt(String(resolvedSearchParams?.page)) || 0;
    const sort = resolvedSearchParams?.sort || undefined;

    // 제품 정보와 리뷰 데이터 동시에 가져오기
    const [product, reviewsData] = await Promise.all([getProduct(productId), getProductReviews(productId, page, sort)]);

    return (
        <ProductReviewsPage
            productTitle={product.name}
            reviews={reviewsData.content}
            totalElements={reviewsData.totalElements || 0}
            totalPages={reviewsData.totalPages || 0}
            currentPage={reviewsData.page || 0}
        />
    );
}
