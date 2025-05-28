type ApiResponse<T> = {
    data: T | null;
    error: CustomError | null;
};

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
            json = await res.json();
        } catch {
            throw new Error("JSON 파싱에 실패했습니다.");
        }

        if (!res.ok || json.error) {
            const error = new Error(json.error?.message || "API 요청에 실패했습니다.") as CustomError;
            error.code = json.error?.code || "UNKNOWN_ERROR";

            throw error;
        }

        return json;
    };
};

export const fetchClient = () => {
    if (!process.env.NEXT_PUBLIC_API_URL) {
        throw new Error("NEXT_PUBLIC_API_URL이 설정되지 않았습니다.");
    }

    return createFetcher(process.env.NEXT_PUBLIC_API_URL, async () => {
        // NextAuth 세션에서 JWT 토큰 가져오기
        if (typeof window !== "undefined") {
            const { getSession } = await import("next-auth/react");
            const session = await getSession();

            if (session?.accessToken) {
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
