import React from "react";
import Image from "next/image";
import { ArrowIcon, CupSizeCircleIcon } from "@/src/shared/components/shared/Icon";
import AddToCart from "@/src/features/product/components/AddToCart";

export default function SearchComponent() {
    return (
        <div className="w-full min-h-screen flex flex-col px-4 sm:px-6 md:px-8">
            {/* 메인 콘텐츠 */}
            <main className="flex-1 bg-white py-16">
                <div className="max-w-[75rem] mx-auto">
                    {/* 검색 결과 타이틀 */}
                    <div className="flex flex-col items-center mb-16">
                        <p className="text-[#37383c]/60 text-base mb-1">10개의 검색 결과</p>
                        <h2 className="text-2xl font-bold">버츄오</h2>
                    </div>

                    {/* 필터 및 상품 목록 영역 */}
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-14">
                        {/* 필터 */}
                        <div className="w-full lg:w-80 lg:flex-shrink-0">
                            <h3 className="text-lg font-bold mb-8">필터</h3>

                            {/* 강도 필터 */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center pb-4 border-b border-gray-200/70 mb-4">
                                    <span className="font-bold text-base">강도</span>
                                    <ArrowIcon direction="down" title="강도 필터 펼치기" />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <button type="button" className="py-2.5 px-4 text-[#2e2f33]/88 border border-gray-200/30 rounded-md text-sm">
                                        라이트 0-5
                                    </button>
                                    <button
                                        type="button"
                                        className="py-2.5 px-4 bg-white text-black border border-black rounded-md text-base font-bold"
                                    >
                                        마일드 6-8
                                    </button>
                                    <button type="button" className="py-2.5 px-4 text-[#2e2f33]/88 border border-gray-200/30 rounded-md text-sm">
                                        인텐스 9-11
                                    </button>
                                </div>
                            </div>

                            {/* 컵 사이즈 필터 */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center pb-4 border-b border-gray-200/70 mb-4">
                                    <span className="font-bold text-base">컵사이즈</span>
                                    <ArrowIcon direction="down" title="컵사이즈 필터 펼치기" />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <button type="button" className="py-2.5 px-4 text-[#2e2f33]/88 border border-gray-200/30 rounded-md text-sm">
                                        80ml
                                    </button>
                                    <button type="button" className="py-2.5 px-4 text-[#2e2f33]/88 border border-gray-200/30 rounded-md text-sm">
                                        버츄오 아이스 레시피
                                    </button>
                                    <button type="button" className="py-2.5 px-4 text-[#2e2f33]/88 border border-gray-200/30 rounded-md text-sm">
                                        230ml
                                    </button>
                                    <button type="button" className="py-2.5 px-4 text-[#2e2f33]/88 border border-gray-200/30 rounded-md text-sm">
                                        40ml
                                    </button>
                                    <button type="button" className="py-2.5 px-4 text-[#2e2f33]/88 border border-gray-200/30 rounded-md text-sm">
                                        150ml
                                    </button>
                                    <button type="button" className="py-2.5 px-4 text-[#2e2f33]/88 border border-gray-200/30 rounded-md text-sm">
                                        25ml
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 상품 목록 */}
                        <div className="flex-1 min-w-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-4">
                                {/* 상품 아이템 1 */}
                                <div className="border border-gray-200/70 rounded-xl p-4">
                                    <div className="mb-4">
                                        <div className="flex gap-2 mb-6">
                                            <span className="inline-block bg-[#37383c]/16 text-[#171719] px-2.5 py-1.5 rounded-md text-xs">머그</span>
                                            <span className="inline-block bg-[#ffc000] text-[#171719] px-2.5 py-1.5 rounded-md text-xs">신제품</span>
                                            <span className="inline-block bg-[#a80000] text-white px-2.5 py-1.5 rounded-md text-xs">디카페인</span>
                                        </div>
                                        <div className="h-40 bg-gray-100 flex items-center justify-center mb-4 relative overflow-hidden rounded-md">
                                            <Image
                                                src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1000"
                                                alt="스위트 바닐라향 디카페나토 커피"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex justify-center items-center gap-4 mb-4">
                                            <div className="flex flex-col items-center">
                                                <div className="w-10 h-10 rounded-full bg-[#f7f7f8] flex items-center justify-center mb-1">
                                                    <span className="text-[#37383c]/60 text-base">6</span>
                                                </div>
                                                <span className="text-[#37383c]/60 text-xs">강도</span>
                                            </div>
                                            <div className="h-5 w-px bg-[#70737c]/16" />
                                            <div className="flex flex-col items-center">
                                                <div className="w-10 h-10 rounded-full bg-[#f7f7f8] flex items-center justify-center mb-1">
                                                    <CupSizeCircleIcon size="md" />
                                                </div>
                                                <span className="text-[#37383c]/60 text-xs">230ml</span>
                                            </div>
                                        </div>
                                        <h4 className="text-base font-bold text-center mb-1">스위트 바닐라향* 디카페나토</h4>
                                        <p className="text-sm text-center text-[#171719] mb-6">달콤한 바닐라향과 함께하는 여유</p>
                                        <div className="text-center mb-1">
                                            <span className="text-[#257a57] font-bold text-2xl">₩ 11,500</span>
                                        </div>
                                        <p className="text-center text-[#37383c]/60 text-sm mb-4">10 캡슐</p>
                                        <AddToCart productId={1} title="스위트 바닐라향* 디카페나토" stockQuantity={100} withPopup={true} />
                                    </div>
                                </div>

                                {/* 상품 아이템 2 */}
                                <div className="border border-gray-200/70 rounded-xl p-4">
                                    <div className="mb-4">
                                        <div className="flex gap-2 mb-6">
                                            <span className="inline-block bg-[#37383c]/16 text-[#171719] px-2.5 py-1.5 rounded-md text-xs">
                                                에스프레소
                                            </span>
                                            <span className="inline-block bg-[#7030a0] text-white px-2.5 py-1.5 rounded-md text-xs">베스트</span>
                                            <span className="inline-block bg-[#a80000] text-white px-2.5 py-1.5 rounded-md text-xs">디카페인</span>
                                        </div>
                                        <div className="h-40 bg-gray-100 flex items-center justify-center mb-4 relative overflow-hidden rounded-md">
                                            <Image
                                                src="https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?q=80&w=1000"
                                                alt="알티시오 디카페나토 커피"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex justify-center items-center gap-4 mb-4">
                                            <div className="flex flex-col items-center">
                                                <div className="w-10 h-10 rounded-full bg-[#f7f7f8] flex items-center justify-center mb-1">
                                                    <span className="text-[#37383c]/60 text-base">9</span>
                                                </div>
                                                <span className="text-[#37383c]/60 text-xs">강도</span>
                                            </div>
                                            <div className="h-5 w-px bg-[#70737c]/16" />
                                            <div className="flex flex-col items-center">
                                                <div className="w-10 h-10 rounded-full bg-[#f7f7f8] flex items-center justify-center mb-1">
                                                    <CupSizeCircleIcon size="md" />
                                                </div>
                                                <span className="text-[#37383c]/60 text-xs">40ml</span>
                                            </div>
                                        </div>
                                        <h4 className="text-base font-bold text-center mb-1">알티시오 디카페나토</h4>
                                        <p className="text-sm text-center text-[#171719] mb-6">풍부한 바디감의 디카페인</p>
                                        <div className="text-center mb-1">
                                            <span className="text-[#257a57] font-bold text-2xl">₩ 8,000</span>
                                        </div>
                                        <p className="text-center text-[#37383c]/60 text-sm mb-4">10 캡슐</p>
                                        <AddToCart productId={2} title="알티시오 디카페나토" stockQuantity={100} withPopup={true} />
                                    </div>
                                </div>

                                {/* 상품 아이템 3 */}
                                <div className="border border-gray-200/70 rounded-xl p-4">
                                    <div className="mb-4">
                                        <div className="flex gap-2 mb-6">
                                            <span className="inline-block bg-[#37383c]/16 text-[#171719] px-2.5 py-1.5 rounded-md text-xs">머그</span>
                                            <span className="inline-block bg-[#ffc000] text-[#171719] px-2.5 py-1.5 rounded-md text-xs">신제품</span>
                                        </div>
                                        <div className="h-40 bg-gray-100 flex items-center justify-center mb-4 relative overflow-hidden rounded-md">
                                            <Image
                                                src="https://images.unsplash.com/photo-1610889556528-9a770e32642f?q=80&w=1000"
                                                alt="비비다 커피"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex justify-center items-center gap-4 mb-4">
                                            <div className="flex flex-col items-center">
                                                <div className="w-10 h-10 rounded-full bg-[#f7f7f8] flex items-center justify-center mb-1">
                                                    <span className="text-[#37383c]/60 text-base">6</span>
                                                </div>
                                                <span className="text-[#37383c]/60 text-xs">강도</span>
                                            </div>
                                            <div className="h-5 w-px bg-[#70737c]/16" />
                                            <div className="flex flex-col items-center">
                                                <div className="w-10 h-10 rounded-full bg-[#f7f7f8] flex items-center justify-center mb-1">
                                                    <CupSizeCircleIcon size="md" />
                                                </div>
                                                <span className="text-[#37383c]/60 text-xs">230ml</span>
                                            </div>
                                        </div>
                                        <h4 className="text-base font-bold text-center mb-1">비비다</h4>
                                        <p className="text-sm text-center text-[#171719] mb-6">고소한 비스킷향 커피</p>
                                        <div className="text-center mb-1">
                                            <span className="text-[#257a57] font-bold text-2xl">₩ 12,000</span>
                                        </div>
                                        <p className="text-center text-[#37383c]/60 text-sm mb-4">10 캡슐</p>
                                        <AddToCart productId={3} title="비비다" stockQuantity={20} withPopup={true} />
                                    </div>
                                </div>

                                {/* 상품 아이템 4 */}
                                <div className="border border-gray-200/70 rounded-xl p-4">
                                    <div className="mb-4">
                                        <div className="flex gap-2 mb-6">
                                            <span className="inline-block bg-[#37383c]/16 text-[#171719] px-2.5 py-1.5 rounded-md text-xs">머그</span>
                                        </div>
                                        <div className="h-40 bg-gray-100 flex items-center justify-center mb-4 relative overflow-hidden rounded-md">
                                            <Image
                                                src="https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1000"
                                                alt="엘살바도르 커피"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex justify-center items-center gap-4 mb-4">
                                            <div className="flex flex-col items-center">
                                                <div className="w-10 h-10 rounded-full bg-[#f7f7f8] flex items-center justify-center mb-1">
                                                    <span className="text-[#37383c]/60 text-base">5</span>
                                                </div>
                                                <span className="text-[#37383c]/60 text-xs">강도</span>
                                            </div>
                                            <div className="h-5 w-px bg-[#70737c]/16" />
                                            <div className="flex flex-col items-center">
                                                <div className="w-10 h-10 rounded-full bg-[#f7f7f8] flex items-center justify-center mb-1">
                                                    <CupSizeCircleIcon size="md" />
                                                </div>
                                                <span className="text-[#37383c]/60 text-xs">230ml</span>
                                            </div>
                                        </div>
                                        <h4 className="text-base font-bold text-center mb-1">엘살바도르</h4>
                                        <p className="text-sm text-center text-[#171719] mb-6">레드 허니 가공의 과일잼향</p>
                                        <div className="text-center mb-1">
                                            <span className="text-[#257a57] font-bold text-2xl">₩ 11,000</span>
                                        </div>
                                        <p className="text-center text-[#37383c]/60 text-sm mb-4">10 캡슐</p>
                                        <AddToCart productId={4} title="엘살바도르" stockQuantity={0} withPopup={true} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
