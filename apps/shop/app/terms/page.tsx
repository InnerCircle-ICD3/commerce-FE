import Link from "next/link";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-6 py-16">
                <div className="mb-8">
                    <Link href="/main" className="text-sm text-gray-600 hover:text-gray-800 transition-colors">
                        ← 메인으로 돌아가기
                    </Link>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-8">이용약관</h1>

                <div className="prose max-w-none">
                    <div className="bg-blue-50 p-4 rounded-lg mb-8">
                        <p className="text-sm text-blue-800">
                            <strong>알림:</strong> 본 약관은 사이드 프로젝트를 위해 작성된 샘플 약관입니다. 실제 서비스 운영 시에는 법무팀 검토를 받은
                            정식 약관을 사용해야 합니다.
                        </p>
                    </div>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">제1조 (목적)</h2>
                        <p className="text-gray-700 leading-relaxed">
                            이 약관은 801 COFFEE(이하 "회사")가 제공하는 온라인 커피 쇼핑몰 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의
                            권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">제2조 (정의)</h2>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li>"서비스"란 회사가 제공하는 온라인 커피 캡슐 판매 서비스를 말합니다.</li>
                            <li>"이용자"란 이 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.</li>
                            <li>"회원"이란 회사에 개인정보를 제공하여 회원등록을 한 자를 말합니다.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">제3조 (약관의 효력 및 변경)</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            1. 이 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력이 발생합니다.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            2. 회사는 필요하다고 인정되는 경우 이 약관을 변경할 수 있으며, 변경된 약관은 서비스 화면에 공지함으로써 효력이 발생합니다.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">제4조 (서비스의 제공)</h2>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li>온라인 커피 캡슐 판매</li>
                            <li>주문 및 결제 서비스</li>
                            <li>배송 서비스</li>
                            <li>고객 지원 서비스</li>
                            <li>기타 회사가 정하는 서비스</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">제5조 (회원가입)</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            1. 이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로써 회원가입을
                            신청합니다.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            2. 회사는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각호에 해당하지 않는 한 회원으로 등록합니다.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">제6조 (주문 및 결제)</h2>
                        <p className="text-gray-700 leading-relaxed">
                            이용자는 서비스 내에서 다음과 같은 방법으로 주문을 합니다. 회사는 이용자가 주문을 함에 있어서 다음의 내용을 알기 쉽게
                            제공하여야 합니다.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">제7조 (배송 및 반품)</h2>
                        <p className="text-gray-700 leading-relaxed">
                            회사는 이용자가 주문한 상품에 대해 배송수단, 수단별 배송비용 부담자, 수단별 배송기간 등을 명시합니다. 상품의 하자 등으로
                            인한 반품의 경우 반품에 필요한 비용은 회사가 부담합니다.
                        </p>
                    </section>

                    <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">
                            <strong>시행일:</strong> 2025년 6월 20일
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
