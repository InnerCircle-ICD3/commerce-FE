import { createRoute } from "@tanstack/react-router";
import { Route as authenticatedRoute } from "./route";
import DashboardPage from "@/features/dashboard";

export const Route = createRoute({
    getParentRoute: () => authenticatedRoute,
    path: "/",
    component: DashboardPage,
});
