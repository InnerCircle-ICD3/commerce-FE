import { useCallback } from "react";
import type { AuthInfo, UserProfile, Tokens } from "../types/auth";

const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
const NAVER_AUTH_URL = "https://nid.naver.com/oauth2.0/authorize";
const REDIRECT_URI = `${window.location.origin}/auth/callback`;

export const useNaverAuth = () => {
    // 네이버 로그인 URL로 리다이렉트
    const loginWithNaver = useCallback(() => {
        if (!NAVER_CLIENT_ID) {
            console.error("VITE_NAVER_CLIENT_ID가 설정되지 않았습니다.");
            alert("네이버 로그인 설정이 필요합니다. 환경 변수를 확인해주세요.");
            return;
        }

        const state = Math.random().toString(36).substring(2, 15);
        localStorage.setItem("naver_state", state);

        const params = new URLSearchParams({
            response_type: "code",
            client_id: NAVER_CLIENT_ID,
            redirect_uri: REDIRECT_URI,
            state: state,
        });

        console.log("네이버 로그인 리다이렉트:", `${NAVER_AUTH_URL}?${params.toString()}`);
        window.location.href = `${NAVER_AUTH_URL}?${params.toString()}`;
    }, []);

    // 네이버 액세스 토큰과 프로필 정보 동시 획득
    const getNaverTokenAndProfile = useCallback(async (code: string, state: string) => {
        const storedState = localStorage.getItem("naver_state");
        if (state !== storedState) {
            throw new Error("Invalid state parameter");
        }

        // Supabase Edge Function을 사용해서 네이버 토큰과 프로필을 받아옴
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const response = await fetch(`${supabaseUrl}/functions/v1/naver-oauth-proxy`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({
                code,
                state,
                redirect_uri: REDIRECT_URI,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("네이버 토큰 요청 실패:", errorText);

            // 상세한 에러 정보 표시
            let errorMessage = "네이버 로그인 실패";
            try {
                const errorData = JSON.parse(errorText);
                if (errorData.error === "Server configuration error") {
                    errorMessage = "서버 환경 변수가 설정되지 않았습니다. Supabase에서 NAVER_CLIENT_ID와 NAVER_CLIENT_SECRET을 설정해주세요.";
                } else if (errorData.details) {
                    errorMessage = `네이버 API 오류: ${errorData.details}`;
                }
            } catch (e) {
                // JSON 파싱 실패 시 기본 메시지 사용
            }

            alert(errorMessage);
            throw new Error("Failed to get access token and profile");
        }

        const data = await response.json();
        return {
            access_token: data.access_token,
            profile: data.profile,
        };
    }, []);

    // 백엔드로 로그인 정보 전송하여 JWT 토큰 받기
    const processLoginCallback = useCallback(async (authInfo: AuthInfo, userProfile: UserProfile): Promise<Tokens | null> => {
        const backendUrl = import.meta.env.VITE_API_URL;
        if (!backendUrl) {
            console.error("백엔드 URL이 설정되지 않았습니다. (VITE_API_URL)");
            alert("백엔드 서버 URL이 설정되지 않았습니다. 환경 변수를 확인해주세요.");
            return null;
        }

        console.log("백엔드 서버로 로그인 정보 전송:", { authInfo, userProfile });

        try {
            const response = await fetch(`${backendUrl}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    auth_info: authInfo,
                    user_profile: userProfile,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("백엔드 서버 응답 오류:", response.status, response.statusText, errorText);

                if (response.status === 404) {
                    alert("백엔드 서버의 로그인 API를 찾을 수 없습니다. 백엔드 서버가 실행 중인지 확인해주세요.");
                } else if (response.status === 500) {
                    alert("백엔드 서버 내부 오류가 발생했습니다.");
                } else {
                    alert(`로그인 처리 중 오류가 발생했습니다. (${response.status})`);
                }

                return null;
            }

            const result = await response.json();
            console.log("백엔드 서버 응답 성공:", result);

            return result.data || null;
        } catch (error) {
            console.error("백엔드 서버 연결 중 오류:", error);
            alert("백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.");
            return null;
        }
    }, []);

    // 전체 네이버 로그인 프로세스
    const handleNaverCallback = useCallback(
        async (code: string, state: string): Promise<Tokens | null> => {
            try {
                // 1. 네이버 액세스 토큰과 프로필 정보 동시 획득
                const { access_token, profile } = await getNaverTokenAndProfile(code, state);

                // 2. 백엔드로 로그인 정보 전송
                const authInfo: AuthInfo = {
                    provider: "naver",
                    token: access_token,
                };

                const tokens = await processLoginCallback(authInfo, profile);

                // 3. state 정리
                localStorage.removeItem("naver_state");

                return tokens;
            } catch (error) {
                console.error("네이버 로그인 처리 중 오류:", error);
                localStorage.removeItem("naver_state");
                return null;
            }
        },
        [getNaverTokenAndProfile, processLoginCallback],
    );

    return {
        loginWithNaver,
        handleNaverCallback,
    };
};
