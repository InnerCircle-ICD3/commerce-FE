interface AuthInfo {
    provider: string;
    token: string;
}

interface UserProfile {
    email: string;
    name: string;
    nickname: string;
    profile_image: string;
    gender: string;
    birthday: string;
    age: string;
}

export interface Tokens {
    accessToken: string;
    refreshToken: string;
    userId: string;
    email: string;
    nickname: string;
}

export async function processLoginCallback(authInfo: AuthInfo, userProfile: UserProfile): Promise<Tokens | null> {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!backendUrl) {
        console.error("백엔드 URL이 설정되지 않았습니다. (NEXT_PUBLIC_API_URL)");
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
            return null;
        }

        const result = await response.json();
        console.log("백엔드 서버 응답 성공:", result);

        return result.data?.tokens || null;
    } catch (error) {
        console.error("백엔드 서버 연결 중 오류:", error);
        return null;
    }
}
