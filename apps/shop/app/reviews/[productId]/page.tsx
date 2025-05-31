import ReviewList from "@/src/features/reviews/components/ReviewList";
import type { Review } from "@/src/features/reviews/components/ReviewCard";
import { getProduct, getProductReviews } from "@/src/features/product/api/productApi";
import type { ReviewType } from "@/src/features/product/types";

// ProductType의 ReviewType을 reviews의 Review 타입으로 변환하는 함수
function convertToReview(review: ReviewType): Review {
    return {
        id: review.id.toString(),
        reviewer: review.userName,
        rating: review.rating,
        date: review.date,
        content: review.content,
        profileImage: "", // 목 데이터에는 프로필 이미지가 없으므로 빈 문자열 (회색 원으로 표시됨)
        images: review.images,
    };
}

interface ReviewsPageProps {
    params: Promise<{ productId: string }>;
}

export default async function ReviewsPage({ params }: ReviewsPageProps) {
    const resolvedParams = await params;
    const productId = resolvedParams.productId;

    // 제품 정보와 리뷰 데이터 동시에 가져오기
    const [product, reviewsData] = await Promise.all([getProduct(productId), getProductReviews(productId)]);

    // ReviewType을 Review 타입으로 변환
    const reviews = reviewsData.map(convertToReview);

    return (
        <div className="min-h-screen bg-white">
            {/* 메인 콘텐츠 */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="w-[70rem] mx-auto">
                    {/* 페이지 제목 */}
                    <div className="mb-12">
                        <h1 className="text-2xl font-bold text-black">{product.title}</h1>
                    </div>

                    {/* 리뷰 목록 */}
                    <ReviewList reviews={reviews} hasMore={true} />
                </div>
            </div>
        </div>
    );
}
