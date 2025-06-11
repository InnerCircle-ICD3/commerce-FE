import type { FC } from 'react';
import { useToast, type ToastProps } from './use-toast';

interface ToastContainerProps {
  className?: string;
}

export const ToastContainer: FC<ToastContainerProps> = ({ className = '' }) => {
  const { toasts, dismiss } = useToast();

  return (
    <div className={`fixed top-0 right-0 z-50 flex flex-col gap-2 p-4 ${className}`}>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={() => toast.id && dismiss(toast.id)} />
      ))}
    </div>
  );
};

interface ToastComponentProps {
  toast: ToastProps;
  onClose: () => void;
}

const Toast: FC<ToastComponentProps> = ({ toast, onClose }) => {
  const { title, description, variant = 'default' } = toast;

  const variantClasses = {
    default: 'bg-white border-gray-200 text-gray-900',
    destructive: 'bg-red-50 border-red-200 text-red-900',
    success: 'bg-green-50 border-green-200 text-green-900',
  };

  return (
    <div
      className={`w-full max-w-sm rounded-lg border shadow-md p-4 ${variantClasses[variant]}`}
      role="alert"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {title && <h3 className="font-medium text-sm">{title}</h3>}
          {description && <div className="text-sm opacity-90 mt-1">{description}</div>}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="ml-4 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">닫기</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
};
