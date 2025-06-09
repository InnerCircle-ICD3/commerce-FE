import ProductReviewList from "@/src/features/productReviews/components/ProductReviewList";
import Pagination from "@/src/shared/components/shared/Pagination";
import type { ReviewType } from "@/src/shared/entities/review/types";

interface ProductReviewsPageProps {
    productTitle: string;
    reviews: ReviewType[];
    totalElements: number;
    totalPages: number;
    currentPage: number;
}

export default function ProductReviewsPage({ productTitle, reviews, totalElements, totalPages, currentPage }: ProductReviewsPageProps) {
    return (
        <div className="min-h-screen bg-white">
            {/* 메인 콘텐츠 */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="w-[70rem] mx-auto">
                    {/* 페이지 제목 */}
                    <div className="mb-12">
                        <h1 className="text-2xl font-bold text-black">{productTitle}</h1>
                    </div>

                    {/* 리뷰 통계 */}
                    <div className="mt-8 mb-4 flex justify-between items-center">
                        <span className="text-sm text-gray-600">총 {totalElements}개의 리뷰</span>
                    </div>

                    {/* 리뷰 목록 */}
                    <ProductReviewList reviews={reviews} />

                    {/* 페이지네이션 */}
                    <div className="mt-8 mb-4 flex justify-center">
                        <Pagination page={currentPage} totalPages={totalPages || 0} />
                    </div>
                </div>
            </div>
        </div>
    );
}
