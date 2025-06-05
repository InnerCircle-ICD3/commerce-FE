import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import TanstackQueryProviders from "@/shared/TanstackQueryProviders";
import { RouterProvider, createRouter } from "@tanstack/react-router";
// 파일 시스템 기반 라우트 가져오기
import { routeTree } from "./routeTree.gen";

// 라우터 인스턴스 생성
const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
});

// 타입 안전성을 위한 라우터 인스턴스 등록
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

const rootElement = document.getElementById("root");
if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <TanstackQueryProviders>
                <RouterProvider router={router} />
            </TanstackQueryProviders>
        </StrictMode>,
    );
}
