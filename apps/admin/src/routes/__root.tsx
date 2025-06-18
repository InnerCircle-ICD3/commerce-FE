import { Outlet, createRootRoute } from "@tanstack/react-router";
import { ToastContainer } from "@/shared/components/ui/toast";

export const Route = createRootRoute({
    component: () => (
        <>
            <Outlet />
            <ToastContainer />
        </>
    ),
});
