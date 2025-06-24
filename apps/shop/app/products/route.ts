import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { MOCK_PRODUCTS, INTENSITY_MAP, CUP_SIZE_MAP } from "./mock/products";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        // 쿼리 파라미터 파싱 (스웨거 API 기준)
        const name = searchParams.get("name") || undefined;
        const intensityId = searchParams.get("intensityId") ? Number.parseInt(searchParams.get("intensityId") || "0") : undefined;
        const cupSizeId = searchParams.get("cupSizeId") ? Number.parseInt(searchParams.get("cupSizeId") || "0") : undefined;
        const page = Number.parseInt(searchParams.get("page") || "1");
        const size = Number.parseInt(searchParams.get("size") || "20");

        // 문자열 필터 파라미터 추가
        const intensity = searchParams.get("intensity") || undefined;
        const cupSize = searchParams.get("cupSize") || undefined;

        // 목데이터 필터링
        const filteredProducts = MOCK_PRODUCTS.filter(product => {
            // 이름 검색
            if (name && !product.name.toLowerCase().includes(name.toLowerCase())) {
                return false;
            }

            // 강도 필터링 - 실제 API 데이터 구조에 맞게 수정
            if (intensityId) {
                // intensityId (1=연함, 2=중간, 3=진함)를 실제 숫자 레벨과 매핑
                const allowedIntensities = INTENSITY_MAP[intensityId];
                if (!allowedIntensities || !allowedIntensities.includes(product.intensity)) {
                    return false;
                }
            } else if (intensity) {
                // intensity가 직접 숫자 문자열로 전달된 경우
                if (product.intensity !== intensity) {
                    return false;
                }
            }

            // 컵사이즈 필터링 - 실제 API 데이터 구조에 맞게 수정
            if (cupSizeId) {
                // cupSizeId (5=Small, 7=Medium, 8=Large)를 실제 ml 단위와 매핑
                const allowedCupSizes = CUP_SIZE_MAP[cupSizeId];
                if (!allowedCupSizes || !allowedCupSizes.includes(product.cupSize)) {
                    return false;
                }
            } else if (cupSize) {
                // cupSize가 직접 ml 단위로 전달된 경우
                if (product.cupSize !== cupSize) {
                    return false;
                }
            }

            return true;
        });

        // 기본 정렬 (ID 기준 내림차순)
        filteredProducts.sort((a, b) => b.id - a.id);

        // 페이지네이션
        const totalElements = filteredProducts.length;
        const totalPages = Math.ceil(totalElements / size);
        const startIndex = page * size;
        const endIndex = startIndex + size;
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

        // 백엔드 API 응답 형식에 맞춰 반환
        const response = {
            content: paginatedProducts,
            page,
            size,
            totalPages,
            totalElements,
        };

        return NextResponse.json({
            data: response,
            error: null,
        });
    } catch (error) {
        console.error("상품 조회 오류:", error);
        return NextResponse.json(
            {
                data: null,
                error: {
                    code: "PRODUCT_SEARCH_ERROR",
                    message: "상품 조회 중 오류가 발생했습니다.",
                },
            },
            { status: 500 },
        );
    }
}
