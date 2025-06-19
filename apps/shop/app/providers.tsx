"use client";

import { SessionProvider } from "next-auth/react";
import TanstackQueryProviders from "@/src/shared/TanstackQueryProviders";
import Header from "@/src/shared/components/layout/Header";
import Footer from "@/src/shared/components/layout/Footer";
import UserIdInitializer from "@/src/shared/components/UserIdInitializer";
import { ChatNotificationProvider } from "@/src/features/chat/components/ChatNotificationProvider";
import ConditionalChatButton from "@/src/features/chat/components/ConditionalChatButton";

// 모든 Provider들을 하나로 통합한 클라이언트 컴포넌트
export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SessionProvider>
            <TanstackQueryProviders>
                <ChatNotificationProvider>
                    <UserIdInitializer />
                    <Header />
                    <main className="min-h-[calc(100vh-200px)]">{children}</main>
                    <Footer />
                    <ConditionalChatButton />
                </ChatNotificationProvider>
            </TanstackQueryProviders>
        </SessionProvider>
    );
}
