"use client";

import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import TanstackQueryProviders from "@/src/shared/TanstackQueryProviders";
import Footer from "@/src/shared/components/layout/Footer";
import Header from "@/src/shared/components/layout/Header";
import UserIdInitializer from "@/src/shared/components/UserIdInitializer";
import { ChatNotificationProvider } from "@/src/features/chat/components/ChatNotificationProvider";
import ChatButton from "@/src/features/chat/components/ChatButton";

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
                        <ChatButton isFloating={true} />
                    </ChatNotificationProvider>
                </TanstackQueryProviders>
            </body>
        </html>
    );
}
