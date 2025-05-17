import type { HTMLAttributes } from "react";

export type IconDirection = "left" | "right" | "up" | "down";
export type IconSize = "sm" | "md" | "lg";

export interface IconProps extends HTMLAttributes<SVGElement> {
    /**
     * 아이콘 방향
     * @default right
     */
    direction?: IconDirection;

    /**
     * 아이콘 크기 (sm: 16px, md: 24px, lg: 32px)
     * @default md
     */
    size?: IconSize;

    /**
     * 선 두께
     * @default 2
     */
    strokeWidth?: number;

    /**
     * 화면 리더를 위한 설명 (접근성)
     * @default "아이콘"
     */
    title?: string;
}

export const ArrowIcon = ({ direction = "right", size = "md", strokeWidth = 2, title = "화살표 아이콘", ...props }: IconProps) => {
    // 크기에 따른 width, height 결정
    const dimensions = {
        sm: 16,
        md: 24,
        lg: 32,
    };

    const width = dimensions[size];
    const height = dimensions[size];

    // 방향에 따른 path 결정
    const paths = {
        left: "M20 24L12 16L20 8", // 왼쪽 화살표 (32x32 기준)
        right: "M12 8L20 16L12 24", // 오른쪽 화살표 (32x32 기준)
        up: "M8 20L16 12L24 20", // 위쪽 화살표 (32x32 기준)
        down: "M24 12L16 20L8 12", // 아래쪽 화살표 (32x32 기준)
    };

    // 크기에 따른 viewBox 조정
    const viewBoxSize = 32;
    const viewBox = `0 0 ${viewBoxSize} ${viewBoxSize}`;

    // path 데이터 가져오기
    let pathData = paths[direction];

    // 크기에 따라 path 데이터를 조정 (16px, 24px일 경우)
    if (size === "sm" || size === "md") {
        // 크기 비율 계산
        const scale = dimensions[size] / viewBoxSize;

        // path 데이터의 좌표 조정
        pathData = pathData.replace(/(\d+)/g, match => {
            const num = Number.parseInt(match, 10);
            return Math.round(num * scale).toString();
        });
    }

    const titleId = `arrow-icon-${direction}`;

    return (
        <svg
            width={width}
            height={height}
            viewBox={viewBox}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby={titleId}
            {...props}
        >
            <title id={titleId}>{title}</title>
            <path d={pathData} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

/**
 * 필터 아이콘 (OrderHistoryPage.tsx에서 사용)
 */
export const FilterIcon = ({ size = "md", strokeWidth = 2, title = "필터 아이콘", ...props }: Omit<IconProps, "direction">) => {
    const dimensions = {
        sm: 16,
        md: 24,
        lg: 32,
    };

    const width = dimensions[size];
    const height = dimensions[size];
    const titleId = "filter-icon";

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby={titleId}
            {...props}
        >
            <title id={titleId}>{title}</title>
            <path d="M3 7H21M6 12H18M10 17H14" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

/**
 * 검색 아이콘 (OrderHistoryPage.tsx에서 사용)
 */
export const SearchIcon = ({ size = "md", strokeWidth = 2, title = "검색 아이콘", ...props }: Omit<IconProps, "direction">) => {
    const dimensions = {
        sm: 16,
        md: 24,
        lg: 32,
    };

    const width = dimensions[size];
    const height = dimensions[size];
    const titleId = "search-icon";

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby={titleId}
            {...props}
        >
            <title id={titleId}>{title}</title>
            <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
