import { createFileRoute } from "@tanstack/react-router";
import ProductEditForm from "@/features/product/ProductEditForm";

export const Route = createFileRoute("/_authenticated/products/$productId/edit")({
    component: ProductEditForm,
}); 