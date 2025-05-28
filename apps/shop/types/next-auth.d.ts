import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        tokens?: {
            accessToken: string;
            refreshToken: string;
            userId: string;
            email: string;
            nickname: string;
        };
    }

    interface Session {
        accessToken?: string;
        refreshToken?: string;
        userId?: string;
        backendEmail?: string;
        backendNickname?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
        refreshToken?: string;
        userId?: string;
        backendEmail?: string;
        backendNickname?: string;
    }
}
