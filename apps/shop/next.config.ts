import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ["images.unsplash.com", "cdn.builder.io"],
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
