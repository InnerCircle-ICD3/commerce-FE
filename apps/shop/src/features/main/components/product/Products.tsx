import { ProductGrid } from "./ProductGrid";
import { getProducts } from "@/src/features/main/api/productApi";

const Products = async () => {
    const products = await getProducts();

    return (
        <main className="flex flex-col items-start w-full py-16 px-6">
            {/* <FilterBar /> */}
            <section className="mt-10 w-full">
                <ProductGrid products={products} />
            </section>
        </main>
    );
};

export default Products;
