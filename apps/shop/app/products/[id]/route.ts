import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// 기존 커피 목 데이터 (스웨거 기준으로 수정)
const MOCK_PRODUCTS = [
    {
        id: 1,
        name: "에스프레소",
        price: 2500,
        quantity: 100,
        thumbnail: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=300&h=300&fit=crop&crop=center",
        detailImage: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&h=400&fit=crop&crop=center",
        intensity: "Strong",
        cupSize: "Small",
        isSoldOut: false,
    },
    {
        id: 2,
        name: "아메리카노",
        price: 3000,
        quantity: 150,
        thumbnail: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop&crop=center",
        detailImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop&crop=center",
        intensity: "Medium",
        cupSize: "Large",
        isSoldOut: false,
    },
    {
        id: 3,
        name: "카페라떼",
        price: 4000,
        quantity: 80,
        thumbnail: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=300&h=300&fit=crop&crop=center",
        detailImage: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600&h=400&fit=crop&crop=center",
        intensity: "Medium",
        cupSize: "Medium",
        isSoldOut: false,
    },
    {
        id: 4,
        name: "카푸치노",
        price: 4200,
        quantity: 120,
        thumbnail: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=300&h=300&fit=crop&crop=center",
        detailImage: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=600&h=400&fit=crop&crop=center",
        intensity: "Medium",
        cupSize: "Medium",
        isSoldOut: false,
    },
    {
        id: 5,
        name: "마키아토",
        price: 4500,
        quantity: 60,
        thumbnail: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=300&fit=crop&crop=center",
        detailImage: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=400&fit=crop&crop=center",
        intensity: "Strong",
        cupSize: "Small",
        isSoldOut: false,
    },
    {
        id: 6,
        name: "바닐라라떼",
        price: 4800,
        quantity: 90,
        thumbnail: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=300&fit=crop&crop=center",
        detailImage: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop&crop=center",
        intensity: "Light",
        cupSize: "Large",
        isSoldOut: false,
    },
    {
        id: 7,
        name: "헤이즐넛 라떼",
        price: 5000,
        quantity: 70,
        thumbnail: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=300&fit=crop&crop=center",
        detailImage: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=400&fit=crop&crop=center",
        intensity: "Medium",
        cupSize: "Small",
        isSoldOut: false,
    },
    {
        id: 8,
        name: "아이스아메리카노",
        price: 3200,
        quantity: 85,
        thumbnail: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=300&h=300&fit=crop&crop=center",
        detailImage: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&h=400&fit=crop&crop=center",
        intensity: "Medium",
        cupSize: "Large",
        isSoldOut: false,
    },
    {
        id: 9,
        name: "콜드브루",
        price: 3800,
        quantity: 95,
        thumbnail: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=300&h=300&fit=crop&crop=center",
        detailImage: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&h=400&fit=crop&crop=center",
        intensity: "Strong",
        cupSize: "Medium",
        isSoldOut: false,
    },
    {
        id: 10,
        name: "플랫 화이트",
        price: 3500,
        quantity: 0,
        thumbnail: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=300&fit=crop&crop=center",
        detailImage: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&h=400&fit=crop&crop=center",
        intensity: "Medium",
        cupSize: "Large",
        isSoldOut: true,
    },
];

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const productId = resolvedParams.id;

    if (!productId) {
        return NextResponse.json({ error: "productId is required" }, { status: 400 });
    }

    const id = Number.parseInt(productId, 10);
    const product = MOCK_PRODUCTS.find(p => p.id === id);

    if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // 스웨거 기준 응답 형식
    const mockProduct = {
        data: product,
    };

    return NextResponse.json(mockProduct);
}
