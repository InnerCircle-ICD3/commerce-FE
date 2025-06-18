"use client";

import { useRouter, useSearchParams } from "next/navigation";

type PaginationProps = {
    page: number;
    totalPages: number;
    totalElements?: number;
};

export default function Pagination({ page, totalPages }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    console.log("Pagination component rendered with page:", page, "totalPages:", totalPages);

    const changePage = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        router.push(`?${params.toString()}`);
    };

    const getVisiblePages = () => {
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            // 전체 페이지가 5개 이하면 모두 표시
            return Array.from({ length: totalPages }, (_, i) => i);
        }
        // 현재 페이지를 중심으로 5개 페이지 계산
        let startPage = Math.max(0, page - 2);
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        // 끝페이지가 최대값에 도달했을 때 시작페이지 조정
        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(0, endPage - maxVisiblePages + 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };
    return (
        <div className="flex items-center justify-center gap-1 my-4">
            <button
                type="button"
                onClick={() => changePage(1)}
                disabled={!page || page === 1}
                className="px-2 py-1 text-lg font-bold text-gray-500 disabled:text-gray-300"
            >
                {"<<"}
            </button>
            <button
                type="button"
                onClick={() => changePage(Math.max(0, page - 1))}
                disabled={!page || page === 1}
                className="px-2 py-1 text-lg font-bold text-gray-500 disabled:text-gray-300"
            >
                {"<"}
            </button>
            {getVisiblePages().map(i => {
                const pageNumber = i + 1;
                return (
                    <button
                        type="button"
                        key={pageNumber}
                        onClick={() => changePage(pageNumber)}
                        className={`px-2 py-1 rounded ${page === pageNumber ? "bg-[#257A57] text-white" : "bg-gray-100 text-black"}`}
                    >
                        {pageNumber}
                    </button>
                );
            })}
            <button
                type="button"
                onClick={() => changePage(page + 1)}
                disabled={page === totalPages}
                className="px-2 py-1 text-lg font-bold text-gray-500 disabled:text-gray-300"
            >
                {">"}
            </button>
            <button
                type="button"
                onClick={() => changePage(totalPages)}
                disabled={page === totalPages}
                className="px-2 py-1 text-lg font-bold text-gray-500 disabled:text-gray-300"
            >
                {">>"}
            </button>
        </div>
    );
}
