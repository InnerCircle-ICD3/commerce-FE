import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ImageUploader from './ImageUploader';
import { useState } from 'react';

// Zod 스키마 정의
const productSchema = z.object({
  name: z.string().min(1, '상품명은 필수입니다.'),
  price: z.number().positive('가격은 0보다 커야 합니다.'),
  quantity: z.number().min(0, '재고는 0 이상이어야 합니다.'),
  thumbnail: z.string().min(1, '썸네일 이미지를 업로드해주세요.'),
  detailImage: z.string().min(1, '상세 이미지를 업로드해주세요.'),
  intensity: z.string().optional(),
  cupSize: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function ProductCreateForm() {
  const [contextId, setContextId] = useState<string | undefined>();
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      quantity: 0,
      thumbnail: '',
      detailImage: '',
    },
  });

  // Register the fields manually
  register('thumbnail');
  register('detailImage');

  const onSubmit = (data: ProductFormData) => {
    console.log('Form submitted:', data);
    // 여기에 API 호출 로직 추가
  };

  const handleQuantityChange = (amount: number) => {
    const currentValue = getValues('quantity') || 0;
    const newValue = currentValue + amount;
    if (newValue >= 0) {
      setValue('quantity', newValue, { shouldValidate: true });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">상품명</label>
        <input
          id="name"
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="예: 에티오피아 예가체프"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">가격</label>
        <input
          id="price"
          type="number"
          {...register('price', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="예: 15000"
        />
        {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
      </div>

      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">재고 수량</label>
        <div className="mt-1 flex items-center rounded-md">
          <button
            type="button"
            onClick={() => handleQuantityChange(-1)}
            className="relative inline-flex items-center justify-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-sm font-medium text-gray-700 rounded-l-md hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            -
          </button>
          <input
            id="quantity"
            type="number"
            {...register('quantity', { valueAsNumber: true })}
            className="w-20 text-center border-t border-b border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="0"
          />
          <button
            type="button"
            onClick={() => handleQuantityChange(1)}
            className="relative inline-flex items-center justify-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-sm font-medium text-gray-700 rounded-r-md hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            +
          </button>
        </div>
        {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>}
      </div>

      <div>
        <ImageUploader
          label="썸네일 이미지"
          domainContext="THUMBNAIL"
          contextId={contextId}
          onUploadComplete={(key) => setValue('thumbnail', key, { shouldValidate: true })}
          onContextIdReceived={setContextId}
          onError={(error) => console.error('Thumbnail upload error:', error)}
        />
        {errors.thumbnail && <p className="mt-1 text-sm text-red-600">{errors.thumbnail.message}</p>}
      </div>

      <div>
        <ImageUploader
          label="상세 이미지"
          domainContext="DETAIL"
          contextId={contextId}
          onUploadComplete={(key) => setValue('detailImage', key, { shouldValidate: true })}
          onContextIdReceived={setContextId}
          onError={(error) => console.error('Detail image upload error:', error)}
        />
        {errors.detailImage && <p className="mt-1 text-sm text-red-600">{errors.detailImage.message}</p>}
      </div>

      <div>
        <label htmlFor="intensity" className="block text-sm font-medium text-gray-700">원두 강도</label>
        <input
          id="intensity"
          {...register('intensity')}
          className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="예: 중강배전"
        />
      </div>

      <div>
        <label htmlFor="cupSize" className="block text-sm font-medium text-gray-700">컵 사이즈</label>
        <input
          id="cupSize"
          {...register('cupSize')}
          className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="예: L"
        />
      </div>

      <div className="border-t pt-6 mt-6">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          등록하기
        </button>
      </div>
    </form>
  );
}
