import { LayoutDashboard, ShoppingBag, FileText, Settings, Users } from "lucide-react";

export const sidebarData = {
    navGroups: [
        {
            title: "메뉴",
            items: [
                {
                    title: "대시보드",
                    href: "/",
                    icon: LayoutDashboard,
                    variant: "ghost",
                },
                {
                    title: "상품 관리",
                    href: "/products",
                    icon: ShoppingBag,
                    variant: "ghost",
                },
                {
                    title: "주문 관리",
                    href: "/orders",
                    icon: FileText,
                    variant: "ghost",
                },
                {
                    title: "고객 관리",
                    href: "/customers",
                    icon: Users,
                    variant: "ghost",
                },
                {
                    title: "설정",
                    href: "/settings",
                    icon: Settings,
                    variant: "ghost",
                },
            ],
        },
    ],
    user: {
        name: "관리자",
        email: "admin@example.com",
        image: "https://github.com/shadcn.png",
    },
    teams: [
        { name: "쇼핑몰 관리자", value: "shop-admin" },
        { name: "콘텐츠 관리자", value: "content-admin" },
    ],
};
