"use client";

import { useRouter, useSearchParams } from "next/navigation";

type PaginationProps = {
    page: number;
    totalPages: number;
};

export default function Pagination({ page, totalPages }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const changePage = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        router.push(`?${params.toString()}`);
    };

    // if (totalPages <= 1) {
    //     return null; // 페이지가 하나도 없으면 렌더링하지 않음
    // }

    return (
        <div className="flex items-center justify-center gap-1 my-4">
            <button
                type="button"
                onClick={() => changePage(Math.max(0, page - 1))}
                disabled={page === 0}
                className="px-2 py-1 text-lg font-bold text-gray-500 disabled:text-gray-300"
            >
                {"<"}
            </button>
            {Array.from({ length: totalPages }, (_, i) => {
                const pageNumber = i + 1;
                return (
                    <button
                        type="button"
                        key={pageNumber}
                        onClick={() => changePage(pageNumber)}
                        className={`px-2 py-1 rounded ${page === i ? "bg-[#257A57] text-white" : "bg-gray-100 text-black"}`}
                    >
                        {pageNumber}
                    </button>
                );
            })}
            <button
                type="button"
                onClick={() => changePage(page + 1)}
                disabled={page === totalPages - 1}
                className="px-2 py-1 text-lg font-bold text-gray-500 disabled:text-gray-300"
            >
                {">"}
            </button>
        </div>
    );
}
