import HeroBanner from "@/features/main/components/HeroBanner";
import CategoryGrid from "@/features/main/components/CategoryGrid";
import CoffeeLetter from "@/features/main/components/PromotionalContent";
import Products from "@/features/main/components/product/Products";

export default function TempMainPage() {
    return (
        <main className="flex flex-col bg-white">
            <HeroBanner />
            <div className="flex flex-col mx-auto w-full max-w-7xl">
                <CategoryGrid />
                <CoffeeLetter />
                <Products />
            </div>
        </main>
    );
}
