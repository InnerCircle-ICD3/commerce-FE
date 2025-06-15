import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "801 COFFEE",
        template: "%s | 801 COFFEE",
    },
    description: "프리미엄 캡슐 커피 전문점",
    openGraph: {
        title: "801 COFFEE",
        description: "프리미엄 캡슐 커피 전문점",
        images: [
            {
                url: "https://commerce-fe-shop-delta.vercel.app/images/og-image.png",
                width: 1200,
                height: 630,
                alt: "801 COFFEE OG Image",
            },
        ],
    },
};
