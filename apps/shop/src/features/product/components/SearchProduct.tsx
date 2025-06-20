"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";
import type { FormEvent } from "react";

// 최초 렌더링 이후 partial rendering를 위해서 CSR로 구현
export default function SearchProduct() {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);

    // form submit 이벤트 핸들러 (Enter키 및 돋보기 아이콘 클릭 모두 처리)
    const handleSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const searchQuery = formData.get("searchQuery") || "";

            // 빈 검색어일 때도 전체 상품을 보여주기 위해 리다이렉트
            router.push(`/search?q=${searchQuery}`);
        },
        [router],
    );

    const getRandomKeyword = useCallback((): string => {
        const keywords = ["라떼", "아메리카노", "카푸치노", "콜드브루", "바닐라"];
        return keywords[Math.floor(Math.random() * keywords.length)];
    }, []);

    return (
        <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-wrap flex-1 shrink gap-2 items-center self-stretch p-4 my-auto text-sm tracking-tight leading-snug rounded-xl basis-0 bg-neutral-100 min-h-14 min-w-60 text-neutral-700 max-md:max-w-full"
        >
            <button type="submit" className="border-none bg-transparent cursor-pointer p-0">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/fb040e39632d075dcdf31086c7ed0bea3c66aeb6"
                    alt="Search"
                    className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                />
            </button>
            <input
                type="text"
                placeholder={`'${getRandomKeyword()}'를 검색해 보세요  (빈값을 넣으면 전체상품을 조회합니다)`}
                className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500 w-full"
                name="searchQuery"
            />
        </form>
    );
}
