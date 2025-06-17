import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">상품을 찾을 수 없습니다</h2>
                <p className="text-gray-500 mb-8">요청하신 상품이 존재하지 않거나 삭제되었습니다.</p>
                <div className="space-x-4">
                    <Link href="/" className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                        홈으로 돌아가기
                    </Link>
                </div>
            </div>
        </div>
    );
}
