import { Button } from "@/shared/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

export default function ProductForm() {
  const navigate = useNavigate();
  
  // 목록으로 돌아가기
  const handleBackToList = () => {
    navigate({ to: '/products' });
  };
  
  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="space-y-2">
        <h1 className="text-h2 font-bold text-gray-900">상품 등록</h1>
        <p className="text-gray-600">새로운 상품을 등록하세요.</p>
      </div>

      {/* 여기에 폼 내용 추가 예정 */}
      <div className="p-6 border rounded-lg bg-white">
        <p className="text-center text-gray-500">상품 등록 폼이 이곳에 구현될 예정입니다.</p>
      </div>
      
      {/* 하단 버튼 */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={handleBackToList}>
          취소
        </Button>
        <Button disabled>
          등록하기
        </Button>
      </div>
    </div>
  );
}
