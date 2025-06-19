import { fetchData } from "@/src/shared/utils/api";
import { getMockProducts } from "@/src/features/main/mocks/productMock";
import type { ProductType, ApiProduct, RegularProduct } from "@/src/features/main/types/product";

/**
 * 메인 페이지 제품 응답 타입 (API)
 */
export interface MainProductApiResponse {
    new: ApiProduct[];
    best: ApiProduct[];
}

/**
 * 메인 페이지 제품 응답 타입 (UI)
 */
export interface MainProductResponse {
    new: ProductType[];
    best: ProductType[];
}

/**
 * 컵 사이즈에 맞는 아이콘을 반환하는 함수
 */
function getCupSizeIcon(cupSize: string): string {
    const size = cupSize.toLowerCase();

    if (size.includes('80ml') || size.includes('40ml')) {
        return "https://cdn.builder.io/api/v1/image/assets/TEMP/7ec1fe57569b1f4a69a9d7b05a066a87d07c92fb"; // 작은 컵
    } else if (size.includes('150ml') || size.includes('120ml')) {
        return "https://cdn.builder.io/api/v1/image/assets/TEMP/04dabf840c4cf0b87799c6e096929c365ec2909c"; // 중간 컵
    } else if (size.includes('230ml') || size.includes('200ml')) {
        return "https://cdn.builder.io/api/v1/image/assets/TEMP/ec3b1979ebd42585e8a43f121a5a2792cd9dc58c"; // 큰 컵
    } else if (size.includes('355ml') || size.includes('300ml')) {
        return "https://cdn.builder.io/api/v1/image/assets/TEMP/ec3b1979ebd42585e8a43f121a5a2792cd9dc58c"; // 아주 큰 컵
    }

    // 기본값
    return "https://cdn.builder.io/api/v1/image/assets/TEMP/04dabf840c4cf0b87799c6e096929c365ec2909c";
}

/**
 * 강도 숫자를 로스팅 레벨로 변환하는 함수
 */
function getRoastingLevel(intensity: number): string {
    if (intensity <= 3) {
        return "Light";
    } else if (intensity <= 6) {
        return "Medium";
    } else if (intensity <= 9) {
        return "Dark";
    } else {
        return "Extra Dark";
    }
}

/**
 * API 제품 데이터를 UI 컴포넌트용 데이터로 변환
 */
function convertApiProductToRegularProduct(apiProduct: ApiProduct): RegularProduct {
    const badges = [];

    // 로스팅 레벨에 따른 뱃지 추가
    const intensity = parseInt(apiProduct.intensity);
    const roastingLevel = getRoastingLevel(intensity);

    if (roastingLevel === "Dark" || roastingLevel === "Extra Dark") {
        badges.push({ text: "진한 로스팅", variant: "red" as const });
    } else if (roastingLevel === "Light") {
        badges.push({ text: "라이트 로스팅", variant: "green" as const });
    }

    // 재고 부족 시 뱃지 추가
    if (apiProduct.quantity <= 10) {
        badges.push({ text: "품절 임박", variant: "yellow" as const });
    }

    return {
        productId: apiProduct.id,
        type: "product",
        badges,
        image: apiProduct.thumbnail,
        features: [
            {
                value: getRoastingLevel(intensity),
                label: "로스팅",
            },
            {
                icon: getCupSizeIcon(apiProduct.cupSize),
                value: apiProduct.cupSize,
            },
        ],
        name: apiProduct.name,
        description: "", // API에서 설명이 없으므로 빈 문자열
        price: apiProduct.price,
        unit: "", // 이름에 포함되어 있어서 별도 표시 안함
        outOfStock: apiProduct.isSoldOut,
        stockQuantity: apiProduct.quantity,
    };
}

/**
 * 제품 목록을 가져오는 서버 컴포넌트용 API 함수
 */
export async function getProducts(): Promise<ProductType[]> {
    return fetchData({
        endpoint: "/products", // 제품 목록 조회 API 주소
        defaultValue: [], // 실패 시 반환할 기본값
        mockDataFn: getMockProducts, // 개발기 환경에서 API 실패 시 호출할 목 데이터 생성 함수 (발표 끝나고 백엔드 서버가 폭파되면 이걸 대신 띄워야 함)
    });
}

/**
 * 제품 목록을 가져오는 서버 컴포넌트용 API 함수
 * 참고: 백엔드 API가 수정되어 { new: ApiProduct[], best: ApiProduct[] } 형태로 응답을 반환합니다.
 */
export async function getMainProducts(): Promise<MainProductResponse> {
    const apiResponse = await fetchData<MainProductApiResponse>({
        endpoint: "/products/main", // 메인 페이지 제품 목록 조회를 위한 올바른 API 주소
        defaultValue: { new: [], best: [] }, // 실패 시 반환할 기본값
        mockDataFn: () => ({
            new: [],
            best: [],
        }), // 목 데이터 변환
    });

    // API 응답을 UI 컴포넌트용 데이터로 변환
    return {
        new: apiResponse.new.map(convertApiProductToRegularProduct),
        best: apiResponse.best.map(convertApiProductToRegularProduct),
    };
}
