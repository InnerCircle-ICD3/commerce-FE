import React, { createContext, useContext, useState } from "react";

// Dialog Context
type DialogContextType = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

function useDialogContext() {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error("Dialog components must be used within a Dialog provider");
    }
    return context;
}

// Dialog Root
interface DialogProps {
    children?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    className?: string;
}

export function Dialog({ children, open, onOpenChange }: DialogProps) {
    const [internalOpen, setInternalOpen] = useState(false);

    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : internalOpen;

    const setOpen = React.useCallback(
        (value: boolean) => {
            if (!isControlled) {
                setInternalOpen(value);
            }
            onOpenChange?.(value);
        },
        [isControlled, onOpenChange],
    );

    return <DialogContext.Provider value={{ open: isOpen, setOpen }}>{children}</DialogContext.Provider>;
}

// Dialog Content
export function DialogContent({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
    const { open, setOpen } = useDialogContext();

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className={`w-full max-w-md rounded-lg bg-white p-6 shadow-lg ${className}`} onClick={e => e.stopPropagation()}>
                {children}
            </div>
            <div className="fixed inset-0 -z-10" onClick={() => setOpen(false)} />
        </div>
    );
}

// Dialog Header
export function DialogHeader({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
    return <div className={`mb-4 text-center sm:text-left ${className}`}>{children}</div>;
}

// Dialog Title
export function DialogTitle({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
    return <h2 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h2>;
}

// Dialog Description
export function DialogDescription({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
    return <p className={`mt-2 text-sm text-gray-500 ${className}`}>{children}</p>;
}

// Dialog Footer
export function DialogFooter({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
    return <div className={`mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className}`}>{children}</div>;
}
