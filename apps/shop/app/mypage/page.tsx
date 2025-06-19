import LinkedMenu from "@/src/features/mypage/components/LinkedMenu";
import UserInfo from "@/src/features/mypage/components/UserInfo";

export const metadata = {
    title: "마이페이지",
    description: "사용자 마이페이지",
};

export type ShippingProduct = {
    orderNumber: string;
    image: string;
    mainProductName: string;
    status: string;
    remainingProductCount?: number;
};

const menuInfos = [
    { title: "주문내역", href: "/order" },
    // { title: "취소/교환/반품 내역", href: "/order" },
    { title: "리뷰 관리", href: "/review/my" },
    { title: "배송지 관리", href: "/address" },
];

export default function Page() {
    return (
        <div className="flex flex-col justify-center max-w-screen-xl mx-auto px-4 lg:px-8 gap-4 p-7 my-16">
            <h1 className="text-2xl font-bold mb-6">마이페이지</h1>
            <UserInfo />
            {/* <div className="flex flex-col gap-4 my-8">
                <h2 className="text-lg font-bold">배송 중 상품</h2>
                <div className="flex flex-col lg:flex-row gap-4 flex-wrap">
                    {shippingProducts.map(product => (
                        <ShippingProductInfo key={product.orderNumber} product={product} />
                    ))}
                </div>
            </div> */}
            {menuInfos.map(menu => (
                <LinkedMenu key={menu.title} name={menu.title} href={menu.href} />
            ))}
        </div>
    );
}
