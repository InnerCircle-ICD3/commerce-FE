export default function UserInfo() {
    return (
        <div className="flex justify-between items-center overflow-hidden gap-2.5 px-6 py-4 rounded-xl bg-[#f7f7f8]">
            <div className="flex flex-col justify-start items-start relative gap-2">
                <p className="text-lg font-bold text-left text-black">팔공팔공일</p>
                <div className="flex justify-start items-center relative gap-1 text-[#46474b]">
                    <p className="text-sm">김팔공</p>
                    <p className="text-xs text-left text-[#DADADD]">|</p>
                    <p className="text-sm">user1234@kakao.com</p>
                </div>
            </div>
            <button type="button" className="flex justify-center items-center h-8 relative gap-0.5 p-3 rounded-md bg-white border border-[#E0E0E2]">
                <p className="text-xs font-bold text-center text-[#47486e]">편집</p>
            </button>
        </div>
    );
}
