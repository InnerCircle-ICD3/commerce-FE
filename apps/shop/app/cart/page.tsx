import CartPageClient from "@/src/features/cart/components/CartPageClient";

export const metadata = {
    title: "장바구니",
    description: "선택한 상품들을 확인하고 결제할 수 있습니다.",
};

export default function Page() {
    return (
        <>
            <div className="flex flex-col lg:flex-row justify-start items-start max-w-screen-xl mx-auto px-8 lg:px-14 my-8">
                <h1 className="text-xl font-bold text-left">장바구니</h1>
            </div>
            <CartPageClient />
        </>
    );
}
