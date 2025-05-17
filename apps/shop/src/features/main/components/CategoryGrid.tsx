import { CategoryItem } from "./CategoryItem";
import { CategoryNav } from "./CategoryNav";
import { getCategories } from "@/src/features/main/api/categoryApi";

export default async function CategoryGrid() {
    const categories = await getCategories();

    return (
        <section className="py-8 px-6">
            <div className="mx-auto w-full max-w-7xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">버츄오</h2>
                    <CategoryNav />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
                    {categories.map(category => (
                        <CategoryItem key={category.id} title={category.title} description={category.description} imageUrl={category.imageUrl} />
                    ))}
                </div>
            </div>
        </section>
    );
}
