import React from "react";

interface LoadingProps {
    message?: string;
}

export default function Loading({ message = "로딩중입니다..." }: LoadingProps) {
    return (
        <div className="flex flex-col items-center justify-center py-8">
            <div className="w-8 h-8 mb-2 border-4 border-[#257a57] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-[#257a57] font-semibold">{message}</p>
        </div>
    );
}
