import { useEffect, useState } from "react";

export type ToastProps = {
    id?: string;
    title?: string;
    description?: string;
    variant?: "default" | "destructive" | "success";
    duration?: number;
};

interface ToastState {
    toasts: ToastProps[];
    addToast: (toast: ToastProps) => void;
    removeToast: (id: string) => void;
}

// 간단한 토스트 상태 관리
const toastState: ToastState = {
    toasts: [],
    addToast: (toast: ToastProps) => {
        const id = Math.random().toString(36).substring(2, 9);
        const newToast = { ...toast, id };
        toastState.toasts.push(newToast);

        // 토스트 자동 제거를 위한 타이머 설정
        const duration = toast.duration || 5000;
        setTimeout(() => {
            toastState.removeToast(id);
        }, duration);

        // 토스트가 추가되었음을 알리기 위해 이벤트 발생
        window.dispatchEvent(new CustomEvent("toast-change", { detail: toastState.toasts }));

        return id;
    },
    removeToast: (id: string) => {
        toastState.toasts = toastState.toasts.filter(t => t.id !== id);
        window.dispatchEvent(new CustomEvent("toast-change", { detail: toastState.toasts }));
    },
};

// 토스트 훅
export function useToast() {
    const [toasts, setToasts] = useState<ToastProps[]>(toastState.toasts);

    useEffect(() => {
        const handleToastChange = (event: Event) => {
            const customEvent = event as CustomEvent;
            setToasts([...customEvent.detail]);
        };

        window.addEventListener("toast-change", handleToastChange);
        return () => window.removeEventListener("toast-change", handleToastChange);
    }, []);

    return {
        toasts,
        toast: (props: ToastProps) => toastState.addToast(props),
        dismiss: (id: string) => toastState.removeToast(id),
    };
}

// 전역 토스트 함수 (컴포넌트 밖에서도 사용 가능)
export const toast = (props: ToastProps) => toastState.addToast(props);
