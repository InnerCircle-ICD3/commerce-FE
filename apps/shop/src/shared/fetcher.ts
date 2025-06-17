type ApiResponse<T> = {
    data: T | null;
    error: CustomError | null;
};

/**
 * 백엔드 API 응답에 래핑 구조가 있는지 확인하고 필요시 변환하는 함수
 * Spring Boot API가 { data: T } 형태를 사용하지 않고 직접 데이터를 반환할 경우를 처리
 */
function normalizeApiResponse<T>(responseData: unknown): ApiResponse<T> {
    // 이미 ApiResponse 구조인 경우 (data와 error 속성이 있음)
    if (responseData && typeof responseData === "object" && responseData !== null && ("data" in responseData || "error" in responseData)) {
        return responseData as ApiResponse<T>;
    }

    // 직접 데이터를 반환하는 경우 -> ApiResponse 구조로 래핑
    return {
        data: responseData as T,
        error: null,
    };
}

export type CustomError = Error & {
    code: string;
    message: string;
};

const createFetcher = (url: string, getHeaders?: () => Promise<HeadersInit> | HeadersInit) => {
    return async function fetcher<T>(path: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
        const headers = getHeaders ? await getHeaders() : {};
        const res = await fetch(`${url}${path}`, {
            ...options,
            headers: {
                ...headers,
                "Content-Type": "application/json",
            },
        });

        let json: ApiResponse<T>;

        try {
            const rawJson = await res.json();
            // API 응답 정규화 (직접 데이터 반환 형식 처리)
            json = normalizeApiResponse<T>(rawJson);
        } catch (e) {
            console.error("JSON 파싱 오류:", e);
            throw new Error("JSON 파싱에 실패했습니다.");
        }

        if (!res.ok) {
            const error = new Error("API 요청에 실패했습니다.") as CustomError;
            error.code = "UNKNOWN_ERROR";
            throw error;
        }

        if (json.error) {
            const error = new Error(json.error.message || "API 요청에 실패했습니다.") as CustomError;
            error.code = json.error.code || "UNKNOWN_ERROR";
            throw error;
        }

        return json;
    };
};

export const fetchClient = () => {
    if (!process.env.NEXT_PUBLIC_API_URL) {
        throw new Error("NEXT_PUBLIC_API_URL이 설정되지 않았습니다.");
    }

    return createFetcher(process.env.NEXT_PUBLIC_API_URL, async (): Promise<HeadersInit> => {
        // NextAuth 세션에서 JWT 토큰 가져오기
        if (typeof window !== "undefined") {
            const { getSession } = await import("next-auth/react");
            const session = await getSession();

            if (session && "accessToken" in session && session.accessToken) {
                return {
                    Authorization: `Bearer ${session.accessToken}`,
                };
            }
        }
        return {};
    });
};

export const fetchServer = () => {
    // 1순위: 명시적 API URL (외부 스프링 API용)
    if (process.env.NEXT_PUBLIC_API_URL) {
        console.log("===== 1. 외부 스프링 API 사용 =====");
        return createFetcher(process.env.NEXT_PUBLIC_API_URL);
    }

    // 2순위: Vercel 배포 환경 (참고: Vercel이 알아서 VERCEL_URL 제공한다고 함)
    if (process.env.VERCEL_URL) {
        console.log("===== 2. Vercel 배포 환경에서 next.js 자체 API 사용 =====");
        return createFetcher(`https://${process.env.VERCEL_URL}`);
    }

    // 3순위: 클라이언트 환경에서 현재 도메인 사용
    if (typeof window !== "undefined") {
        console.log("===== 3. 클라이언트 환경에서 현재 도메인 사용 =====");
        return createFetcher(window.location.origin);
    }

    // 4순위: 로컬 개발 환경
    console.log("===== 4. 로컬 개발 환경에서 next.js 자체 API 사용 =====");
    return createFetcher("http://localhost:3000");
};
