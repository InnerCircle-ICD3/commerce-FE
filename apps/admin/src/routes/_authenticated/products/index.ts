import Products from "@/features/product/Products";
import { createFileRoute } from "@tanstack/react-router";

interface ProductSearchParams {
    page?: number;
    size?: number;
}

export const Route = createFileRoute("/_authenticated/products/")({
    component: Products,
    validateSearch: (search: Record<string, unknown>): ProductSearchParams => {
        return {
            page: search.page ? Number(search.page) : 1,
            size: search.size ? Number(search.size) : 10,
        };
    },
});
