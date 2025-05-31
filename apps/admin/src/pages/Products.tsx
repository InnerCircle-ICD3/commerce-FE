import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table/table';

// 상품 타입 정의
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
  updatedAt: string;
}

export default function ProductsPage() {
  // 가상의 상품 데이터
  const [products, setProducts] = useState<Product[]>([
    {
      id: 'PROD-001',
      name: '유기농 아보카도',
      category: '과일/채소',
      price: 3900,
      stock: 48,
      status: 'active',
      updatedAt: '2025-05-28',
    },
    {
      id: 'PROD-002',
      name: '제주 감귤 2kg',
      category: '과일/채소',
      price: 12800,
      stock: 22,
      status: 'active',
      updatedAt: '2025-05-29',
    },
    {
      id: 'PROD-003',
      name: '국내산 한우 1++',
      category: '정육/계란',
      price: 32000,
      stock: 5,
      status: 'active',
      updatedAt: '2025-05-30',
    },
    {
      id: 'PROD-004',
      name: '친환경 당근',
      category: '과일/채소',
      price: 4500,
      stock: 120,
      status: 'active',
      updatedAt: '2025-05-30',
    },
    {
      id: 'PROD-005',
      name: '통밀빵',
      category: '베이커리',
      price: 5800,
      stock: 35,
      status: 'active',
      updatedAt: '2025-05-30',
    },
    {
      id: 'PROD-006',
      name: '유기농 우유',
      category: '유제품',
      price: 4200,
      stock: 42,
      status: 'active',
      updatedAt: '2025-05-31',
    },
    {
      id: 'PROD-007',
      name: '고급 수입 치즈',
      category: '유제품',
      price: 18500,
      stock: 12,
      status: 'active',
      updatedAt: '2025-05-31',
    },
    {
      id: 'PROD-008',
      name: '동결건조 과일 세트',
      category: '간식',
      price: 24000,
      stock: 8,
      status: 'inactive',
      updatedAt: '2025-05-25',
    },
    {
      id: 'PROD-009',
      name: '유기농 사과즙',
      category: '음료',
      price: 7500,
      stock: 28,
      status: 'active',
      updatedAt: '2025-05-29',
    },
    {
      id: 'PROD-010',
      name: '수입 아몬드',
      category: '견과류',
      price: 12000,
      stock: 18,
      status: 'active',
      updatedAt: '2025-05-30',
    },
  ]);

  // 상품 삭제 기능
  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  // 상품 상태 변경 기능
  const handleToggleStatus = (productId: string) => {
    setProducts(
      products.map(product => 
        product.id === productId
          ? { ...product, status: product.status === 'active' ? 'inactive' : 'active' }
          : product
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h2 font-bold text-gray-900">상품 관리</h1>
          <p className="mt-2 text-gray-600">상품 목록을 확인하고 관리하세요.</p>
        </div>
        <button 
          type="button" 
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          + 상품 추가
        </button>
      </div>

      {/* 필터링 및 검색 UI */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-wrap gap-4">
          {/* 검색 */}
          <div className="flex-1 min-w-[240px]">
            <div className="relative">
              <input 
                type="text"
                placeholder="상품명 또는 ID 검색"
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" 
                viewBox="0 0 20 20" 
                fill="currentColor"
                aria-hidden="true"
              >
                <title>검색</title>
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* 카테고리 필터 */}
          <div className="w-auto">
            <select className="rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">모든 카테고리</option>
              <option value="과일/채소">과일/채소</option>
              <option value="정육/계란">정육/계란</option>
              <option value="유제품">유제품</option>
              <option value="베이커리">베이커리</option>
              <option value="간식">간식</option>
              <option value="음료">음료</option>
              <option value="견과류">견과류</option>
            </select>
          </div>

          {/* 상태 필터 */}
          <div className="w-auto">
            <select className="rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">모든 상태</option>
              <option value="active">판매 중</option>
              <option value="inactive">판매 중지</option>
            </select>
          </div>
        </div>
      </div>

      {/* 상품 테이블 */}
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
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-right">₩{product.price.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <span className={product.stock < 10 ? 'text-red-600 font-medium' : ''}>
                    {product.stock}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    product.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {product.status === 'active' ? '판매 중' : '판매 중지'}
                  </span>
                </TableCell>
                <TableCell>{product.updatedAt}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <button 
                      type="button"
                      onClick={() => handleToggleStatus(product.id)}
                      className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                    >
                      {product.status === 'active' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <title>비활성화</title>
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <title>활성화</title>
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
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
                      onClick={() => handleDeleteProduct(product.id)}
                      className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <title>삭제</title>
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          10개 항목 중 1-10 표시
        </div>
        <nav className="flex space-x-1">
          <button type="button" className="px-2 py-1 text-sm rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
            이전
          </button>
          <button type="button" className="px-3 py-1 text-sm rounded-md border border-gray-300 bg-blue-600 text-white">
            1
          </button>
          <button type="button" className="px-3 py-1 text-sm rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
            2
          </button>
          <button type="button" className="px-3 py-1 text-sm rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
            3
          </button>
          <button type="button" className="px-2 py-1 text-sm rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
            다음
          </button>
        </nav>
      </div>
    </div>
  );
}
