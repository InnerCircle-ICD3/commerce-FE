import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const page = searchParams.get("page") || "0";
    const sort = searchParams.get("sort");

    if (!productId) {
        return NextResponse.json({ error: "productId is required" }, { status: 400 });
    }

    // 제품별 리뷰 목 데이터
    const productReviews: Record<
        string,
        Array<{
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
        }>
    > = {
        "1": [
            // 에스프레소
            {
                reviewId: 1,
                nickname: "에스프레소매니아",
                rating: 5,
                content: "진짜 진한 에스프레소! 크레마가 훌륭해요.",
                createdAt: "2023-12-15T00:00:00Z",
                adminReply: {
                    content: "진한 에스프레소를 좋아해주셔서 감사합니다!",
                    createdAt: "2023-12-16T00:00:00Z",
                    updatedAt: "2023-12-16T00:00:00Z",
                },
            },
            {
                reviewId: 2,
                nickname: "아침커피",
                rating: 4,
                content: "아침에 마시기 좋아요. 진한 맛이 하루를 시작하기에 완벽!",
                createdAt: "2023-12-10T00:00:00Z",
                adminReply: null,
            },
            {
                reviewId: 3,
                nickname: "커피초보",
                rating: 3,
                content: "좀 쓴 편이지만 진짜 에스프레소 맛이네요.",
                createdAt: "2023-12-05T00:00:00Z",
                adminReply: null,
            },
        ],
        "2": [
            // 아메리카노
            {
                reviewId: 4,
                nickname: "아메리카노러버",
                rating: 5,
                content: "깔끔하고 부드러운 아메리카노. 매일 마셔도 질리지 않아요!",
                createdAt: "2023-12-14T00:00:00Z",
                adminReply: null,
            },
            {
                reviewId: 5,
                nickname: "직장인김씨",
                rating: 4,
                content: "사무실에서 마시기 딱 좋아요. 적당한 쓴맛이 좋습니다.",
                createdAt: "2023-12-12T00:00:00Z",
                adminReply: {
                    content: "업무할 때 도움이 되어 기쁩니다!",
                    createdAt: "2023-12-13T00:00:00Z",
                    updatedAt: "2023-12-13T00:00:00Z",
                },
            },
            {
                reviewId: 6,
                nickname: "커피중독자",
                rating: 5,
                content: "하루에 3잔씩 마셔도 부담없어요. 최고!",
                createdAt: "2023-12-08T00:00:00Z",
                adminReply: null,
            },
        ],
    };

    // 제품별 리뷰 가져오기 (없으면 빈 배열)
    const reviews = productReviews[productId] || [];

    // 목 데이터 반환 (개발용)
    const mockData = {
        data: {
            content: reviews,
            page: Number.parseInt(page, 10),
            size: 20,
            totalElements: reviews.length,
            totalPages: reviews.length > 0 ? 1 : 0,
        },
    };

    return NextResponse.json(mockData);
}
