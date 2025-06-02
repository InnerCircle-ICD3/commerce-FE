import MyReviewList from "@/src/features/myReviews/components/MyReviewList";

interface MyReviewsPageProps {
    reviews: any[];
    totalElements: number;
    totalPages: number;
    currentPage: number;
}

export default function MyReviewsPage({ reviews, totalElements, totalPages, currentPage }: MyReviewsPageProps) {
    return (
        <div className="min-h-screen bg-white">
            {/* 메인 콘텐츠 */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="w-[70rem] mx-auto">
                    {/* 페이지 제목 */}
                    <div className="mb-12">
                        <h1 className="text-2xl font-bold text-black">리뷰 관리</h1>
                        <p className="text-gray-600 mt-2">작성하신 리뷰를 확인하고 관리할 수 있습니다.</p>
                    </div>

                    {/* 리뷰 통계 */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-600">총 작성 리뷰</div>
                                <div className="text-2xl font-bold text-black mt-1">{totalElements}개</div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-gray-600">이번 달 작성</div>
                                <div className="text-lg font-semibold text-blue-600 mt-1">
                                    {/* TODO: 이번 달 작성한 리뷰 수 계산 */}
                                    0개
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 리뷰 목록 */}
                    <MyReviewList reviews={reviews} hasMore={currentPage < totalPages - 1} />
                </div>
            </div>
        </div>
    );
} 