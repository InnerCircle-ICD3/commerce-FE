import { ProductGrid } from "./ProductGrid";
import { getMainProducts } from "@/src/features/main/api/productApi";
import { getMockProducts } from "@/src/features/main/mocks/productMock";

const Products = async () => {
    // API가 변경되어 { new, best }로 구성된 객체를 반환합니다.
    const productData = await getMainProducts();

    // 목 데이터 가져오기
    const mockProducts = getMockProducts();

    return (
        <main className="flex flex-col items-start w-full py-16 px-6">
            {/* <FilterBar /> */}
            <section className="mt-10 w-full">
                {/* 목 데이터 섹션 */}
                {/* <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 ml-20">추천 상품</h2>
                    <ProductGrid products={mockProducts} showArrows={false} />
                </div> */}

                {/* 신상품 섹션 */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">신상품</h2>
                    <ProductGrid products={productData.new} />
                </div>

                {/* 베스트 상품 섹션 */}
                <div>
                    <h2 className="text-2xl font-bold mb-6">베스트 상품</h2>
                    <ProductGrid products={productData.best} />
                </div>
            </section>
        </main>
    );
};

export default Products;
