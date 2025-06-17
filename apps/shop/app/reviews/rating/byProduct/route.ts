import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
        return NextResponse.json({ error: "productId is required" }, { status: 400 });
    }

    // 제품별 통계 목 데이터
    const productStats: Record<
        string,
        {
            averageRating: number;
            ratingDistribution: {
                oneStarCount: number;
                twoStarsCount: number;
                threeStarsCount: number;
                fourStarsCount: number;
                fiveStarsCount: number;
            };
        }
    > = {
        "1": {
            // 에스프레소
            averageRating: 4.0,
            ratingDistribution: {
                oneStarCount: 0,
                twoStarsCount: 0,
                threeStarsCount: 1,
                fourStarsCount: 1,
                fiveStarsCount: 1,
            },
        },
        "2": {
            // 아메리카노
            averageRating: 4.7,
            ratingDistribution: {
                oneStarCount: 0,
                twoStarsCount: 0,
                threeStarsCount: 0,
                fourStarsCount: 1,
                fiveStarsCount: 2,
            },
        },
    };

    // 제품별 통계 가져오기 (없으면 빈 통계)
    const stats = productStats[productId] || {
        averageRating: 0,
        ratingDistribution: {
            oneStarCount: 0,
            twoStarsCount: 0,
            threeStarsCount: 0,
            fourStarsCount: 0,
            fiveStarsCount: 0,
        },
    };

    // 목 데이터 반환 (개발용)
    const mockData = {
        data: stats,
    };

    return NextResponse.json(mockData);
}
