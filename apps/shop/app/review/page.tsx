import { getUserReviews } from "@/src/features/userReview/api/userReviewApi";
import UserReviewList from "@/src/features/userReview/components/UserReviewList";

export default async function ReviewManagePage() {
    // 사용자의 리뷰 목록
    const reviewsData = await getUserReviews(0, 10);
    const reviews = reviewsData.content || [];

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
                                <div className="text-2xl font-bold text-black mt-1">{reviewsData.totalElements || 0}개</div>
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
                    <UserReviewList reviews={reviews} hasMore={(reviewsData.page || 0) < (reviewsData.totalPages || 0) - 1} />
                </div>
            </div>
        </div>
    );
}
