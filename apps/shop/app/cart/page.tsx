import CartSectionLayout from "@/src/features/cart/components/CartSectionLayout";
import CartProductLayout from "@/src/features/cart/components/CartProductLayout";
import Item from "@/src/features/cart/components/Item";
import Summary from "@/src/features/cart/components/Summary";

export interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    stockQuantity: number;
    image: string;
}

export default function Page() {
    const cartItems: CartItem[] = [
        {
            id: 1,
            title: "스페셜 리저브 하와이 코나",
            price: 10000,
            quantity: 10,
            stockQuantity: 10,
            image: "https://cdn.builder.io/api/v1/image/assets/TEMP/4c7bfa7b14aca451340208bfc07390f055298c80",
        },
        {
            id: 2,
            title: "액티브",
            price: 20000,
            quantity: 20,
            stockQuantity: 5,
            image: "https://cdn.builder.io/api/v1/image/assets/TEMP/4c7bfa7b14aca451340208bfc07390f055298c80",
        },
    ];
    return (
        <div className="flex flex-col lg:flex-row justify-center items-center max-w-screen-xl mx-auto px-2 lg:px-8">
            <CartSectionLayout>
                <h1 className="self-stretch flex-grow-0 flex-shrink-0 w-[343px] text-xl font-bold text-left">장바구니</h1>
                <CartProductLayout>
                    {cartItems.map(item => (
                        <Item
                            key={item.id}
                            title={item.title}
                            price={item.price}
                            quantity={item.quantity}
                            stockQuantity={item.stockQuantity}
                            image={item.image}
                        />
                    ))}
                </CartProductLayout>
            </CartSectionLayout>
            <div className="self-stretch flex-grow-0 flex-shrink-0 h-3 bg-[#70737c]/[0.08]" />
            <CartSectionLayout>
                <Summary cartItems={cartItems} shippingFee={0} />
            </CartSectionLayout>
        </div>
    );
}
