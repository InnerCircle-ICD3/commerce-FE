import { type NextRequest, NextResponse } from "next/server";

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

interface LoginCallbackRequest {
    auth_info: AuthInfo;
    user_profile: UserProfile;
}

export async function POST(request: NextRequest) {
    try {
        const body: LoginCallbackRequest = await request.json();

        console.log("네이버 로그인 콜백 수신:", body);

        // 백엔드 서버로 데이터 전송
        const backendUrl = process.env.NEXT_PUBLIC_API_URL;

        console.log("백엔드 URL:", backendUrl);

        let backendResult = null;
        try {
            const backendResponse = await fetch(`${backendUrl}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            if (!backendResponse.ok) {
                console.error("백엔드 서버 응답 오류:", backendResponse.status, backendResponse.statusText);
                const errorText = await backendResponse.text();
                console.error("백엔드 에러 응답:", errorText);

                return NextResponse.json(
                    {
                        success: false,
                        message: "백엔드 서버 인증 실패",
                        error: "Backend authentication failed",
                    },
                    { status: 401 },
                );
            }

            backendResult = await backendResponse.json();
            console.log("백엔드 서버 응답 성공:", backendResult);
        } catch (backendError) {
            console.error("백엔드 서버 연결 오류:", backendError);

            return NextResponse.json(
                {
                    success: false,
                    message: "백엔드 서버 연결 실패",
                    error: "Backend server connection failed",
                },
                { status: 503 },
            );
        }

        // 성공 응답 반환 (백엔드 토큰 정보 포함)
        return NextResponse.json(
            {
                success: true,
                message: "로그인 콜백 처리 완료",
                data: {
                    provider: body.auth_info.provider,
                    user: body.user_profile,
                    tokens: backendResult?.data
                        ? {
                              accessToken: backendResult.data.accessToken,
                              refreshToken: backendResult.data.refreshToken,
                              userId: backendResult.data.userId,
                              email: backendResult.data.email,
                              nickname: backendResult.data.nickname,
                          }
                        : null,
                },
            },
            { status: 200 },
        );
    } catch (error) {
        console.error("로그인 콜백 처리 중 오류:", error);

        return NextResponse.json(
            {
                success: false,
                message: "로그인 콜백 처리 실패",
                error: error instanceof Error ? error.message : "알 수 없는 오류",
            },
            { status: 500 },
        );
    }
}
