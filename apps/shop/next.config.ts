import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ["images.unsplash.com", "cdn.builder.io", "801base.s3.ap-northeast-2.amazonaws.com"],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },

    // Safari 호환성을 위한 헤더 설정
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "X-Frame-Options",
                        value: "SAMEORIGIN",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    // Safari에서 쿠키 설정을 위한 헤더
                    {
                        key: "Set-Cookie",
                        value: "SameSite=Lax; Secure",
                    },
                ],
            },
        ];
    },

    // 메인 페이지로 리다이렉트
    // redirects: async () => {
    //     return [
    //         {
    //             source: "/",
    //             destination: "/main",
    //             permanent: true,
    //         },
    //     ];
    // },
};

export default nextConfig;
