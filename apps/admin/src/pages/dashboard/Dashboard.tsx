export default function DashboardPage() {
    // 샘플 데이터
    const stats = [
        { name: "총 매출", value: "₩12,345,678", change: "+12.3%", status: "increase" },
        { name: "주문 수", value: "432", change: "+5.6%", status: "increase" },
        { name: "방문자 수", value: "1,234", change: "-2.5%", status: "decrease" },
        { name: "상품 수", value: "58", change: "0%", status: "neutral" },
    ];

    const recentOrders = [
        { id: "ORD-1234", customer: "김민수", date: "2025-05-31", amount: "₩45,000", status: "배송 완료" },
        { id: "ORD-1233", customer: "이지연", date: "2025-05-30", amount: "₩78,000", status: "배송 중" },
        { id: "ORD-1232", customer: "박준호", date: "2025-05-30", amount: "₩32,500", status: "결제 완료" },
        { id: "ORD-1231", customer: "최서연", date: "2025-05-29", amount: "₩120,000", status: "배송 중" },
        { id: "ORD-1230", customer: "정다운", date: "2025-05-29", amount: "₩67,800", status: "배송 완료" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-h2 font-bold text-gray-900">대시보드</h1>
                <p className="mt-2 text-gray-600">전체 매출 및 주문 현황을 확인하세요.</p>
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map(stat => (
                    <div key={stat.name} className="bg-white rounded-lg shadow p-6">
                        <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                        <p className="mt-2 text-h3 font-semibold text-gray-900">{stat.value}</p>
                        <div className="mt-2 flex items-center">
                            {stat.status === "increase" ? (
                                <span className="text-green-600 text-sm flex items-center">
                                    <svg
                                        className="w-4 h-4 mr-1"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <title>상승 화살표</title>
                                        <path
                                            fillRule="evenodd"
                                            d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {stat.change}
                                </span>
                            ) : stat.status === "decrease" ? (
                                <span className="text-red-600 text-sm flex items-center">
                                    <svg
                                        className="w-4 h-4 mr-1"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <title>하락 화살표</title>
                                        <path
                                            fillRule="evenodd"
                                            d="M12 13a1 1 0 110 2H7a1 1 0 01-1-1v-5a1 1 0 112 0v2.586l4.293-4.293a1 1 0 011.414 0L16 9.586 20.293 5.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0L12 8.414l-3.293 3.293A1 1 0 018 12H5.414L6.707 13.293A1 1 0 0112 13z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {stat.change}
                                </span>
                            ) : (
                                <span className="text-gray-600 text-sm">{stat.change}</span>
                            )}
                            <span className="text-gray-500 text-sm ml-2">전월 대비</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* 최근 주문 */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                    <h3 className="text-h4 font-semibold text-gray-900">최근 주문</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    주문 번호
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    고객
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    날짜
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    금액
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    상태
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    작업
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {recentOrders.map(order => (
                                <tr key={order.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{order.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.amount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                order.status === "배송 완료"
                                                    ? "bg-green-100 text-green-800"
                                                    : order.status === "배송 중"
                                                      ? "bg-blue-100 text-blue-800"
                                                      : "bg-yellow-100 text-yellow-800"
                                            }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button type="button" className="text-blue-600 hover:text-blue-900">
                                            보기
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                    <button type="button" className="text-sm text-blue-600 hover:text-blue-900 font-medium">
                        모든 주문 보기 →
                    </button>
                </div>
            </div>

            {/* 판매 현황 및 알림 섹션 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 인기 상품 */}
                <div className="bg-white shadow rounded-lg overflow-hidden lg:col-span-2">
                    <div className="px-6 py-5 border-b border-gray-200">
                        <h3 className="text-h4 font-semibold text-gray-900">인기 상품</h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {[
                                { name: "유기농 아보카도", sold: 52, stock: 48, percentage: 65 },
                                { name: "제주 감귤 2kg", sold: 43, stock: 22, percentage: 80 },
                                { name: "국내산 한우 1++", sold: 38, stock: 5, percentage: 95 },
                                { name: "친환경 당근", sold: 32, stock: 120, percentage: 45 },
                            ].map(product => (
                                <div key={product.name} className="flex items-center">
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                                        <div className="flex items-center text-xs text-gray-500 mt-1">
                                            <span>{product.sold}개 판매</span>
                                            <span className="mx-2">•</span>
                                            <span>재고 {product.stock}개</span>
                                        </div>
                                    </div>
                                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${product.percentage}%` }} />
                                    </div>
                                    <span className="ml-3 text-sm font-medium text-gray-700">{product.percentage}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 최근 알림 */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-200">
                        <h3 className="text-h4 font-semibold text-gray-900">최근 알림</h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {[
                            { id: "notif-1", message: "새로운 주문이 3건 들어왔습니다.", time: "10분 전" },
                            { id: "notif-2", message: "재고가 5개 미만인 상품이 2개 있습니다.", time: "1시간 전" },
                            { id: "notif-3", message: "김민수 고객이 상품 문의를 남겼습니다.", time: "3시간 전" },
                            { id: "notif-4", message: "5월 판매 리포트가 준비되었습니다.", time: "어제" },
                            { id: "notif-5", message: "시스템 업데이트가 완료되었습니다.", time: "2일 전" },
                        ].map(notification => (
                            <div key={notification.id} className="px-6 py-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg
                                            className="h-5 w-5 text-blue-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <title>알림 아이콘</title>
                                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                        </svg>
                                    </div>
                                    <div className="ml-3 w-0 flex-1">
                                        <p className="text-sm text-gray-900">{notification.message}</p>
                                        <p className="mt-1 text-xs text-gray-500">{notification.time}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                        <button type="button" className="text-sm text-blue-600 hover:text-blue-900 font-medium">
                            모든 알림 보기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
