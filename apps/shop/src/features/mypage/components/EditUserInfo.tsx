"use client";
import React from "react";
import UserPopup from "@/src/features/mypage/components/user/UserPopup";
import { useToast } from "@/src/shared/hooks/useToast";
import type { UserInfoType } from "./UserInfo";
import { fetchClient } from "@/src/shared/fetcher";

type EditUserInfoProps = {
    user: UserInfoType;
    onUserUpdate: () => void; // 사용자 정보 업데이트 후 호출할 콜백
};

export default function EditUserInfo({ user, onUserUpdate }: EditUserInfoProps) {
    const fetch = fetchClient();
    const [isPopupOpen, setIsPopupOpen] = React.useState(false);
    const { toast, ToastUI } = useToast();

    const onEditClick = () => {
        setIsPopupOpen(true);
    };

    const onCloseClick = () => {
        setIsPopupOpen(false);
    };    
    
    const onSaveClick = (newNickname: string) => {
        changeNickname(newNickname);
        setIsPopupOpen(false);
    };
    
    const changeNickname = (newNickname: string) => {
        fetch("/user/me", {
            method: "PATCH",
            body: JSON.stringify({ nickname: newNickname }),
        }).then(() => {
            onUserUpdate(); // 닉네임 변경 후 사용자 정보 다시 가져오기
            showToast();
        }).catch((error) => {
            console.error("닉네임 변경 실패", error);
            toast({
                message: "닉네임 변경에 실패했습니다. 다시 시도해주세요.",
            });
        });
    }

    const showToast = () => {
        toast({
            message: "유저 정보가 저장되었습니다.",
        });
    };

    return (
        <>
            <button
                type="button"
                className="flex justify-center items-center h-8 relative gap-0.5 p-3 rounded-md bg-white border border-[#E0E0E2]"
                onClick={onEditClick}
            >
                <p className="text-xs font-bold text-center text-[#47486e]">편집</p>
            </button>
            {isPopupOpen && <UserPopup user={user} onClose={onCloseClick} onSave={onSaveClick} />}
            {ToastUI}
        </>
    );
}
