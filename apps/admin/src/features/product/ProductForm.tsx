import { Button } from "@/shared/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Input } from "@/shared/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "@/shared/components/ui/use-toast";
import { createProduct, getIntensities, getCupSizes } from "./api";
import type { CreateProductDto } from "./api";
import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";

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
    cupSizeId: 0
  });
  
  // 에러 메시지 상태 관리
  const [errors, setErrors] = useState<Record<string, string>>({
    name: "",
    price: "",
    quantity: "",
    thumbnail: "",
    detailImage: "",
    intensityId: "",
    cupSizeId: ""
  });

  // 강도 카테고리 조회
  const { data: intensities = [] } = useQuery({
    queryKey: ['intensities'],
    queryFn: getIntensities,
  });

  // 컵 사이즈 카테고리 조회
  const { data: cupSizes = [] } = useQuery({
    queryKey: ['cupSizes'],
    queryFn: getCupSizes,
  });
  
  // 입력 필드 변경 핸들러
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: CreateProductDto) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number(value) : value
    }));
    
    // 에러 메시지 초기화
    if (errors[name]) {
      setErrors((prev: Record<string, string>) => ({ ...prev, [name]: "" }));
    }
  };
  
  // 셀렉트 필드 변경 핸들러
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev: CreateProductDto) => ({
      ...prev,
      [name]: Number(value)
    }));
    
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
    
    // 이미지 URL 검증
    if (!formData.thumbnail) {
      newErrors.thumbnail = "썸네일 이미지 URL을 입력해주세요.";
      isValid = false;
    }
    
    if (!formData.detailImage) {
      newErrors.detailImage = "상세 이미지 URL을 입력해주세요.";
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
      toast({
        title: "상품 등록 성공",
        description: "새 상품이 성공적으로 등록되었습니다."
      });
      navigate({ to: '/products' });
    },
    onError: (error) => {
      toast({
        title: "상품 등록 실패",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  
  // 폼 제출 핸들러
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      createProductMutation.mutate(formData);
    }
  };
  
  // 목록으로 돌아가기
  const handleBackToList = () => {
    navigate({ to: '/products' });
  };
  
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">상품 등록</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 상품명 입력 필드 */}
        <div className="space-y-1">
          <label htmlFor="name" className="block font-medium">상품명</label>
          <Input
            id="name"
            name="name"
            placeholder="상품명을 입력하세요"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        {/* 가격 입력 필드 */}
        <div className="space-y-1">
          <label htmlFor="price" className="block font-medium">가격</label>
          <Input
            type="number"
            id="price"
            name="price"
            placeholder="가격을 입력하세요"
            value={formData.price}
            onChange={handleChange}
            className={errors.price ? "border-red-500" : ""}
          />
          {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
        </div>

        {/* 재고 수량 입력 필드 */}
        <div className="space-y-1">
          <label htmlFor="quantity" className="block font-medium">재고 수량</label>
          <Input
            type="number"
            id="quantity"
            name="quantity"
            placeholder="재고 수량을 입력하세요"
            value={formData.quantity}
            onChange={handleChange}
            className={errors.quantity ? "border-red-500" : ""}
          />
          {errors.quantity && <p className="text-sm text-red-500">{errors.quantity}</p>}
        </div>

        {/* 썸네일 이미지 URL 입력 필드 */}
        <div className="space-y-1">
          <label htmlFor="thumbnail" className="block font-medium">썸네일 이미지 URL</label>
          <Input
            id="thumbnail"
            name="thumbnail"
            placeholder="썸네일 이미지 URL을 입력하세요"
            value={formData.thumbnail}
            onChange={handleChange}
            className={errors.thumbnail ? "border-red-500" : ""}
          />
          {errors.thumbnail && <p className="text-sm text-red-500">{errors.thumbnail}</p>}
        </div>

        {/* 상세 이미지 URL 입력 필드 */}
        <div className="space-y-1">
          <label htmlFor="detailImage" className="block font-medium">상세 이미지 URL</label>
          <Input
            id="detailImage"
            name="detailImage"
            placeholder="상세 이미지 URL을 입력하세요"
            value={formData.detailImage}
            onChange={handleChange}
            className={errors.detailImage ? "border-red-500" : ""}
          />
          {errors.detailImage && <p className="text-sm text-red-500">{errors.detailImage}</p>}
        </div>

        {/* 강도 선택 필드 */}
        <div className="space-y-1">
          <label htmlFor="intensityId" className="block font-medium">강도</label>
          <Select 
            onValueChange={(value) => handleSelectChange('intensityId', value)}
            value={formData.intensityId ? String(formData.intensityId) : undefined}
          >
            <SelectTrigger className={`w-full ${errors.intensityId ? "border-red-500" : ""}`}>
              <SelectValue placeholder="강도를 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {intensities.map((intensity) => (
                <SelectItem key={intensity.id} value={String(intensity.id)}>
                  {intensity.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.intensityId && <p className="text-sm text-red-500">{errors.intensityId}</p>}
        </div>

        {/* 컵 사이즈 선택 필드 */}
        <div className="space-y-1">
          <label htmlFor="cupSizeId" className="block font-medium">컵 사이즈</label>
          <Select 
            onValueChange={(value) => handleSelectChange('cupSizeId', value)}
            value={formData.cupSizeId ? String(formData.cupSizeId) : undefined}
          >
            <SelectTrigger className={`w-full ${errors.cupSizeId ? "border-red-500" : ""}`}>
              <SelectValue placeholder="컵 사이즈를 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {cupSizes.map((cupSize) => (
                <SelectItem key={cupSize.id} value={String(cupSize.id)}>
                  {cupSize.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.cupSizeId && <p className="text-sm text-red-500">{errors.cupSizeId}</p>}
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={createProductMutation.isPending}>등록</Button>
          <Button type="button" variant="outline" onClick={handleBackToList}>취소</Button>
        </div>
      </form>
    </div>
  );
}


