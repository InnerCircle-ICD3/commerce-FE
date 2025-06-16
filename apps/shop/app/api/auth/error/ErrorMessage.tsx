"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ErrorMessage() {
    const searchParams = useSearchParams();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [errorType, setErrorType] = useState<string>("");

    useEffect(() => {
        const error = searchParams.get("error");

        if (error) {
            setErrorType(error);
            switch (error) {
                case "Configuration":
                    setErrorMessage("서버 설정 문제가 발생했습니다. 관리자에게 문의해주세요.");
                    break;
                case "AccessDenied":
                    setErrorMessage("접근이 거부되었습니다. 권한이 없습니다.");
                    break;
                case "Verification":
                    setErrorMessage("이메일 인증에 문제가 발생했습니다. 다시 시도해 주세요.");
                    break;
                case "OAuthSignin":
                    setErrorMessage("소셜 로그인 시작 중 문제가 발생했습니다.");
                    break;
                case "OAuthCallback":
                    setErrorMessage("소셜 로그인 콜백 처리 중 문제가 발생했습니다.");
                    break;
                case "OAuthAccountNotLinked":
                    setErrorMessage("이미 다른 소셜 계정으로 가입된 이메일입니다.");
                    break;
                default:
                    setErrorMessage("로그인 중 문제가 발생했습니다. 다시 시도해 주세요.");
            }
        }
    }, [searchParams]);

    return (
        <div className="w-[25rem] bg-white rounded-2xl p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">로그인 오류</h2>

            <div className="mb-6">
                <p className="text-red-500 font-medium mb-2">에러 유형: {errorType}</p>
                <p className="text-gray-700">{errorMessage}</p>
            </div>

            <div className="mt-8">
                <p className="mb-4 text-gray-600">다음 방법을 시도해보세요:</p>
                <ul className="list-disc text-left pl-8 mb-6">
                    <li>브라우저 쿠키를 삭제한 후 다시 시도</li>
                    <li>다른 로그인 방법 사용</li>
                    <li>잠시 후 다시 시도</li>
                </ul>
            </div>

            <Link href="/login" className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                로그인 페이지로 돌아가기
            </Link>
        </div>
    );
}
