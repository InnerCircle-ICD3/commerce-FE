import type { HTMLAttributes } from "react";
import { useId } from "react";

export type IconDirection = "left" | "right" | "up" | "down";
export type IconSize = "sm" | "md" | "lg";

// 아이콘 크기별 치수 설정 (중복 코드 제거)
export const ICON_DIMENSIONS = {
    sm: 16,
    md: 24,
    lg: 32,
};

// 소셜 아이콘 치수 설정
export const SOCIAL_ICON_DIMENSIONS = {
    sm: 16,
    md: 20,
    lg: 24,
};

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
    // 고유 ID 생성
    const uniqueId = useId();
    const titleId = `arrow-icon-${direction}-${uniqueId}`;

    // 크기에 따른 width, height 결정
    const width = ICON_DIMENSIONS[size];
    const height = ICON_DIMENSIONS[size];

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
        const scale = ICON_DIMENSIONS[size] / viewBoxSize;

        // path 데이터의 좌표 조정
        pathData = pathData.replace(/(\d+)/g, match => {
            const num = Number.parseInt(match, 10);
            return Math.round(num * scale).toString();
        });
    }

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
    const uniqueId = useId();
    const titleId = `filter-icon-${uniqueId}`;

    const width = ICON_DIMENSIONS[size];
    const height = ICON_DIMENSIONS[size];

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
    const uniqueId = useId();
    const titleId = `search-icon-${uniqueId}`;

    const width = ICON_DIMENSIONS[size];
    const height = ICON_DIMENSIONS[size];

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

/**
 * 카카오 로그인 아이콘
 */
export const KakaoIcon = ({ title = "카카오 로고", ...props }: Omit<IconProps, "direction" | "size" | "strokeWidth">) => {
    const uniqueId = useId();
    const titleId = `kakao-icon-${uniqueId}`;

    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby={titleId}
            {...props}
        >
            <title id={titleId}>{title}</title>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 3.125C6.17 3.125 3.125 5.682 3.125 8.957C3.125 11.1 4.452 13.047 6.454 14.094C6.298 14.602 5.73 16.11 5.67 16.34C5.593 16.637 5.779 16.637 5.941 16.531C6.068 16.446 7.89 15.207 8.532 14.77C9 14.855 9.492 14.895 10 14.895C13.83 14.895 16.875 12.337 16.875 9.063C16.875 5.789 13.83 3.125 10 3.125Z"
                fill="black"
            />
        </svg>
    );
};

/**
 * 네이버 로그인 아이콘
 */
export const NaverIcon = ({ title = "네이버 로고", ...props }: Omit<IconProps, "direction" | "size" | "strokeWidth">) => {
    const uniqueId = useId();
    const titleId = `naver-icon-${uniqueId}`;

    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby={titleId}
            {...props}
        >
            <title id={titleId}>{title}</title>
            <path d="M13.5615 10.7692L6.16346 0H0V20H6.44231V9.23077L13.8365 20H20V0H13.5615V10.7692Z" fill="white" />
        </svg>
    );
};

/**
 * 구글 로그인 아이콘
 */
export const GoogleIcon = ({ title = "구글 로고", ...props }: Omit<IconProps, "direction" | "size" | "strokeWidth">) => {
    const uniqueId = useId();
    const titleId = `google-icon-${uniqueId}`;

    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby={titleId}
            {...props}
        >
            <title id={titleId}>{title}</title>
            <path
                d="M19.6 10.2273C19.6 9.51819 19.5364 8.83637 19.4182 8.18182H10V12.05H15.3818C15.15 13.3 14.4455 14.3591 13.3864 15.0682V17.5773H16.6182C18.5091 15.8364 19.6 13.2727 19.6 10.2273Z"
                fill="#4285F4"
            />
            <path
                d="M10 20C12.7 20 14.9636 19.1045 16.6182 17.5773L13.3864 15.0682C12.4909 15.6682 11.3455 16.0227 10 16.0227C7.39545 16.0227 5.19091 14.2636 4.40455 11.9H1.06364V14.4909C2.70909 17.7591 6.09091 20 10 20Z"
                fill="#34A853"
            />
            <path
                d="M4.40454 11.9C4.20454 11.3 4.09091 10.6591 4.09091 10C4.09091 9.34091 4.20454 8.7 4.40454 8.1V5.50909H1.06364C0.386365 6.85909 0 8.38636 0 10C0 11.6136 0.386365 13.1409 1.06364 14.4909L4.40454 11.9Z"
                fill="#FBBC05"
            />
            <path
                d="M10 3.97727C11.4682 3.97727 12.7864 4.48182 13.8227 5.47273L16.6909 2.60455C14.9591 0.990909 12.6955 0 10 0C6.09091 0 2.70909 2.24091 1.06364 5.50909L4.40455 8.1C5.19091 5.73636 7.39545 3.97727 10 3.97727Z"
                fill="#EA4335"
            />
        </svg>
    );
};

/**
 * 커피컵 아이콘
 */
