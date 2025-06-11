import { Link } from "@tanstack/react-router";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="text-center">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-gray-900">404</h1>
                    <div className="relative">
                        <div className="h-px w-full bg-gray-300 absolute top-8" />
                        <p className="text-2xl font-medium text-gray-800 bg-gray-50 relative inline-block px-4">페이지를 찾을 수 없습니다</p>
                    </div>
                </div>

                <div className="text-gray-600 mb-8">
                    <p className="mb-4">요청하신 페이지가 존재하지 않거나, 이동되었거나, 삭제되었을 수 있습니다.</p>
                    <p>올바른 URL을 입력했는지 확인하거나 아래 버튼을 클릭하여 홈페이지로 돌아가세요.</p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/" className="bg-gray-600 hover:bg-gray-700 text-white py-2.5 px-5 rounded-md font-medium transition-colors">
                        홈으로 돌아가기
                    </Link>
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="border border-gray-300 hover:bg-gray-100 text-gray-700 py-2.5 px-5 rounded-md font-medium transition-colors"
                    >
                        이전 페이지로
                    </button>
                </div>
            </div>

            {/* 장식용 요소 - 상단 */}
            <div className="absolute top-12 left-12 w-24 h-24 border-t-4 border-l-4 border-blue-600 opacity-20" />
            <div className="absolute bottom-12 right-12 w-24 h-24 border-b-4 border-r-4 border-blue-600 opacity-20" />

            {/* 장식용 원형 요소들 */}
            <div className="absolute top-1/4 right-16 w-4 h-4 rounded-full bg-yellow-400 opacity-70" />
            <div className="absolute bottom-1/4 left-16 w-6 h-6 rounded-full bg-blue-400 opacity-70" />
            <div className="absolute top-2/3 right-1/3 w-3 h-3 rounded-full bg-red-400 opacity-70" />
        </div>
    );
}
