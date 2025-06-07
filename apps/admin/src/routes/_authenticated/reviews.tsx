import ReviewPage from "@/pages/reviews/Reviews";
import { Route as authenticatedRoute } from "./route";
import { createRoute } from "@tanstack/react-router";

export const Route = createRoute({
    getParentRoute: () => authenticatedRoute,
    path: "/reviews",
    component: ReviewPage,
});
