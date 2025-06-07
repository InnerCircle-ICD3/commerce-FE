import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        TanStackRouterVite({
            target: "react",
            autoCodeSplitting: true,
        }),
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            "@commerce-fe/utils": path.resolve(__dirname, "../../packages/utils"),
            "@commerce-fe/stores": path.resolve(__dirname, "../../packages/stores"),
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
