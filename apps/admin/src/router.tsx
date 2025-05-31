import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import RootLayout from "@/layouts/RootLayout";
import DashboardPage from "@/pages/dashboard/Dashboard";
import ProductsPage from "@/pages/products/Products";

const rootRoute = createRootRoute({
    component: RootLayout,
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: DashboardPage,
});

const productsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/products",
    component: ProductsPage,
});

const routeTree = rootRoute.addChildren([indexRoute, productsRoute]);

export const router = createRouter({
    routeTree,
    defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}
