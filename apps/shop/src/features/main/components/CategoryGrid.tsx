import { CategoryItem } from "./CategoryItem";
import { CategoryNav } from "./CategoryNav";
import { getMockCategories } from "@/src/features/main/mocks/categoryMock";

export default function CategoryGrid() {
    // API 연동대신 목 데이터를 사용하여 카테고리 표시
    const categories = getMockCategories();

    return (
        <section className="py-36 px-6">
            <div className="mx-auto w-full max-w-7xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">버츄오</h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 w-full">
                    {categories.map(category => (
                        <CategoryItem key={category.id} title={category.title} description={category.description} imageUrl={category.imageUrl} />
                    ))}
                </div>
            </div>
        </section>
    );
}
