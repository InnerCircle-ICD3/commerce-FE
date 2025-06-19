"use client";

import { useSession } from "next-auth/react";
import EditUserInfo from "./EditUserInfo";
import Loading from "@/src/shared/components/shared/Loading";
import { useEffect, useState } from "react";
import { fetchClient } from "@/src/shared/fetcher";

export type UserInfoType = {
    name: string;
    nickname: string;
    email: string;
};

export default function UserInfo() {
    const fetch = fetchClient();
    const { data: session, status } = useSession();
    const [nickname, setNickname] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const userInfo: UserInfoType = {
        name: session?.user?.name ?? "",
        nickname: nickname,
        email: session?.user?.email ?? "",
    };    
    
    useEffect(() => {
        if (session) {
            getUserInfo();
        } else if (status === "unauthenticated") {
            setIsLoading(false);
        }
    }, [session, status]);

    const getUserInfo = () => {
        setIsLoading(true);
        
        fetch<{ nickname?: string }>("/user/me")
            .then((res) => {
                setNickname(res.data?.nickname ?? "");
            })
            .catch((error) => {
                console.error("Failed to fetch user info:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };    

    // 로딩 중이거나 세션이 로딩 중일 때
    if (isLoading || status === "loading") {
        return (
            <div className="flex justify-center items-center overflow-hidden gap-2.5 px-6 py-4 rounded-xl bg-[#f7f7f8] min-h-[80px]">
                <Loading message="사용자 정보를 불러오는 중..." />
            </div>
        );
    }

    // 인증되지 않은 경우
    if (status === "unauthenticated") {
        return (
            <div className="flex justify-center items-center overflow-hidden gap-2.5 px-6 py-4 rounded-xl bg-[#f7f7f8] min-h-[80px]">
                <p className="text-gray-500">로그인이 필요합니다.</p>
            </div>
        );
    }

    return (
        <div className="flex justify-between items-center overflow-hidden gap-2.5 px-6 py-4 rounded-xl bg-[#f7f7f8]">
            <div className="flex flex-col justify-start items-start relative gap-2">
                <p className="text-lg font-bold text-left text-black">{nickname}</p>
                <div className="flex justify-start items-center relative gap-1 text-[#46474b]">
                    <p className="text-sm">{session?.user?.name}</p>
                    <p className="text-xs text-left text-[#DADADD]">|</p>
                    <p className="text-sm">{session?.user?.email}</p>
                </div>
            </div>
            <EditUserInfo user={userInfo} onUserUpdate={getUserInfo} />
        </div>
    );
}
