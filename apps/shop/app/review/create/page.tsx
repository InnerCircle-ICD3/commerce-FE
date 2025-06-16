"use client";

import { useRouter } from "next/navigation";
import CreateReviewModal from "@/src/features/reviewCreate/components/CreateReviewModal";
import type { ProductType } from "@/src/features/product/types";

// 테스트용 제품 데이터 (실제로는 쿼리 파라미터로 제품 ID를 받아서 데이터를 가져와야 함)
const mockProduct: ProductType = {
    id: 1,
    name: "801 프리미엄 블렌드 커피 캡슐",
    price: 11500,
    detailImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/4c7bfa7b14aca451340208bfc07390f055298c80",
    intensity: 4,
    quantity: 100,
    thumbnail: "https://cdn.builder.io/api/v1/image/assets/TEMP/4c7bfa7b14aca451340208bfc07390f055298c80",
    cupSize: "미디엄",
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
                product={{
                    productId: mockProduct.id,
                    title: mockProduct.name,
                    imageUrl: mockProduct.thumbnail,
                }}
                isOpen={true}
                onClickClose={handleClose}
            />
        </div>
    );
}
