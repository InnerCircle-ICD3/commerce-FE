// 상품 타입 정의
export interface Product {
    id: string; // 백엔드에서는 Long 타입이지만 프론트에서는 string으로 처리
    name: string; // 상품명
    price: number; // 가격
    quantity: number; // 재고 수량
    thumbnail: string; // 썸네일 이미지 URL
    detailImage: string; // 상세 이미지 URL
    intensity?: string; // 원두 강도
    cupSize?: string; // 컵 사이즈
    status: "active" | "inactive"; // 상품 상태 (프론트엔드 상태 관리용)
    updatedAt: string; // 최근 수정일
}
