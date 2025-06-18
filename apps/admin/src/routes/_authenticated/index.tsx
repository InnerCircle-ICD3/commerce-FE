import DashboardPage from "@/pages/dashboard/Dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/")({
    component: DashboardPage,
});
