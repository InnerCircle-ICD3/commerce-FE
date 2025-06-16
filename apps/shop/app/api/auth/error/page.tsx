import { Suspense } from "react";
import ErrorMessage from "./ErrorMessage";

export default function AuthErrorPage() {
    return (
        <div className="w-full min-h-[80vh] flex items-center justify-center">
            <Suspense fallback={<div>로딩 중...</div>}>
                <ErrorMessage />
            </Suspense>
        </div>
    );
}
