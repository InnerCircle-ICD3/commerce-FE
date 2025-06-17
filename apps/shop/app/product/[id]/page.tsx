import { notFound } from "next/navigation";
import { ProductPage } from "@/src/features/product/components/ProductPage";
import { getProduct, getProductReviews, getProductReviewStats } from "@/src/features/product/api/productApi";

export const metadata = {
    title: "상품 상세 페이지",
    description: "선택한 상품의 상세 정보와 리뷰를 확인할 수 있습니다.",
};

interface ProductDetailPageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductDetailPage({ params, searchParams }: ProductDetailPageProps) {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    const id = resolvedParams.id;
    const sort = (resolvedSearchParams.sort as string) || "";

    try {
        const [product, review, reviewStats] = await Promise.all([
            getProduct(id),
            getProductReviews(id, 0, sort), // page를 0으로 전달
            getProductReviewStats(id),
        ]);

        return <ProductPage product={product} reviews={review.content} reviewStats={reviewStats} recommendedProducts={[]} />;
    } catch (error: unknown) {
        // 상품을 찾을 수 없는 경우 404 페이지 표시
        if (error instanceof Error && "code" in error && (error as { code: string }).code === "PRODUCT_NOT_FOUND") {
            notFound();
        }

        // 다른 에러는 그대로 던짐
        throw error;
    }
}
