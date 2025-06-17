"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

const ErrorPageContent = () => {
    const searchParams = useSearchParams();
    const error = searchParams?.get("error") || "알 수 없는 오류가 발생했습니다.";

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 className="text-4xl font-bold text-red-600 mb-4">오류 발생!</h1>
            <p className="text-lg text-gray-700">로그인 처리 중 문제가 발생했습니다.</p>
            {error && <p className="text-md text-gray-500 mt-2">오류 메시지: {error}</p>}
            <a href="/login" className="mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                로그인 페이지로 돌아가기
            </a>
        </div>
    );
};

const ErrorPage = () => {
    return (
        <Suspense fallback={<div>로딩 중 오류 페이지...</div>}>
            <ErrorPageContent />
        </Suspense>
    );
};

export default ErrorPage;
