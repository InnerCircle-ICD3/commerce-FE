

export default function ProductFilters() {
  return (
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
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
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
  );
}
