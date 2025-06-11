import { createFileRoute } from '@tanstack/react-router';
import ProductCreateForm from '@/features/product/components/ProductCreateForm';

export const Route = createFileRoute('/_authenticated/products/new')({
  component: ProductCreatePage,
});

function ProductCreatePage() {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">상품 등록</h1>
        <p className="text-gray-600 mb-6">새로운 상품의 정보를 입력하고 등록하세요.</p>
        <ProductCreateForm />
      </div>
    </div>
  );
}

