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
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom'],
                    'router-vendor': ['@tanstack/react-router'],
                    'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', 'lucide-react'],
                    'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
                    'table-vendor': ['@tanstack/react-table'],
                },
            },
        },
        target: 'esnext',
        minify: 'esbuild',
        cssCodeSplit: true,
        sourcemap: false,
        chunkSizeWarningLimit: 1000,
    },
    optimizeDeps: {
        include: [
            'react',
            'react-dom',
            '@tanstack/react-router',
            '@tanstack/react-query',
            'zustand',
            'clsx',
            'tailwind-merge',
        ],
        esbuildOptions: {
            target: 'esnext',
        },
    },
    server: {
        host: true,
        strictPort: false,
        hmr: {
            overlay: false,
        },
        fs: {
            strict: false,
        },
    },
    esbuild: {
        target: 'esnext',
        logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
});
