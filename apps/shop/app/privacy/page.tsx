import Link from "next/link";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-6 py-16">
                <div className="mb-8">
                    <Link href="/main" className="text-sm text-gray-600 hover:text-gray-800 transition-colors">
                        ← 메인으로 돌아가기
                    </Link>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-8">개인정보 처리방침</h1>

                <div className="prose max-w-none">
                    <div className="bg-blue-50 p-4 rounded-lg mb-8">
                        <p className="text-sm text-blue-800">
                            <strong>알림:</strong> 본 개인정보 처리방침은 사이드 프로젝트를 위해 작성된 샘플입니다. 실제 서비스 운영 시에는
                            개인정보보호법에 따른 정식 개인정보 처리방침을 작성해야 합니다.
                        </p>
                    </div>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">1. 개인정보의 처리목적</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            801 COFFEE(이하 "회사")는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는
                            이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할
                            예정입니다.
                        </p>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li>회원 가입 및 관리</li>
                            <li>상품 주문 및 배송</li>
                            <li>결제 및 정산</li>
                            <li>고객 상담 및 불만 처리</li>
                            <li>서비스 개선 및 신상품 개발</li>
                            <li>마케팅 및 광고에 활용</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">2. 개인정보의 처리 및 보유기간</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서
                            개인정보를 처리·보유합니다.
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-900 mb-2">구체적인 개인정보 처리 및 보유 기간:</h3>
                            <ul className="list-disc pl-6 text-gray-700 space-y-1">
                                <li>회원 정보: 회원 탈퇴 시까지</li>
                                <li>주문/결제 정보: 5년 (전자상거래법)</li>
                                <li>배송 정보: 5년 (전자상거래법)</li>
                                <li>고객 상담 기록: 3년</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">3. 처리하는 개인정보의 항목</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">필수항목:</h3>
                                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                                    <li>이름, 이메일, 전화번호</li>
                                    <li>배송주소</li>
                                    <li>결제정보 (카드번호 등)</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">선택항목:</h3>
                                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                                    <li>생년월일</li>
                                    <li>마케팅 수신 동의</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">4. 개인정보의 제3자 제공</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            회사는 원칙적으로 정보주체의 개인정보를 수집·이용 목적으로 명시한 범위 내에서 처리하며, 다음의 경우를 제외하고는
                            정보주체의 사전 동의 없이는 본래의 목적 범위를 초과하여 처리하거나 제3자에게 제공하지 않습니다.
                        </p>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li>배송업체: 상품 배송을 위한 최소한의 정보</li>
                            <li>결제대행업체: 결제 처리를 위한 필요 정보</li>
                            <li>법령에 의한 요구가 있는 경우</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">5. 개인정보 처리의 위탁</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <ul className="list-disc pl-6 text-gray-700 space-y-1">
                                <li>배송업무: 자체 운영</li>
                                <li>결제업무: 열정페이 팀 (핀테크조)</li>
                                <li>고객상담: 자체 운영</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">6. 정보주체의 권리·의무 및 행사방법</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
                        </p>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li>개인정보 처리현황 통지요구</li>
                            <li>개인정보 열람요구</li>
                            <li>개인정보 정정·삭제요구</li>
                            <li>개인정보 처리정지요구</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">7. 개인정보의 안전성 확보조치</h2>
                        <p className="text-gray-700 leading-relaxed">회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
                            <li>개인정보 취급 직원의 최소화 및 교육</li>
                            <li>정기적인 자체 감사 실시</li>
                            <li>개인정보에 대한 접근 제한</li>
                            <li>개인정보를 저장하는 데이터베이스 시스템에 대한 접근권한의 부여·변경·말소</li>
                            <li>개인정보의 암호화</li>
                            <li>해킹 등에 대비한 기술적 대책</li>
                        </ul>
                    </section>

                    <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">
                            <strong>시행일:</strong> 2025년 6월 20일
                            <br />
                            <strong>개정일:</strong> 2025년 6월 20일
                            <br />
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                            이 개인정보 처리방침은 샘플이며, 실제 서비스에서는 법무검토를 받은 정식 방침을 사용해야 합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
