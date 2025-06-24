import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

interface ReviewWithAdminReply {
    reviewId: number;
    nickname: string;
    rating: number;
    content: string;
    createdAt: string;
    adminReply: {
        content: string;
        createdAt: string;
        updatedAt: string;
    } | null;
}

interface ProductReviewListResponse {
    averageRating: number;
    ratingDistribution: Record<string, number>;
    reviews: ReviewWithAdminReply[];
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
}

// Mock 리뷰 데이터
const MOCK_REVIEWS: Record<number, ReviewWithAdminReply[]> = {
    1: [
        {
            reviewId: 1,
            nickname: "커피러버",
            rating: 5,
            content: "정말 맛있는 에스프레소예요! 진한 맛이 일품입니다.",
            createdAt: "2024-01-15T10:30:00Z",
            adminReply: {
                content: "좋은 리뷰 감사합니다! 앞으로도 좋은 커피로 보답하겠습니다.",
                createdAt: "2024-01-16T09:00:00Z",
                updatedAt: "2024-01-16T09:00:00Z",
            },
        },
        {
            reviewId: 2,
            nickname: "카페인중독자",
            rating: 4,
            content: "진한 맛이 좋아요. 아침에 마시기 딱 좋습니다.",
            createdAt: "2024-01-10T14:20:00Z",
            adminReply: null,
        },
    ],
    2: [
        {
            reviewId: 3,
            nickname: "홈카페장인",
            rating: 4,
            content: "아메리카노로 마시기 좋은 원두입니다. 부드러운 맛이에요.",
            createdAt: "2024-01-12T16:45:00Z",
            adminReply: null,
        },
    ],
};

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params;
        const productId = Number.parseInt(resolvedParams.id);
        const url = new URL(request.url);

        // 쿼리 파라미터 파싱
        const page = Number.parseInt(url.searchParams.get("page") || "1");
        const size = Number.parseInt(url.searchParams.get("size") || "10");

        // 해당 상품의 리뷰 데이터 가져오기
        const productReviews = MOCK_REVIEWS[productId] || [];

        // 평균 평점 계산
        const averageRating = productReviews.length > 0 ? productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length : 0;

        // 평점 분포 계산
        const ratingDistribution: Record<string, number> = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 };
        for (const review of productReviews) {
            const ratingKey = review.rating.toString();
            if (ratingKey in ratingDistribution) {
                ratingDistribution[ratingKey]++;
            }
        }

        // 페이지네이션 적용
        const startIndex = page * size;
        const endIndex = startIndex + size;
        const paginatedReviews = productReviews.slice(startIndex, endIndex);

        const response: ProductReviewListResponse = {
            averageRating: Math.round(averageRating * 10) / 10, // 소수점 1자리
            ratingDistribution,
            reviews: paginatedReviews,
            page,
            size,
            totalPages: Math.ceil(productReviews.length / size),
            totalElements: productReviews.length,
        };

        return NextResponse.json({
            data: response,
            error: null,
        });
    } catch (error) {
        console.error("Product Reviews API Error:", error);
        return NextResponse.json(
            {
                data: null,
                error: {
                    code: "INTERNAL_ERROR",
                    message: "서버 오류가 발생했습니다.",
                },
            },
            { status: 500 },
        );
    }
}
