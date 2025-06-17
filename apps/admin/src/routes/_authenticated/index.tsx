import { createFileRoute } from "@tanstack/react-router";
import DashboardPage from "@/pages/dashboard/Dashboard";

export const Route = createFileRoute("/_authenticated/")({
    component: DashboardPage,
});
