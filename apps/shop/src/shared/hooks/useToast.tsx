"use client";

import React from "react";
import { useState, useCallback, useRef } from "react";

export function useToast() {
    const [message, setMessage] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    // 토스트 표시 함수
    const toast = useCallback(({ message, duration = 3000 }: { message: string; duration?: number }) => {
        // 기존 타이머가 있다면 제거
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setMessage(message);
        setIsVisible(true);

        // 지정된 시간 후 토스트 숨기기
        if (duration > 0) {
            timeoutRef.current = window.setTimeout(() => {
                setIsVisible(false);
            }, duration);
        }
    }, []);

    return {
        toast,
        ToastUI: (
            <div
                className={`fixed bottom-4 right-4 bg-[#257a57] text-white px-6 py-4 rounded-lg shadow-lg z-[9999] transition-opacity duration-300 ease-in-out ${
                    isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            >
                <p className="font-semibold">{message}</p>
            </div>
        ),
    };
}
