import ReviewPage from "@/pages/reviews/Reviews";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/reviews")({
    component: ReviewPage,
});
