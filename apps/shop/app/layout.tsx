import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "@/app/globals.css";
import Providers from "@/app/providers";
import type React from "react";
import { Suspense } from "react";
import { metadata } from "@/app/metadata";
import Loading from "@/src/shared/components/shared/Loading";

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

export { metadata };

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body className={`${geistSans.variable} ${geistMono.variable} ${pretendard.variable} antialiased`}>
                <Providers>
                    <Suspense fallback={<Loading />}>{children}</Suspense>
                </Providers>
            </body>
        </html>
    );
}
