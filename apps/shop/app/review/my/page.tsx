import { getUserReviews } from "@/src/features/myReviews/api/userReviewApi";
import MyReviewsPage from "@/src/features/myReviews/components/MyReviewsPage";

export default async function ReviewManagePage() {
    // 사용자의 리뷰 목록
    const reviewsData = await getUserReviews(0, 10);
    const reviews = reviewsData.content || [];

    return (
        <MyReviewsPage
            reviews={reviews}
            totalElements={reviewsData.totalElements || 0}
            totalPages={reviewsData.totalPages || 0}
            currentPage={reviewsData.page || 0}
        />
    );
} 