import { useMemo } from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    // shop과 동일한 페이지 계산 알고리즘
    const visiblePages = useMemo(() => {
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            // 전체 페이지가 5개 이하면 모두 표시 (1-based)
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        // 현재 페이지를 중심으로 5개 페이지 계산 (1-based)
        let startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        // 끝페이지가 최대값에 도달했을 때 시작페이지 조정
        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    }, [currentPage, totalPages]);

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePageClick = (page: number) => {
        if (page !== currentPage) {
            onPageChange(page);
        }
    };

    // 총 페이지가 0이면 페이지네이션을 표시하지 않음
    if (totalPages === 0) {
        return null;
    }
    return (
        <div className="flex items-center justify-center gap-2 my-6">
            {/* 처음 페이지 */}
            <Button onClick={() => handlePageClick(1)} disabled={currentPage === 1} aria-label="First page">
                {"<<"}
            </Button>

            {/* 이전 페이지 */}
            <Button onClick={handlePrevious} disabled={currentPage === 1} aria-label="Previous page">
                {"<"}
            </Button>

            {/* 페이지 번호들 */}
            {visiblePages.map(page => (
                <Button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    disabled={page === currentPage}
                    aria-label={`Page ${page}`}
                    isActive={page === currentPage}
                >
                    {page}
                </Button>
            ))}

            {/* 다음 페이지 */}
            <Button onClick={handleNext} disabled={currentPage === totalPages} aria-label="Next page">
                {">"}
            </Button>

            {/* 마지막 페이지 */}
            <Button onClick={() => handlePageClick(totalPages)} disabled={currentPage === totalPages} aria-label="Last page">
                {">>"}
            </Button>
        </div>
    );
}

type buttonProps = {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    isActive?: boolean;
};

const Button = ({ children, onClick, disabled, isActive = false }: buttonProps) => {
    if (isActive) {
        return (
            <button
                type="button"
                onClick={onClick}
                disabled={disabled}
                className="min-w-[2.5rem] h-9 px-3 py-2 rounded-md bg-blue-600 text-white text-sm font-medium transition-colors"
            >
                {children}
            </button>
        );
    }

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`min-w-[2.5rem] h-9 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                disabled ? "text-gray-400 cursor-not-allowed" : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
        >
            {children}
        </button>
    );
};
