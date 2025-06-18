// API 클라이언트 기본 설정
import ky from "ky";
import type { Options } from "ky";
import { router } from "@/main";

// API 응답 타입 정의
export type ApiResponse<T> = {
    data: T | null;
    error: CustomError | null;
};

export type CustomError = Error & {
    code: string;
    message: string;
};

// API 기본 URL
const API_BASE_URL = import.meta.env.VITE_API_URL;

// HTTP 요청 기본 설정
const defaultOptions = {
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 30000, // 30초 타임아웃
    retry: 1, // 실패 시 1번 재시도
    throwHttpErrors: false, // 수동으로 에러 처리
};

// 토큰 가져오기 함수
const getTokenFromStorage = (): string | null => {
    try {
        const storage = localStorage.getItem("admin-auth-storage");
        if (!storage) return null;

        const parsed = JSON.parse(storage);
        return parsed?.state?.tokens?.accessToken || null;
    } catch (error) {
        console.error("토큰 파싱 오류:", error);
        return null;
    }
};

// 기본 API 클라이언트 인스턴스 생성 (인증 토큰 자동 추가)
export const api = ky.extend({
    prefixUrl: API_BASE_URL,
    ...defaultOptions,
    hooks: {
        beforeRequest: [
            async request => {
                const token = getTokenFromStorage();
                if (token) {
                    request.headers.set("Authorization", `Bearer ${token}`);
                }
            },
        ],
        afterResponse: [
            async (_request, _options, response) => {
                // 401 Unauthorized 처리
                if (response.status === 401) {
                    // 토큰이 만료되었거나 유효하지 않은 경우
                    localStorage.removeItem("admin-auth-storage");
                    // TanStack Router를 사용하여 SPA 방식으로 네비게이션
                    router.navigate({ to: "/login" });
                }
                return response;
            },
        ],
    },
});

// 인증이 필요한 API 클라이언트 가져오기 (이제 기본적으로 토큰이 포함됨)
export const getAuthClient = () => {
    return api;
};

/**
 * 통합된 fetcher 함수 (kyInstance.ts와 호환)
 */
export async function fetcher<T>(path: string, options?: Options): Promise<T> {
    const res = await api(path, {
        ...options,
        method: options?.method ?? "GET",
    });

    let json: ApiResponse<T>;

    try {
        json = await res.json();
    } catch {
        throw new Error("JSON 파싱에 실패했습니다.");
    }

    if (!res.ok || json.error) {
        const baseError = new Error();
        const error: CustomError = Object.assign(baseError, {
            code: json?.error?.code || "UNKNOWN_ERROR",
            message: json?.error?.message || "API 요청에 실패했습니다.",
        });

        throw error;
    }

    return json.data as T;
}

/**
 * HTTP 메서드별 래퍼 함수들
 */

// GET 요청
export async function get<T>(path: string, params?: Record<string, unknown>): Promise<T> {
    const searchParams = new URLSearchParams();
    const cleanedParams = cleanParams(params);

    for (const [key, value] of Object.entries(cleanedParams)) {
        searchParams.set(key, String(value));
    }

    return fetcher<T>(path, {
        method: "GET",
        searchParams,
    });
}

// POST 요청
export async function post<T>(path: string, data?: unknown): Promise<T> {
    return fetcher<T>(path, {
        method: "POST",
        json: data,
    });
}

// PUT 요청
export async function put<T>(path: string, data?: unknown): Promise<T> {
    return fetcher<T>(path, {
        method: "PUT",
        json: data,
    });
}

// DELETE 요청
export async function del<T>(path: string): Promise<T> {
    return fetcher<T>(path, {
        method: "DELETE",
    });
}

// 파라미터에서 빈 값 제거
function cleanParams(params?: Record<string, unknown>): Record<string, unknown> {
    if (!params) return {};

    return Object.entries(params).reduce(
        (acc, [key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
                acc[key] = value;
            }
            return acc;
        },
        {} as Record<string, unknown>,
    );
}
