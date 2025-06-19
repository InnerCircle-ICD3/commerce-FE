import { cn } from "@/lib/utils";
import * as React from "react";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    /**
     * 연결할 입력 요소의 ID. 접근성을 위해 필요합니다.
     */
    htmlFor?: string;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, htmlFor, children, ...props }, ref) => {
    // htmlFor가 있으면 연결된 입력 요소가 있다고 판단
    const hasAssociatedControl = Boolean(htmlFor);

    // 제어된 요소가 없고 children이 없는 경우 경고 메시지
    if (!hasAssociatedControl && process.env.NODE_ENV !== "production" && !children) {
        console.warn("Label 컴포넌트에 htmlFor 또는 children이 필요합니다.");
    }

    return (
        <label
            ref={ref}
            htmlFor={htmlFor}
            className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
            {...props}
        >
            {children}
        </label>
    );
});

Label.displayName = "Label";

export { Label };
