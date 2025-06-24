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
                    // Safari CORS 및 쿠키 호환성을 위한 헤더
                    {
                        key: "Cross-Origin-Opener-Policy",
                        value: "same-origin-allow-popups",
                    },
                    {
                        key: "Cross-Origin-Embedder-Policy",
                        value: "unsafe-none",
                    },
                    // Safari에서 third-party 쿠키 허용을 위한 헤더
                    {
                        key: "Permissions-Policy",
                        value: "storage-access=*, unload=()",
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
