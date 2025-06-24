import { searchProducts } from "@/src/features/search/api/searchProductApi";
import SearchPage from "@/src/features/search/components/SearchPage";

export const metadata = {
    title: "상품 검색",
    description: "상품을 검색하고 결과를 확인할 수 있습니다.",
};

interface SearchPageProps {
    searchParams: Promise<{
        q?: string;
        page?: string;
    }>;
}

export default async function Search({ searchParams }: SearchPageProps) {
    const params = await searchParams;
    const searchTerm = params.q || "";
    const page = Number.parseInt(params.page || "1"); // 1-based 페이지네이션 유지

    // 서버에서 데이터 fetch
    const searchResult = await searchProducts(searchTerm, page, 20);

    return (
        <SearchPage
            initialProducts={searchResult.content || []}
            initialTotalElements={searchResult.totalElements || 0}
            initialTotalPages={searchResult.totalPages || 0}
            initialPage={page} // 1-based 페이지네이션 유지
            initialSearchTerm={searchTerm}
        />
    );
}
