// 주문 내역 목록 관련 UI 타입들
export interface OrderHistoryItem {
    id: string;
    status: "준비중" | "배송중" | "배송완료" | "반품완료";
    statusDate?: string;
    productName: string;
    price: number;
    imageSrc: string;
}
