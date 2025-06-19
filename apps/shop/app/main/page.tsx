import HeroBanner from "@/src/features/main/components/HeroBanner";
import CategoryGrid from "@/src/features/main/components/CategoryGrid";
import CoffeeLetter from "@/src/features/main/components/PromotionalContent";
import Products from "@/src/features/main/components/product/Products";

export const metadata = {
    title: "메인",
    description: "다양한 캡슐커피 제품을 만나보세요.",
};

export default function TempMainPage() {
    return (
        <main className="flex flex-col bg-white">
            <HeroBanner />
            <div className="flex flex-col mx-auto w-full max-w-7xl">
                <div className="animate-fade-in animate-slide-up">
                    <CategoryGrid />
                </div>
                <CoffeeLetter />
                <Products />
            </div>
        </main>
    );
}
