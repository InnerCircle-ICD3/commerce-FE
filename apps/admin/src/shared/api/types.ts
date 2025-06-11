// API 응답 기본 구조
export interface ApiResponse<T> {
  data: T;
  error: string | null;
}

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
  [key: string]: any; // 추가 필터링을 위한 동적 프로퍼티
}
