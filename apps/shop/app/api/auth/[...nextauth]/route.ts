import NextAuth from "next-auth";
import NaverProvider from "next-auth/providers/naver";
import type { NextAuthOptions } from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { processLoginCallback } from "@/lib/authService";

// 네이버 프로필 타입 정의
interface NaverProfile {
    email?: string;
    name?: string;
    nickname?: string;
    profile_image?: string;
    gender?: string;
    birthday?: string;
    age?: string;
}

const handler = NextAuth({
    providers: [
        NaverProvider({
            clientId: process.env.NAVER_CLIENT_ID ?? "",
            clientSecret: process.env.NAVER_CLIENT_SECRET ?? "",
        }),
    ],
    // 디버그 모드 설정 (개발 환경에서만 활성화)
    debug: process.env.NODE_ENV === "development",

    // Safari 호환성을 위한 쿠키 설정
    cookies: {
        sessionToken: {
            name: "__Secure-next-auth.session-token",
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production", // HTTPS에서만 secure 쿠키 사용
            },
        },
        callbackUrl: {
            name: "__Secure-next-auth.callback-url",
            options: {
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
        csrfToken: {
            name: "__Host-next-auth.csrf-token",
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
    },

    // JWT 설정
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },

    // 에러 처리 페이지 경로 설정 (커스텀 에러 페이지를 만들 경우)
    pages: {
        error: "/auth/error", // 에러 발생 시 이동할 커스텀 에러 페이지
        // signIn: "/login",  // 필요한 경우 커스텀 로그인 페이지 설정
    },

    // 로깅 및 에러 콜백 - 콘솔에서 에러를 확인할 수 있게 함
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log("로그인 시도:", { user, account, profile });

            // 네이버 로그인인 경우에만 서버 콜백 전송
            if (account?.provider === "naver" && account?.access_token && profile) {
                // auth_info 구성
                const authInfo = {
                    provider: "naver",
                    token: account.access_token,
                };

                // user_profile 구성 (네이버 프로필 정보 매핑)
                const naverProfile = profile as NaverProfile;
                const userProfile = {
                    email: naverProfile.email || "",
                    name: naverProfile.name || "",
                    nickname: naverProfile.nickname || "",
                    profile_image: naverProfile.profile_image || "",
                    gender: naverProfile.gender || "",
                    birthday: naverProfile.birthday || "",
                    age: naverProfile.age || "",
                };

                // 서버로 콜백 데이터 전송하고 토큰 받기
                const tokens = await processLoginCallback(authInfo, userProfile);

                // 토큰을 user 객체에 임시 저장 (JWT 콜백에서 사용하기 위해)
                if (tokens && user) {
                    user.tokens = tokens;
                }
            }

            return true;
        },

        async jwt({ token, user, account }) {
            // 로그인 시 백엔드에서 받은 토큰을 JWT 토큰에 저장
            if (user?.tokens) {
                token.accessToken = user.tokens.accessToken;
                token.refreshToken = user.tokens.refreshToken;
                token.userId = user.tokens.userId;
                token.backendEmail = user.tokens.email;
                token.backendNickname = user.tokens.nickname;
            }

            return token;
        },

        async session({ session, token }) {
            // 세션에 백엔드 토큰 정보 포함
            if (token.accessToken) {
                session.accessToken = token.accessToken;
                session.refreshToken = token.refreshToken;
                session.userId = token.userId;
                session.backendEmail = token.backendEmail;
                session.backendNickname = token.backendNickname;
            }

            return session;
        },
    },

    // 콘솔에서 디버깅 로그를 확인하세요
    logger: {
        error(code, metadata) {
            console.error("NextAuth 에러 코드:", code, metadata);
        },
        warn(code) {
            console.warn("NextAuth 경고:", code);
        },
        debug(code, metadata) {
            console.log("NextAuth 디버그:", code, metadata);
        },
    },
});

export { handler as GET, handler as POST };
