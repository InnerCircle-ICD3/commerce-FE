import type { Category } from "@/src/features/main/types/category";

/**
 * 목 카테고리 데이터를 반환하는 함수
 */
export function getMockCategories(): Category[] {
    return [
        {
            id: "espresso-capsules",
            title: "에스프레소 캡슐",
            description: "진한 크레마와 깊은 맛의 정통 이탈리안 에스프레소 캡슐",
            imageUrl: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=400&h=300&fit=crop&crop=center",
        },
        {
            id: "lungo-capsules",
            title: "룽고 캡슐",
            description: "부드럽고 향긋한 긴 추출 방식의 룽고 커피 캡슐",
            imageUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop&crop=center",
        },
        {
            id: "flavored-capsules",
            title: "플레이버 캡슐",
            description: "바닐라, 카라멜, 헤이즐넛 등 다양한 향이 가미된 특별한 캡슐",
            imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&crop=center",
        },
        {
            id: "decaf-capsules",
            title: "디카페인 캡슐",
            description: "카페인을 제거하고도 풍부한 맛을 유지한 디카페인 캡슐",
            imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop&crop=center",
        },
    ];
}
