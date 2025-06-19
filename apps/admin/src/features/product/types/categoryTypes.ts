// 컵사이즈 enum (백엔드 응답 기반)
export const CupSizes = {
    "1": "25ml",
    "2": "40ml",
    "3": "80ml",
    "4": "150ml",
    "5": "230ml",
    "6": "355ml",
} as const;

// 강도 enum (백엔드 응답 기반)
export const Intensities = {
    "7": "1",
    "8": "2",
    "9": "3",
    "10": "4",
    "11": "5",
    "12": "6",
    "13": "7",
    "14": "8",
    "15": "9",
} as const;

// 타입 정의
export type CupSizeId = keyof typeof CupSizes;
export type IntensityId = keyof typeof Intensities;

// 선택 옵션 타입
export interface SelectOption {
    id: string;
    label: string;
}

// 컵사이즈 선택 옵션 배열
export const cupSizeOptions: SelectOption[] = Object.entries(CupSizes)
    .filter(([id, label]) => id && id.trim() !== '' && label && label.trim() !== '')
    .map(([id, label]) => ({
        id: id.trim(),
        label: label.trim(),
    }));

// 강도 선택 옵션 배열  
export const intensityOptions: SelectOption[] = Object.entries(Intensities)
    .filter(([id, label]) => id && id.trim() !== '' && label && label.trim() !== '')
    .map(([id, label]) => ({
        id: id.trim(),
        label: `강도 ${label.trim()}`,
    })); 