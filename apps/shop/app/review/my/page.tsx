import MyReviewsPage from "@/src/features/myReviews/components/MyReviewsPage";
import ReviewFilter from "@/src/features/myReviews/components/ReviewFilter";
import Loading from "@/src/shared/components/shared/Loading";
import { Suspense } from "react";

export const metadata = {
    title: "리뷰 관리",
    description: "작성한 리뷰를 확인하고 관리할 수 있습니다.",
};

export default function ReviewManagePage() {
    return (
        <div className="min-h-screen bg-white">
            {/* 메인 콘텐츠 */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="w-full mx-auto">
                    {/* 페이지 제목 */}
                    <div className="mb-12">
                        <h1 className="text-2xl font-bold text-black">리뷰 관리</h1>
                        <p className="text-gray-600 mt-2">작성하신 리뷰를 확인하고 관리할 수 있습니다.</p>
                    </div>

                    {/* 리뷰 필터 */}
                    <Suspense fallback={<Loading />}>
                        <ReviewFilter />
                    </Suspense>

                    {/* 데이터 페칭 및 리뷰 목록 */}
                    <Suspense fallback={<Loading />}>
                        <MyReviewsPage />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
