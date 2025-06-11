import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table/table";
import type { Product } from "@/features/product/types";

interface ProductListProps {
  products: Product[];
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export default function ProductList({ products, onDelete, onToggleStatus }: ProductListProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <Table>
        <TableCaption>총 {products.length}개의 상품이 있습니다.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">상품 ID</TableHead>
            <TableHead>상품명</TableHead>
            <TableHead>카테고리</TableHead>
            <TableHead className="text-right">가격</TableHead>
            <TableHead className="text-right">재고</TableHead>
            <TableHead>상태</TableHead>
            <TableHead>최근 수정일</TableHead>
            <TableHead className="text-right">관리</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map(product => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className="text-right">₩{product.price.toLocaleString()}</TableCell>
              <TableCell className="text-right">
                <span className={product.stock < 10 ? "text-red-600 font-medium" : ""}>{product.stock}</span>
              </TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    product.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {product.status === "active" ? "판매 중" : "판매 중지"}
                </span>
              </TableCell>
              <TableCell>{product.updatedAt}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => onToggleStatus(product.id)}
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  >
                    {product.status === "active" ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <title>비활성화</title>
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <title>활성화</title>
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                  <button type="button" className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <title>편집</title>
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(product.id)}
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <title>삭제</title>
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