export const CoffeeIcon = ({ size = "md", title = "커피 아이콘", ...props }: Omit<IconProps, "direction" | "strokeWidth">) => {
    const uniqueId = useId();
    const titleId = `coffee-icon-${uniqueId}`;

    const width = SOCIAL_ICON_DIMENSIONS[size];
    const height = SOCIAL_ICON_DIMENSIONS[size];

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby={titleId}
            {...props}
        >
            <title id={titleId}>{title}</title>
            <path
                d="M16.25 7.5H3.75C3.41848 7.5 3.10054 7.6317 2.86612 7.86612C2.6317 8.10054 2.5 8.41848 2.5 8.75V12.5C2.5 13.8261 3.02678 15.0979 3.96447 16.0355C4.90215 16.9732 6.17392 17.5 7.5 17.5H12.5C13.8261 17.5 15.0979 16.9732 16.0355 16.0355C16.9732 15.0979 17.5 13.8261 17.5 12.5V8.75C17.5 8.41848 17.3683 8.10054 17.1339 7.86612C16.8995 7.6317 16.5815 7.5 16.25 7.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5 7.5V5C5 4.33696 5.26339 3.70107 5.73223 3.23223C6.20107 2.76339 6.83696 2.5 7.5 2.5H12.5C13.163 2.5 13.7989 2.76339 14.2678 3.23223C14.7366 3.70107 15 4.33696 15 5V7.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M8.125 12.5H11.875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

/**
 * 컵 사이즈 아이콘 (피그마 디자인)
 * 머그컵 모양의 아이콘
 */
export const CupSizeIcon = ({ size = "md", title = "컵 사이즈 아이콘", ...props }: Omit<IconProps, "direction" | "strokeWidth">) => {
    const uniqueId = useId();
    const titleId = `cup-size-icon-${uniqueId}`;

    const width = SOCIAL_ICON_DIMENSIONS[size];
    const height = SOCIAL_ICON_DIMENSIONS[size];

    // 제공된 이미지 URL과 유사한 머그컵 아이콘 구현
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby={titleId}
            {...props}
        >
            <title id={titleId}>{title}</title>
            <path
                d="M14.5 6H5.5C5.22386 6 5 6.22386 5 6.5V12.5C5 13.8807 6.11929 15 7.5 15H12.5C13.8807 15 15 13.8807 15 12.5V6.5C15 6.22386 14.7761 6 14.5 6Z"
                stroke="#808080"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M15 8.5H16.5C17.0523 8.5 17.5 8.94772 17.5 9.5V10C17.5 10.5523 17.0523 11 16.5 11H15"
                stroke="#808080"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <line x1="7.5" y1="16.5" x2="12.5" y2="16.5" stroke="#808080" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
    );
};

/**
 * 컵 사이즈 아이콘 (원형 디자인)
 * 머그컵 모양의 아이콘 (원형 배경 안에 사용될 때)
 */
export const CupSizeCircleIcon = ({ size = "md", title = "원형 컵 사이즈 아이콘", ...props }: Omit<IconProps, "direction" | "strokeWidth">) => {
    const uniqueId = useId();
    const titleId = `cup-size-circle-icon-${uniqueId}`;

    const width = SOCIAL_ICON_DIMENSIONS[size];
    const height = SOCIAL_ICON_DIMENSIONS[size];

    // 제공된 이미지 URL과 유사한 머그컵 아이콘 구현
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby={titleId}
            {...props}
        >
            <title id={titleId}>{title}</title>
            <path
                d="M14.5 6H5.5C5.22386 6 5 6.22386 5 6.5V12.5C5 13.8807 6.11929 15 7.5 15H12.5C13.8807 15 15 13.8807 15 12.5V6.5C15 6.22386 14.7761 6 14.5 6Z"
                stroke="#808080"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M15 8.5H16.5C17.0523 8.5 17.5 8.94772 17.5 9.5V10C17.5 10.5523 17.0523 11 16.5 11H15"
                stroke="#808080"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <line x1="7.5" y1="16.5" x2="12.5" y2="16.5" stroke="#808080" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
    );
};

/**
 * 수량 증가 아이콘
 * 장바구니 수량 증가 버튼(QuantityChange.tsx)에 사용
 */

export const QuantityIncreaseIcon = ({ size = "md", title = "수량 증가 아이콘", ...props }: Omit<IconProps, "direction" | "strokeWidth">) => {
    const uniqueId = useId();
    const titleId = `quantity-increase-icon-${uniqueId}`;

    const width = SOCIAL_ICON_DIMENSIONS[size];
    const height = SOCIAL_ICON_DIMENSIONS[size];

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby={titleId}
            {...props}
        >
            <title id={titleId}>{title}</title>
            <path
                d="M9.33398 10.6666H5.33398V9.33325H9.33398V5.33325H10.6673V9.33325H14.6673V10.6666H10.6673V14.6666H9.33398V10.6666Z"
                fill="black"
            />
        </svg>
    );
};

/**
 * 수량 감소 아이콘
 * 장바구니 수량 감소 버튼(QuantityChange.tsx)에 사용
 */
export const QuantityDecreaseIcon = ({ size = "md", title = "수량 감소 아이콘", ...props }: Omit<IconProps, "direction" | "strokeWidth">) => {
    const uniqueId = useId();
    const titleId = `quantity-decrease-icon-${uniqueId}`;

    const width = SOCIAL_ICON_DIMENSIONS[size];
    const height = SOCIAL_ICON_DIMENSIONS[size];

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby={titleId}
            {...props}
        >
            <title id={titleId}>{title}</title>
            <path d="M5.33398 10.6666V9.33325H14.6673V10.6666H5.33398Z" fill="black" />
        </svg>
    );
};

export const CloseIcon = ({ size = "md", title = "닫기 아이콘", ...props }: Omit<IconProps, "direction" | "strokeWidth">) => {
    const uniqueId = useId();
    const titleId = `close-icon-${uniqueId}`;

    const width = ICON_DIMENSIONS[size];
    const height = ICON_DIMENSIONS[size];

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby={titleId}
            {...props}
        >
            <title id={titleId}>{title}</title>
            <path
                d="M6.74206 27L5 25.2579L14.2579 16L5 6.74206L6.74206 5L16 14.2579L25.2579 5L27 6.74206L17.7421 16L27 25.2579L25.2579 27L16 17.7421L6.74206 27Z"
                fill="black"
            />
        </svg>
    );
};
