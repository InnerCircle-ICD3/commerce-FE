import type { Category } from "@/src/features/main/types/category";

/**
 * 목 카테고리 데이터를 반환하는 함수
 */
export function getMockCategories(): Category[] {
    return [
        {
            id: "virtuo-capsules",
            title: "버츄오 캡슐 커피",
            description: "다양한 크기와 풍부한 맛으로 즐기는 프리미엄 커피",
            imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/4c7bfa7b14aca451340208bfc07390f055298c80",
        },
        {
            id: "original-capsules",
            title: "오리지널 캡슐 커피",
            description: "진하고 깊은 에스프레소 풍미를 담은 정통 캡슐",
            imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/4c7bfa7b14aca451340208bfc07390f055298c80",
        },
        {
            id: "machines",
            title: "머신",
            description: "혁신적인 디자인과 최신 기술이 적용된 801 커피 머신",
            imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/4c7bfa7b14aca451340208bfc07390f055298c80",
        },
        {
            id: "accessories",
            title: "액세서리",
            description: "커피 경험을 완성하는 다양한 고품질 액세서리",
            imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/4c7bfa7b14aca451340208bfc07390f055298c80",
        },
    ];
}
