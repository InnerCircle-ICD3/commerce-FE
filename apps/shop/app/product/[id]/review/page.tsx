import ProductReviewsPage from "@/src/features/productReviews/components/ProductReviewsPage";
import type { ReviewType } from "@/src/shared/entities/review/types";
import { convertToReview } from "@/src/shared/entities/review/types";
import { getProduct, getProductReviews } from "@/src/features/product/api/productApi";

interface ReviewsPageProps {
    params: Promise<{
        productId: string;
        page?: string;
    }>;
}

export default async function ReviewsPage({ params }: ReviewsPageProps) {
    const resolvedParams = await params;
    const productId = resolvedParams.productId;
    const page = Number.parseInt(String(resolvedParams?.page)) || 0;

    // 제품 정보와 리뷰 데이터 동시에 가져오기
    const [product, reviewsData] = await Promise.all([getProduct(productId), getProductReviews(productId, page)]);

    // ReviewType을 Review 타입으로 변환
    const reviews = reviewsData.content.map((review: ReviewType) => convertToReview(review));

    return (
        <ProductReviewsPage
            productTitle={product.title}
            reviews={reviews}
            totalElements={reviewsData.totalElements || 0}
            totalPages={reviewsData.totalPages || 0}
            currentPage={reviewsData.page || 0}
        />
    );
}
