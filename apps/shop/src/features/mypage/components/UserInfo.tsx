"use client";

import { useSession } from "next-auth/react";
import EditUserInfo from "./EditUserInfo";
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

    const userInfo: UserInfoType = {
        name: session?.user?.name ?? "",
        nickname: nickname,
        email: session?.user?.email ?? "",
    };

    useEffect(() => {
        getUserInfo();
    }, [session]);

    const getUserInfo = () => {
        fetch<{ nickname?: string }>("/user/me")
            .then((res) => {
                setNickname(res.data?.nickname ?? "");
            })
            .catch((error) => {
                console.error("Failed to fetch user info:", error);
            });
    };
    
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
            <EditUserInfo user={userInfo} />
        </div>
    );
}
