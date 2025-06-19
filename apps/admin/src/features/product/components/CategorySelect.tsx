import { useQuery } from "@tanstack/react-query";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";
import { Label } from "@/shared/components/ui/label";
import { getCategories, categoryQueryKeys, CodeResponse } from "@/features/product/api/categoryApi";

interface CategorySelectProps {
    selectedIntensityId?: string;
    selectedCupSizeId?: string;
    onIntensityChange: (intensityId: string) => void;
    onCupSizeChange: (cupSizeId: string) => void;
}

export default function CategorySelect({
    selectedIntensityId,
    selectedCupSizeId,
    onIntensityChange,
    onCupSizeChange,
}: CategorySelectProps) {
    const {
        data: categories,
        isLoading,
        error,
    } = useQuery({
        queryKey: categoryQueryKeys.list(),
        queryFn: getCategories,
        staleTime: 1000 * 60 * 5, // 5분 캐시
    });

    if (isLoading) {
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>강도 선택</Label>
                    <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
                </div>
                <div className="space-y-2">
                    <Label>컵사이즈 선택</Label>
                    <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-700">카테고리 정보를 불러오는 데 실패했습니다.</p>
                    <p className="text-sm text-red-600 mt-1">
                        {error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다."}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* 강도 선택 */}
            <div className="space-y-2">
                <Label htmlFor="intensity-select">
                    강도 선택 <span className="text-red-500">*</span>
                </Label>
                <Select
                    value={selectedIntensityId || ""}
                    onValueChange={onIntensityChange}
                >
                    <SelectTrigger id="intensity-select">
                        <SelectValue placeholder="강도를 선택해주세요 (1-9)" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories?.intensities.map((intensity: CodeResponse) => (
                            <SelectItem key={intensity.id} value={intensity.id}>
                                강도 {intensity.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {categories?.intensities.length === 0 && (
                    <p className="text-sm text-gray-500">등록된 강도 옵션이 없습니다.</p>
                )}
            </div>

            {/* 컵사이즈 선택 */}
            <div className="space-y-2">
                <Label htmlFor="cupsize-select">
                    컵사이즈 선택 <span className="text-red-500">*</span>
                </Label>
                <Select
                    value={selectedCupSizeId || ""}
                    onValueChange={onCupSizeChange}
                >
                    <SelectTrigger id="cupsize-select">
                        <SelectValue placeholder="컵사이즈를 선택해주세요" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories?.cupSizes.map((cupSize: CodeResponse) => (
                            <SelectItem key={cupSize.id} value={cupSize.id}>
                                {cupSize.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {categories?.cupSizes.length === 0 && (
                    <p className="text-sm text-gray-500">등록된 컵사이즈 옵션이 없습니다.</p>
                )}
            </div>
        </div>
    );
} 