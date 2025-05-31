import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import TanstackQueryProviders from "@/shared/TanstackQueryProviders";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "@/router";

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
