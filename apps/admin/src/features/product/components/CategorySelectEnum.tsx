import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";
import { Label } from "@/shared/components/ui/label";
import { cupSizeOptions, intensityOptions, type SelectOption } from "../types/categoryTypes";

interface CategorySelectEnumProps {
    selectedIntensityId?: string;
    selectedCupSizeId?: string;
    onIntensityChange: (intensityId: string) => void;
    onCupSizeChange: (cupSizeId: string) => void;
}

export default function CategorySelectEnum({
    selectedIntensityId,
    selectedCupSizeId,
    onIntensityChange,
    onCupSizeChange,
}: CategorySelectEnumProps) {
    // 유효한 옵션들만 필터링 (빈 값 제거)
    const validIntensityOptions = intensityOptions.filter(option => option.id && option.id.trim() !== '');
    const validCupSizeOptions = cupSizeOptions.filter(option => option.id && option.id.trim() !== '');

    return (
        <div className="space-y-4">
            {/* 강도 선택 */}
            <div className="space-y-2">
                <Label htmlFor="intensity-select">
                    강도 선택 <span className="text-red-500">*</span>
                </Label>
                <Select
                    value={selectedIntensityId && selectedIntensityId.trim() !== '' ? selectedIntensityId : undefined}
                    onValueChange={onIntensityChange}
                >
                    <SelectTrigger id="intensity-select">
                        <SelectValue placeholder="강도를 선택해주세요 (1-9)" />
                    </SelectTrigger>
                    <SelectContent>
                        {validIntensityOptions.map((intensity: SelectOption) => (
                            <SelectItem key={intensity.id} value={intensity.id}>
                                {intensity.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* 컵사이즈 선택 */}
            <div className="space-y-2">
                <Label htmlFor="cupsize-select">
                    컵사이즈 선택 <span className="text-red-500">*</span>
                </Label>
                <Select
                    value={selectedCupSizeId && selectedCupSizeId.trim() !== '' ? selectedCupSizeId : undefined}
                    onValueChange={onCupSizeChange}
                >
                    <SelectTrigger id="cupsize-select">
                        <SelectValue placeholder="컵사이즈를 선택해주세요" />
                    </SelectTrigger>
                    <SelectContent>
                        {validCupSizeOptions.map((cupSize: SelectOption) => (
                            <SelectItem key={cupSize.id} value={cupSize.id}>
                                {cupSize.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
} 