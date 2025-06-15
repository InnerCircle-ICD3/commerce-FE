import { ProductFilter } from "@/src/features/product/components/ProductFilter";

export const metadata = {
    title: "상품 검색",
    description: "커피 제품을 검색하고 필터링할 수 있습니다.",
};

interface ProductPageProps {
    searchParams: Promise<{
        name: string;
        intensityId: string;
        cupSizeId: string;
        page: string;
    }>;
}

export default async function ProductPage({ searchParams }: ProductPageProps) {
    // TODO: 커피 강도, 컵 사이즈 데이터 가져오기 => revalidate 고려?
    const intensities = [
        { id: 1, label: "light" },
        { id: 2, label: "medium" },
        { id: 3, label: "dark" },
    ];

    const cupSizes = [
        { id: 1, label: "small" },
        { id: 2, label: "medium" },
        { id: 3, label: "large" },
    ];

    const { name, intensityId, cupSizeId, page } = await searchParams;

    return (
        <div>
            <ProductFilter intensities={intensities} cupSizes={cupSizes} />
            {/* TODO: 검색 결과 표시  */}
        </div>
    );
}
