"use client";

import { useRouter } from "next/navigation";
import CreateReviewModal from "@/src/features/reviewCreate/components/CreateReviewModal";
import type { ProductType } from "@/src/features/product/types";

// 테스트용 제품 데이터 (실제로는 쿼리 파라미터로 제품 ID를 받아서 데이터를 가져와야 함)
const mockProduct: ProductType = {
    id: 1,
    title: "801 프리미엄 블렌드 커피 캡슐",
    description: "깊고 풍부한 맛의 프리미엄 커피",
    price: 11500,
    images: ["https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=200&auto=format&fit=crop"],
    tags: ["프리미엄", "아라비카"],
    badges: [
        { text: "베스트셀러", bgColor: "#FF6B6B", textColor: "#FFFFFF" }
    ],
    inStock: true,
};

export default function ReviewCreatePage() {
    const router = useRouter();

    const handleClose = () => {
        // 모달이 닫히면 이전 페이지로 이동
        router.back();
    };

    return (
        <div>
            <CreateReviewModal
                product={mockProduct}
                isOpen={true}
                onClickClose={handleClose}
            />
        </div>
    );
} 