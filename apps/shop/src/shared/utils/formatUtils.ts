/**
 * 숫자를 한국 로케일 형식의 문자열로 변환합니다. (예: 1000 -> "1,000")
 * @param value 변환할 숫자
 * @returns 한국 로케일 형식으로 포맷된 문자열
 */
export const formatNumber = (value: number): string => {
    return value.toLocaleString("ko-KR");
};

/**
 * 숫자를 한국 로케일 형식의 통화 문자열로 변환합니다. (예: 1000 -> "₩ 1,000")
 * @param value 변환할 숫자
 * @param currencySymbol 통화 기호 (기본값: "₩")
 * @returns 한국 로케일 형식으로 포맷된 통화 문자열
 */
export const formatCurrency = (value: number, currencySymbol = "₩"): string => {
    return `${currencySymbol} ${formatNumber(value)}`;
};
