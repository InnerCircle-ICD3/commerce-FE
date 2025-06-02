import ProductReviewList from "@/src/features/productReviews/components/ProductReviewList";
import type { Review } from "@/src/shared/entities/review/types";

interface ProductReviewsPageProps {
    productTitle: string;
    reviews: Review[];
    hasMore: boolean;
}

export default function ProductReviewsPage({ productTitle, reviews, hasMore }: ProductReviewsPageProps) {
    return (
        <div className="min-h-screen bg-white">
            {/* 메인 콘텐츠 */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="w-[70rem] mx-auto">
                    {/* 페이지 제목 */}
                    <div className="mb-12">
                        <h1 className="text-2xl font-bold text-black">{productTitle}</h1>
                    </div>

                    {/* 리뷰 목록 */}
                    <ProductReviewList reviews={reviews} hasMore={hasMore} />
                </div>
            </div>
        </div>
    );
} 