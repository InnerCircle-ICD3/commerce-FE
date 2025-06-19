import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { toast } from "@/shared/components/ui/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { getAdminProductById, updateProduct, getIntensities, getCupSizes } from "./api";
import type { UpdateProductDto } from "./api";
import ImageUpload from "./components/ImageUpload";
import CategorySelectEnum from "./components/CategorySelectEnum";
import { logger } from "@/shared/utils/logger";

// 숫자를 천 단위 콤마가 포함된 문자열로 변환
function formatPrice(value: number | string): string {
    const num = typeof value === 'string' ? value.replace(/,/g, '') : value.toString();
    return Number(num).toLocaleString('ko-KR');
}

// 콤마가 포함된 가격 문자열을 숫자로 변환
function parsePrice(value: string): number {
    const cleanValue = value.replace(/,/g, '');
    const parsed = Number(cleanValue);
    return isNaN(parsed) ? 0 : parsed;
}

export default function ProductEditForm() {
    const navigate = useNavigate();
    const { productId } = useParams({ from: "/_authenticated/products/$productId/edit" });

    // 상품 정보 조회
    const { data: product, isLoading, error } = useQuery({
        queryKey: ["admin-product", productId],
        queryFn: () => getAdminProductById(Number(productId)),
    });

    // 상품 폼 상태 관리
    const [formData, setFormData] = useState<UpdateProductDto>({
        name: "",
        price: 0,
        quantity: 0,
        thumbnail: "",
        detailImage: "",
        intensityId: 0,
        cupSizeId: 0,
        status: "ON_SALE",
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
    const [errors, setErrors] = useState<Record<string, string>>({});

    // 재고 수량 모드 (true: 더하기, false: 빼기)
    const [isAddMode, setIsAddMode] = useState(true);

    // 상품 수정 뮤테이션 (Hook은 최상단에 배치)
    const updateProductMutation = useMutation({
        mutationFn: (data: UpdateProductDto) => updateProduct(Number(productId), data),
        onSuccess: () => {
            toast({
                title: "상품 수정 성공",
                description: "상품이 성공적으로 수정되었습니다.",
            });
            navigate({ to: "/products" });
        },
        onError: error => {
            logger.error("상품 수정 실패:", error);
            toast({
                title: "상품 수정 실패",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    // 상품 데이터 로드 시 폼 데이터 초기화
    useEffect(() => {
        if (product) {
            // 카테고리 ID를 찾기 위해 카테고리 데이터 조회
            Promise.all([getIntensities(), getCupSizes()]).then(([intensities, cupSizes]) => {
                const intensity = intensities.find(i => i.name === product.intensity);
                const cupSize = cupSizes.find(c => c.name === product.cupSize);

                setFormData({
                    name: product.name,
                    price: product.price,
                    quantity: product.quantity,
                    thumbnail: product.thumbnail,
                    detailImage: product.detailImage,
                    intensityId: intensity?.id || 0,
                    cupSizeId: cupSize?.id || 0,
                    status: product.status,
                });

                setSelectedIntensityId(intensity?.id.toString() || "");
                setSelectedCupSizeId(cupSize?.id.toString() || "");
                setPriceDisplay(formatPrice(product.price));
            });
        }
    }, [product]);

    // 로딩 상태
    if (isLoading) {
        return (
            <div className="px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg">상품 정보를 불러오는 중...</div>
                </div>
            </div>
        );
    }

    // 에러 상태
    if (error) {
        return (
            <div className="px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col justify-center items-center h-64 space-y-4">
                    <div className="text-lg text-red-500">상품 정보를 불러오는데 실패했습니다.</div>
                    <Button onClick={() => navigate({ to: "/products" })}>목록으로 돌아가기</Button>
                </div>
            </div>
        );
    }

    // 수량 조절 핸들러들
    const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setFormData(prev => ({ ...prev, quantity: Math.max(0, value) }));
        if (errors.quantity) {
            setErrors(prev => ({ ...prev, quantity: "" }));
        }
    };

    const handleQuantityAdjust = (amount: number) => {
        setFormData(prev => {
            const newQuantity = isAddMode
                ? prev.quantity + amount
                : Math.max(0, prev.quantity - amount);
            return { ...prev, quantity: newQuantity };
        });
        if (errors.quantity) {
            setErrors(prev => ({ ...prev, quantity: "" }));
        }
    };

    // 카테고리 변경 핸들러
    const handleIntensityChange = (intensityId: string) => {
        setSelectedIntensityId(intensityId);
        setFormData(prev => ({ ...prev, intensityId: Number(intensityId) }));

        if (errors.intensityId) {
            setErrors(prev => ({ ...prev, intensityId: "" }));
        }
    };

    const handleCupSizeChange = (cupSizeId: string) => {
        setSelectedCupSizeId(cupSizeId);
        setFormData(prev => ({ ...prev, cupSizeId: Number(cupSizeId) }));

        if (errors.cupSizeId) {
            setErrors(prev => ({ ...prev, cupSizeId: "" }));
        }
    };

    // 입력 필드 변경 핸들러
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "price") {
            const numericValue = parsePrice(value);
            setFormData(prev => ({ ...prev, price: numericValue }));
            setPriceDisplay(formatPrice(numericValue));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: name === "quantity" ? Number(value) : value,
            }));
        }

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    // 상태 변경 핸들러
    const handleStatusChange = (status: string) => {
        setFormData(prev => ({ ...prev, status: status as "ON_SALE" | "UNAVAILABLE" }));
    };

    // 이미지 업로드 완료 핸들러
    const handleThumbnailUpload = (imageUrl: string) => {
        setFormData(prev => ({ ...prev, thumbnail: imageUrl }));
        if (errors.thumbnail) {
            setErrors(prev => ({ ...prev, thumbnail: "" }));
        }
    };

    const handleDetailImageUpload = (imageUrl: string) => {
        setFormData(prev => ({ ...prev, detailImage: imageUrl }));
        if (errors.detailImage) {
            setErrors(prev => ({ ...prev, detailImage: "" }));
        }
    };

    // 폼 유효성 검사
    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        let isValid = true;

        if (!formData.name || formData.name.length < 2) {
            newErrors.name = "상품명은 2글자 이상이어야 합니다.";
            isValid = false;
        }

        if (formData.price < 0) {
            newErrors.price = "가격은 0원 이상이어야 합니다.";
            isValid = false;
        }

        if (formData.quantity < 0) {
            newErrors.quantity = "재고 수량은 0개 이상이어야 합니다.";
            isValid = false;
        }

        if (!formData.thumbnail) {
            newErrors.thumbnail = "썸네일 이미지를 업로드해주세요.";
            isValid = false;
        }

        if (!formData.detailImage) {
            newErrors.detailImage = "상세 이미지를 업로드해주세요.";
            isValid = false;
        }

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



    // 폼 제출 핸들러
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (isAnyImageUploading) {
            toast({
                title: "업로드 진행 중",
                description: "이미지 업로드가 완료될 때까지 기다려주세요.",
                variant: "destructive",
            });
            return;
        }

        if (validateForm()) {
            logger.debug("상품 수정 데이터:", formData);
            updateProductMutation.mutate(formData);
        }
    };

    // 목록으로 돌아가기
    const handleBackToList = () => {
        navigate({ to: "/products" });
    };

    return (
        <div className="px-4 py-8 sm:px-6 lg:px-8 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">상품 수정</h1>
                <Button variant="outline" onClick={handleBackToList}>
                    목록으로
                </Button>
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
                            onChange={handleQuantityChange}
                            className={`flex-1 text-right [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${errors.quantity ? "border-red-500" : ""}`}
                            min="0"
                        />

                        {/* 수량 조절 버튼들 */}
                        <div className="flex gap-1">
                            {/* +/- 모드 토글 버튼 */}
                            <Button
                                type="button"
                                variant={isAddMode ? "default" : "outline"}
                                size="sm"
                                className="h-10 px-3"
                                onClick={() => setIsAddMode(true)}
                            >
                                +
                            </Button>
                            <Button
                                type="button"
                                variant={!isAddMode ? "default" : "outline"}
                                size="sm"
                                className="h-10 px-3"
                                onClick={() => setIsAddMode(false)}
                            >
                                -
                            </Button>
                        </div>

                        {/* 수량 조절 버튼들 */}
                        <div className="flex gap-1">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="h-10 px-2"
                                onClick={() => handleQuantityAdjust(1)}
                            >
                                1
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="h-10 px-2"
                                onClick={() => handleQuantityAdjust(10)}
                            >
                                10
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="h-10 px-2"
                                onClick={() => handleQuantityAdjust(100)}
                            >
                                100
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="h-10 px-2"
                                onClick={() => handleQuantityAdjust(1000)}
                            >
                                1000
                            </Button>
                        </div>
                    </div>
                    {errors.quantity && <p className="text-sm text-red-500">{errors.quantity}</p>}
                </div>

                {/* 판매 상태 선택 */}
                <div className="space-y-1">
                    <label htmlFor="status" className="block font-medium">
                        판매 상태
                    </label>
                    <Select value={formData.status} onValueChange={handleStatusChange}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="판매 상태를 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ON_SALE">판매중</SelectItem>
                            <SelectItem value="UNAVAILABLE">판매중지</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* 카테고리 선택 */}
                <CategorySelectEnum
                    selectedIntensityId={selectedIntensityId}
                    selectedCupSizeId={selectedCupSizeId}
                    onIntensityChange={handleIntensityChange}
                    onCupSizeChange={handleCupSizeChange}
                    errors={{ intensityId: errors.intensityId, cupSizeId: errors.cupSizeId }}
                />

                {/* 이미지 업로드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ImageUpload
                        label="썸네일 이미지"
                        imageType="thumbnail"
                        currentImageUrl={formData.thumbnail}
                        onImageUploaded={handleThumbnailUpload}
                        onUploadComplete={handleThumbnailUpload}
                        onUploadStart={() => setIsThumbnailUploading(true)}
                        onUploadEnd={() => setIsThumbnailUploading(false)}
                        error={errors.thumbnail}
                    />
                    <ImageUpload
                        label="상세 이미지"
                        imageType="detail"
                        currentImageUrl={formData.detailImage}
                        onImageUploaded={handleDetailImageUpload}
                        onUploadComplete={handleDetailImageUpload}
                        onUploadStart={() => setIsDetailImageUploading(true)}
                        onUploadEnd={() => setIsDetailImageUploading(false)}
                        error={errors.detailImage}
                    />
                </div>

                {/* 제출 버튼 */}
                <div className="flex gap-2 pt-4">
                    <Button
                        type="submit"
                        disabled={updateProductMutation.isPending || isAnyImageUploading}
                        className="flex-1"
                    >
                        {updateProductMutation.isPending ? "수정 중..." : "상품 수정"}
                    </Button>
                    <Button type="button" variant="outline" onClick={handleBackToList}>
                        취소
                    </Button>
                </div>
            </form>
        </div>
    );
} 