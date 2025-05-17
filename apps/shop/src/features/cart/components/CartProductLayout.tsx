export default function CartProductLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex gap-2 w-full justify-between items-center">
                <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2">
                    <input type="checkbox" className="w-4.5 h-4.5" />
                    <p className="flex-grow-0 flex-shrink-0 text-base font-bold text-left text-black">전체선택</p>
                </div>
                <button
                    type="button"
                    className="flex-grow-0 flex-shrink-0 text-sm font-semibold text-center text-[#47484C] p-2 rounded-md border border-[#E8E8EA]"
                >
                    전체 삭제
                </button>
            </div>
            {children}
            <p className="flex-grow-0 flex-shrink-0 text-xs text-[#858588]">*수량은 각 제품 캡슐 단위로 변경이 가능합니다.</p>
        </>
    );
}
