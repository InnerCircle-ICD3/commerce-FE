import type { ProductType } from "@/src/features/main/types/product";

/**
 * 목 제품 데이터를 반환하는 함수
 */
export function getMockProducts(): ProductType[] {
    return [
        {
            type: "banner",
            image: "https://cdn.builder.io/api/v1/image/assets/TEMP/7f5a8130fc9147e4fc6a3b266af030fa1bf690c9",
            title: "New\n시즌 한정 커피",
            description: "새롭게 출시된 버츄오 커피",
        },
        {
            productId: 1,
            type: "product",
            badges: [
                { text: "더블 에스프레소", variant: "default" },
                { text: "신제품", variant: "yellow" },
                { text: "시즌 한정", variant: "purple" },
            ],
            image: "https://cdn.builder.io/api/v1/image/assets/TEMP/4c7bfa7b14aca451340208bfc07390f055298c80",
            features: [
                {
                    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/7ec1fe57569b1f4a69a9d7b05a066a87d07c92fb",
                    value: "80ml",
                },
            ],
            name: "스페셜 리저브 하와이 코나",
            description: "이국적인 열대 과일향과 고소한 견과류 향이 어우러진 싱글 오리진 커피",
            price: 35000,
            unit: "10 캡슐",
            stockQuantity: 20,
        },
        {
            productId: 2,
            type: "product",
            badges: [
                { text: "더블 에스프레소", variant: "default" },
                { text: "신제품", variant: "yellow" },
            ],
            image: "https://cdn.builder.io/api/v1/image/assets/TEMP/8bbce382ddc1ef5815fb52b37f81695001108d91",
            features: [
                {
                    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ec3b1979ebd42585e8a43f121a5a2792cd9dc58c",
                    value: "아이스",
                },
                {
                    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/04dabf840c4cf0b87799c6e096929c365ec2909c",
                    value: "80ml",
                },
            ],
            name: "액티브",
            description: "아이스로 즐기기 좋은 비타민 B6 함유 커피",
            price: 11000,
            unit: "10 캡슐",
            stockQuantity: 20,
        },
        {
            productId: 3,
            type: "product",
            badges: [{ text: "신제품", variant: "yellow" }],
            image: "https://cdn.builder.io/api/v1/image/assets/TEMP/8bbce382ddc1ef5815fb52b37f81695001108d91",
            features: [
                {
                    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ec3b1979ebd42585e8a43f121a5a2792cd9dc58c",
                    value: "아이스",
                },
                {
                    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/04dabf840c4cf0b87799c6e096929c365ec2909c",
                    value: "80ml",
                },
            ],
            name: "일 카페",
            description: "강렬하고 풍부한 맛과 향의 이탈리아 에스프레소",
            price: 11000,
            unit: "10 캡슐",
            stockQuantity: 20,
        },
    ];
}
