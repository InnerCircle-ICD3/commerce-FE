import { useState } from "react";
import { memo } from "react";
import { ArrowIcon } from "@/src/shared/components/shared/Icon";
import { FilterButton } from "./FilterButton";
import type { CategoryItem } from "@/src/features/search/api/categoriesApi";

interface SearchFilterProps {
    resultCount?: number;
    selectedIntensity?: string | null;
    selectedCupSize?: string | null;
    onIntensityChange?: (intensity: string | null) => void;
    onCupSizeChange?: (cupSize: string | null) => void;
    searchTerm?: string;
    // 동적 필터 데이터
    intensities?: CategoryItem[];
    cupSizes?: CategoryItem[];
}

const SearchFilter = memo(function SearchFilter({
    resultCount,
    selectedIntensity,
    selectedCupSize,
    onIntensityChange,
    onCupSizeChange,
    searchTerm,
    intensities = [],
    cupSizes = [],
}: SearchFilterProps) {
    const [isIntensityOpen, setIsIntensityOpen] = useState(true);
    const [isCupSizeOpen, setIsCupSizeOpen] = useState(true);

    const handleIntensityClick = (intensity: string) => {
        // 같은 버튼을 클릭하면 선택 해제, 다른 버튼을 클릭하면 해당 버튼 선택
        const newIntensity = selectedIntensity === intensity ? null : intensity;
        onIntensityChange?.(newIntensity);
    };

    const handleCupSizeClick = (cupSize: string) => {
        // 같은 버튼을 클릭하면 선택 해제, 다른 버튼을 클릭하면 해당 버튼 선택
        const newCupSize = selectedCupSize === cupSize ? null : cupSize;
        onCupSizeChange?.(newCupSize);
    };
    return (
        <div className="w-full lg:w-64 lg:flex-shrink-0">
            <h3 className="text-lg font-bold mb-8 flex items-center justify-between">
                <span className="flex items-center gap-2">
                    <span className="text-sm font-normal text-[#37383c]/60 bg-gray-100 px-2 py-1 rounded">
                        {searchTerm ? `'${searchTerm}' 검색결과: ${resultCount}개` : `검색결과: ${resultCount}개`}
                    </span>
                </span>
            </h3>

            {/* 강도 필터 */}
            <div className="mb-8">
                <button
                    type="button"
                    onClick={() => setIsIntensityOpen(!isIntensityOpen)}
                    className="w-full flex justify-between items-center pb-4 border-b border-gray-200/70 mb-4"
                >
                    <span className="font-bold text-base">강도</span>
                    <ArrowIcon direction={isIntensityOpen ? "up" : "down"} title={isIntensityOpen ? "강도 필터 접기" : "강도 필터 펼치기"} />
                </button>
                {isIntensityOpen && (
                    <div className="flex flex-wrap gap-2">
                        {intensities.map(intensity => (
                            <FilterButton
                                key={intensity.id}
                                label={intensity.label}
                                isSelected={selectedIntensity === intensity.id}
                                onClick={() => handleIntensityClick(intensity.id)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* 컵 사이즈 필터 */}
            <div className="mb-8">
                <button
                    type="button"
                    onClick={() => setIsCupSizeOpen(!isCupSizeOpen)}
                    className="w-full flex justify-between items-center pb-4 border-b border-gray-200/70 mb-4"
                >
                    <span className="font-bold text-base">컵사이즈</span>
                    <ArrowIcon direction={isCupSizeOpen ? "up" : "down"} title={isCupSizeOpen ? "컵사이즈 필터 접기" : "컵사이즈 필터 펼치기"} />
                </button>
                {isCupSizeOpen && (
                    <div className="flex flex-wrap gap-2">
                        {cupSizes.map(cupSize => (
                            <FilterButton
                                key={cupSize.id}
                                label={cupSize.label}
                                isSelected={selectedCupSize === cupSize.id}
                                onClick={() => handleCupSizeClick(cupSize.id)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
});

export default SearchFilter;
