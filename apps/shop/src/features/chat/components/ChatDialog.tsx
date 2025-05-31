"use client";

import { useState } from "react";

interface ChatDialogProps {
    onClose: () => void;
}

const ChatDialog = ({ onClose }: ChatDialogProps) => {
    const [message, setMessage] = useState("");

    return (
        <div className="fixed top-0 right-0 z-50 flex items-end justify-end p-4 sm:p-6 md:p-8" onClick={e => e.stopPropagation()}>
            <div
                className="w-full sm:w-[22rem] md:w-[26rem] lg:w-[30rem] h-[90vh] max-h-[42rem] bg-white rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col"
                aria-modal="true"
                aria-labelledby="chatTitle"
                onClick={e => e.stopPropagation()}
            >
                {/* 헤더 */}
                <div className="w-full h-[4.5rem] border-b border-[#EEEEEE] flex items-center justify-between px-6">
                    <h2 id="chatTitle" className="text-xl font-bold py-2">
                        채팅
                    </h2>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center" type="button">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            aria-labelledby="closeIconTitle"
                        >
                            <title id="closeIconTitle">닫기</title>
                            <path
                                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                                fill="black"
                            />
                        </svg>
                    </button>
                </div>

                {/* 채팅 내용 */}
                <div className="flex-grow overflow-y-auto p-4 sm:p-6">
                    {/* 날짜 표시 */}
                    <div className="flex justify-center my-6">
                        <span className="text-xs text-[#666668]">8/20/2020</span>
                    </div>

                    {/* 상대방 메시지 (상품 정보) */}
                    <div className="w-full mb-8">
                        {/* 왼쪽 메시지 (유저) */}
                        <div className="mb-4">
                            <div className="bg-[#F7F7F8] text-[#171719] px-4 py-3 rounded-lg inline-block mb-1">Text Chat</div>
                            <div className="text-xs text-[#37383C] text-opacity-60">오후 10:11</div>
                        </div>

                        {/* 상품 정보 */}
                        <div className="mb-4">
                            <div className="bg-[#F7F7F8] p-4 rounded-xl border border-[#EEEEEE] mb-1">
                                <div className="flex gap-4">
                                    {/* 상품 이미지 */}
                                    <div className="w-[4.5rem] sm:w-[5rem] h-[3.5rem] relative overflow-hidden">
                                        <img
                                            src="https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=200&auto=format&fit=crop"
                                            alt="커피 제품 이미지"
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    </div>

                                    {/* 상품 정보 */}
                                    <div className="flex flex-col justify-between flex-1">
                                        <div>
                                            <h3 className="font-bold text-base leading-[1.4]">
                                                제품명
                                                <br />
                                                최대 2줄
                                            </h3>
                                        </div>
                                        <div>
                                            <div className="flex items-center text-[#257A57] font-bold">
                                                <span>₩</span>
                                                <span>11,500</span>
                                            </div>
                                            <div className="text-xs text-[#37383C] text-opacity-60">10 캡슐</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 버튼 그룹 */}
                            <div className="flex gap-1 mb-2">
                                <button
                                    type="button"
                                    className="flex-1 bg-[#F4F4F5] text-[#2E2F33] text-opacity-88 rounded-lg px-4 py-2.5 font-medium text-sm sm:text-base"
                                >
                                    일반문의
                                </button>
                                <button
                                    type="button"
                                    className="flex-1 bg-[#257A57] text-white rounded-lg px-4 py-2.5 font-bold text-sm sm:text-base"
                                >
                                    해당 제품 문의
                                </button>
                            </div>
                            <div className="text-xs text-[#37383C] text-opacity-60">오후 10:11</div>
                        </div>
                    </div>

                    {/* 내 메시지 (오른쪽) */}
                    <div className="flex justify-end mb-4">
                        <div>
                            <div className="bg-[#257A57] text-white px-4 py-3 rounded-lg inline-block mb-1">Text Chat</div>
                            <div className="text-xs text-[#37383C] text-opacity-60 text-right">오후 10:11</div>
                        </div>
                    </div>

                    {/* 왼쪽 메시지 (유저) */}
                    <div className="mb-4">
                        <div className="bg-[#F7F7F8] text-[#171719] px-4 py-3 rounded-lg inline-block mb-1">Text Chat</div>
                        <div className="text-xs text-[#37383C] text-opacity-60">오후 10:11</div>
                    </div>

                    {/* 내 메시지 (오른쪽) */}
                    <div className="flex justify-end mb-4">
                        <div>
                            <div className="bg-[#257A57] text-white px-4 py-3 rounded-lg inline-block mb-1">Text Chat</div>
                            <div className="text-xs text-[#37383C] text-opacity-60 text-right">오후 10:11</div>
                        </div>
                    </div>
                </div>

                {/* 메시지 입력 영역 */}
                <div className="w-full border-t border-[#EEEEEE] p-4">
                    <div className="flex">
                        <div className="flex-grow relative">
                            <input
                                type="text"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                placeholder="채팅을 입력하세요"
                                aria-label="채팅 메시지 입력"
                                className="w-full h-12 pl-4 pr-10 border border-[#EEEEEE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#257A57]"
                            />
                        </div>
                        <button type="button" className="ml-2 w-12 h-12 flex items-center justify-center text-[#257A57]">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                role="img"
                                aria-labelledby="sendIconTitle"
                            >
                                <title id="sendIconTitle">전송</title>
                                <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="#257A57" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatDialog;
