import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { toast } from "@/shared/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { createProduct } from "./api";
import type { CreateProductDto } from "./api";
import ImageUpload from "./components/ImageUpload";
import CategorySelectEnum from "./components/CategorySelectEnum";
import { logger } from "@/shared/utils/logger";

// 숫자를 천 단위 콤마가 포함된 문자열로 변환
function formatPrice(value: number | string): string {
    const num = typeof value === 'string' ? value.replace(/,/g, '') : value.toString();
    return Number(num).toLocaleString('ko-KR');
}

// 콤마가 포함된 문자열을 숫자로 변환
function parsePrice(value: string): number {
    return Number(value.replace(/,/g, '')) || 0;
}

// 로컬스토리지 키
const DRAFT_STORAGE_KEY = "product_form_draft";

// 임시저장 데이터 타입
interface DraftData extends CreateProductDto {
    selectedIntensityId: string;
    selectedCupSizeId: string;
    priceDisplay: string;
}

// 로컬스토리지에 임시저장
function saveDraftToStorage(data: DraftData): void {
    try {
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        logger.error("임시저장 실패:", error);
    }
}

// 로컬스토리지에서 임시저장 데이터 가져오기
function getDraftFromStorage(): DraftData | null {
    try {
        const stored = localStorage.getItem(DRAFT_STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch (error) {
        logger.error("임시저장 데이터 읽기 실패:", error);
        return null;
    }
}

// 로컬스토리지에서 임시저장 데이터 삭제
function clearDraftFromStorage(): void {
    try {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch (error) {
        logger.error("임시저장 데이터 삭제 실패:", error);
    }
}

export default function ProductForm() {
    const navigate = useNavigate();

    // 상품 폼 상태 관리
    const [formData, setFormData] = useState<CreateProductDto>({
        name: "",
        price: 0,
        quantity: 0,
        thumbnail: "",
        detailImage: "",
        intensityId: 0,
        cupSizeId: 0,
    });

    // 카테고리 선택 상태 (string으로 관리)
    const [selectedIntensityId, setSelectedIntensityId] = useState<string>("");
    const [selectedCupSizeId, setSelectedCupSizeId] = useState<string>("");

    // 가격 표시용 상태 (포맷팅된 문자열)
    const [priceDisplay, setPriceDisplay] = useState<string>("0");

    // 이미지 업로드 상태 관리
    const [isThumbnailUploading, setIsThumbnailUploading] = useState(false);
    const [isDetailImageUploading, setIsDetailImageUploading] = useState(false);

    // 전체 업로드 상태
    const isAnyImageUploading = isThumbnailUploading || isDetailImageUploading;

    // 에러 메시지 상태 관리
    const [errors, setErrors] = useState<Record<string, string>>({
        name: "",
        price: "",
        quantity: "",
        thumbnail: "",
        detailImage: "",
        intensityId: "",
        cupSizeId: "",
    });

    // 재고 수량 모드 (true: 더하기, false: 빼기)
    const [isAddMode, setIsAddMode] = useState(true);

    // 임시저장 복원 확인 다이얼로그 상태
    const [showRestoreDialog, setShowRestoreDialog] = useState(false);
    const [draftData, setDraftData] = useState<DraftData | null>(null);

    // 페이지 로드 시 임시저장 데이터 확인
    useEffect(() => {
        const saved = getDraftFromStorage();
        if (saved) {
            setDraftData(saved);
            setShowRestoreDialog(true);
        }
    }, []);

    // 임시저장 데이터 복원
    const restoreDraftData = () => {
        if (draftData) {
            setFormData({
                name: draftData.name,
                price: draftData.price,
                quantity: draftData.quantity,
                thumbnail: draftData.thumbnail || "",
                detailImage: draftData.detailImage || "",
                intensityId: draftData.intensityId,
                cupSizeId: draftData.cupSizeId,
            });
            setSelectedIntensityId(draftData.selectedIntensityId);
            setSelectedCupSizeId(draftData.selectedCupSizeId);
            setPriceDisplay(draftData.priceDisplay);

            const imageCount = (draftData.thumbnail ? 1 : 0) + (draftData.detailImage ? 1 : 0);
            toast({
                title: "임시저장 데이터 복원",
                description: `이전에 작성하던 내용을 불러왔습니다.${imageCount > 0 ? ` (이미지 ${imageCount}개 포함)` : ''}`,
            });
        }
        setShowRestoreDialog(false);
    };

    // 임시저장 데이터 거부
    const rejectDraftData = () => {
        clearDraftFromStorage();
        setShowRestoreDialog(false);
    };

    // 현재 폼 데이터를 임시저장
    const handleSaveDraft = () => {
        const draftToSave: DraftData = {
            name: formData.name,
            price: formData.price,
            quantity: formData.quantity,
            thumbnail: formData.thumbnail,
            detailImage: formData.detailImage,
            intensityId: formData.intensityId,
            cupSizeId: formData.cupSizeId,
            selectedIntensityId,
            selectedCupSizeId,
            priceDisplay,
        };

        saveDraftToStorage(draftToSave);
        toast({
            title: "임시저장 완료",
            description: `작성 중인 내용이 임시저장되었습니다.${formData.thumbnail || formData.detailImage ? ' (이미지 URL 포함)' : ''}`,
        });
    };

    // 카테고리 변경 핸들러
    const handleIntensityChange = (intensityId: string) => {
        setSelectedIntensityId(intensityId);
        setFormData(prev => ({ ...prev, intensityId: Number(intensityId) }));

        // 에러 메시지 초기화
        if (errors.intensityId) {
            setErrors(prev => ({ ...prev, intensityId: "" }));
        }
    };

    const handleCupSizeChange = (cupSizeId: string) => {
        setSelectedCupSizeId(cupSizeId);
        setFormData(prev => ({ ...prev, cupSizeId: Number(cupSizeId) }));

        // 에러 메시지 초기화
        if (errors.cupSizeId) {
            setErrors(prev => ({ ...prev, cupSizeId: "" }));
        }
    };

    // 입력 필드 변경 핸들러
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "price") {
            // 가격 필드 특별 처리
            const numericValue = parsePrice(value);
            setFormData(prev => ({ ...prev, price: numericValue }));
            setPriceDisplay(formatPrice(numericValue));
        } else {
            setFormData((prev: CreateProductDto) => ({
                ...prev,
                [name]: name === "quantity" ? Number(value) : value,
            }));
        }

        // 에러 메시지 초기화
        if (errors[name]) {
            setErrors((prev: Record<string, string>) => ({ ...prev, [name]: "" }));
        }
    };



    // 폼 유효성 검사
    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        let isValid = true;

        // 상품명 검증
        if (!formData.name || formData.name.length < 2) {
            newErrors.name = "상품명은 2글자 이상이어야 합니다.";
            isValid = false;
        }

        // 가격 검증
        if (formData.price < 0) {
            newErrors.price = "가격은 0원 이상이어야 합니다.";
            isValid = false;
        }

        // 수량 검증
        if (formData.quantity < 0) {
            newErrors.quantity = "재고 수량은 0개 이상이어야 합니다.";
            isValid = false;
        }

        // 이미지 업로드 검증
        if (!formData.thumbnail) {
            newErrors.thumbnail = "썸네일 이미지를 업로드해주세요.";
            isValid = false;
        }

        if (!formData.detailImage) {
            newErrors.detailImage = "상세 이미지를 업로드해주세요.";
            isValid = false;
        }

        // 카테고리 검증
        if (!formData.intensityId) {
            newErrors.intensityId = "강도를 선택해주세요.";
            isValid = false;
        }

        if (!formData.cupSizeId) {
            newErrors.cupSizeId = "컵 사이즈를 선택해주세요.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // 상품 등록 뮤테이션
    const createProductMutation = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            // 성공 시 임시저장 데이터 삭제
            clearDraftFromStorage();
            toast({
                title: "상품 등록 성공",
                description: "새 상품이 성공적으로 등록되었습니다.",
            });
            navigate({ to: "/products" });
        },
        onError: error => {
            toast({
                title: "상품 등록 실패",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    // 폼 제출 핸들러
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // 이미지 업로드 중인 경우 제출 방지
        if (isAnyImageUploading) {
            toast({
                title: "업로드 진행 중",
                description: "이미지 업로드가 완료될 때까지 기다려주세요.",
                variant: "destructive",
            });
            return;
        }

        if (validateForm()) {
            createProductMutation.mutate(formData);
        }
    };

    // 목록으로 돌아가기
    const handleBackToList = () => {
        navigate({ to: "/products" });
    };

    return (
        <div className="px-4 py-8 sm:px-6 lg:px-8 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">상품 등록</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* 상품명 입력 필드 */}
                <div className="space-y-1">
                    <label htmlFor="name" className="block font-medium">
                        상품명
                    </label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="상품명을 입력하세요"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full ${errors.name ? "border-red-500" : ""}`}
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                {/* 가격 입력 필드 */}
                <div className="space-y-1">
                    <label htmlFor="price" className="block font-medium">
                        가격
                    </label>
                    <div className="relative w-full">
                        <Input
                            type="text"
                            id="price"
                            name="price"
                            placeholder="가격을 입력하세요"
                            value={priceDisplay}
                            onChange={handleChange}
                            className={`w-full pr-10 text-right ${errors.price ? "border-red-500" : ""}`}
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500">원</span>
                    </div>
                    {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
                </div>

                {/* 재고 수량 입력 필드 */}
                <div className="space-y-1">
                    <label htmlFor="quantity" className="block font-medium">
                        재고 수량
                    </label>
                    <div className="flex gap-2 w-full">
                        <Input
                            type="number"
                            id="quantity"
                            name="quantity"
                            placeholder="재고 수량을 입력하세요"
                            value={formData.quantity}
                            onChange={handleChange}
                            className={`flex-1 text-right [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${errors.quantity ? "border-red-500" : ""}`}
                            min="0"
                        />
                        <div className="flex gap-2">
                            {/* 모드 선택 버튼 그룹 */}
                            <div className="flex gap-1 border rounded-md p-1 bg-gray-50">
                                <Button
                                    type="button"
                                    variant={isAddMode ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setIsAddMode(true)}
                                    className="h-8 px-3 text-sm"
                                >
                                    +
                                </Button>
                                <Button
                                    type="button"
                                    variant={!isAddMode ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setIsAddMode(false)}
                                    className="h-8 px-3 text-sm"
                                >
                                    -
                                </Button>
                            </div>

                            {/* 숫자 버튼들 */}
                            <div className="flex gap-1">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        const currentValue = Number(formData.quantity) || 0;
                                        const newValue = isAddMode ? currentValue + 10 : Math.max(0, currentValue - 10);
                                        setFormData(prev => ({ ...prev, quantity: newValue }));
                                    }}
                                    className="h-10 px-3 text-sm"
                                >
                                    10
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        const currentValue = Number(formData.quantity) || 0;
                                        const newValue = isAddMode ? currentValue + 100 : Math.max(0, currentValue - 100);
                                        setFormData(prev => ({ ...prev, quantity: newValue }));
                                    }}
                                    className="h-10 px-3 text-sm"
                                >
                                    100
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        const currentValue = Number(formData.quantity) || 0;
                                        const newValue = isAddMode ? currentValue + 1000 : Math.max(0, currentValue - 1000);
                                        setFormData(prev => ({ ...prev, quantity: newValue }));
                                    }}
                                    className="h-10 px-3 text-sm"
                                >
                                    1000
                                </Button>
                            </div>
                        </div>
                    </div>
                    {errors.quantity && <p className="text-sm text-red-500">{errors.quantity}</p>}
                </div>

                {/* 썸네일 이미지 업로드 */}
                <div className="space-y-1">
                    <ImageUpload
                        imageType="thumbnail"
                        label="썸네일 이미지"
                        currentImageUrl={formData.thumbnail}
                        onImageUploaded={imageUrl => {
                            setFormData(prev => ({ ...prev, thumbnail: imageUrl }));
                            // 에러 메시지 초기화
                            if (errors.thumbnail) {
                                setErrors(prev => ({ ...prev, thumbnail: "" }));
                            }
                        }}
                        onImageRemoved={() => {
                            setFormData(prev => ({ ...prev, thumbnail: "" }));
                        }}
                        onUploadStateChange={setIsThumbnailUploading}
                    />
                    {errors.thumbnail && <p className="text-sm text-red-500">{errors.thumbnail}</p>}
                </div>

                {/* 상세 이미지 업로드 */}
                <div className="space-y-1">
                    <ImageUpload
                        imageType="detail"
                        label="상세 이미지"
                        currentImageUrl={formData.detailImage}
                        onImageUploaded={imageUrl => {
                            setFormData(prev => ({ ...prev, detailImage: imageUrl }));
                            // 에러 메시지 초기화
                            if (errors.detailImage) {
                                setErrors(prev => ({ ...prev, detailImage: "" }));
                            }
                        }}
                        onImageRemoved={() => {
                            setFormData(prev => ({ ...prev, detailImage: "" }));
                        }}
                        onUploadStateChange={setIsDetailImageUploading}
                    />
                    {errors.detailImage && <p className="text-sm text-red-500">{errors.detailImage}</p>}
                </div>

                {/* 카테고리 선택 (강도, 컵사이즈) */}
                <div className="space-y-1">
                    <CategorySelectEnum
                        selectedIntensityId={selectedIntensityId}
                        selectedCupSizeId={selectedCupSizeId}
                        onIntensityChange={handleIntensityChange}
                        onCupSizeChange={handleCupSizeChange}
                    />
                    {(errors.intensityId || errors.cupSizeId) && (
                        <div className="space-y-1">
                            {errors.intensityId && <p className="text-sm text-red-500">{errors.intensityId}</p>}
                            {errors.cupSizeId && <p className="text-sm text-red-500">{errors.cupSizeId}</p>}
                        </div>
                    )}
                </div>

                <div className="flex gap-4 pt-4">
                    <Button
                        type="submit"
                        disabled={createProductMutation.isPending || isAnyImageUploading}
                    >
                        {isAnyImageUploading ? "이미지 업로드 중..." : createProductMutation.isPending ? "등록 중..." : "등록"}
                    </Button>
                    <Button type="button" variant="outline" onClick={handleSaveDraft}>
                        임시저장
                    </Button>
                    <Button type="button" variant="outline" onClick={handleBackToList}>
                        취소
                    </Button>
                </div>
            </form>

            {/* 임시저장 복원 확인 다이얼로그 */}
            {showRestoreDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold mb-2">임시저장 데이터 발견</h3>
                        <p className="text-gray-600 mb-6">
                            이전에 작성하던 상품 정보가 있습니다. 불러오시겠습니까?
                        </p>
                        <div className="flex gap-3 justify-end">
                            <Button variant="outline" onClick={rejectDraftData}>
                                아니오
                            </Button>
                            <Button onClick={restoreDraftData}>
                                예
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
