// 페이지네이션된 응답 구조
export interface PageResponse<T> {
    content: T[];
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
}

// 페이지네이션 요청 파라미터
export interface PaginationParams {
    page?: number;
    size?: number;
    keyword?: string;
    [key: string]: unknown; // 추가 필터링을 위한 동적 프로퍼티
}
