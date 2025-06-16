import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import TanstackQueryProviders from "@/src/shared/TanstackQueryProviders";
import Footer from "@/src/shared/components/layout/Footer";
import Header from "@/src/shared/components/layout/Header";
import UserIdInitializer from "@/src/shared/components/UserIdInitializer";
import { ChatNotificationProvider } from "@/src/features/chat/components/ChatNotificationProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const pretendard = localFont({
    src: [
        {
            path: "../public/fonts/Pretendard-Regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/Pretendard-SemiBold.woff2",
            weight: "600",
            style: "normal",
        },
        {
            path: "../public/fonts/Pretendard-Bold.woff2",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-pretendard",
});

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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body className={`${geistSans.variable} ${geistMono.variable} ${pretendard.variable} antialiased`}>
                <TanstackQueryProviders>
                    <ChatNotificationProvider>
                        <UserIdInitializer />
                        <Header />
                        <main>{children}</main>
                        <Footer />
                    </ChatNotificationProvider>
                </TanstackQueryProviders>
            </body>
        </html>
    );
}
