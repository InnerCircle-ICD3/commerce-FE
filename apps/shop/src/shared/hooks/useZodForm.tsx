import { useState } from "react";
import { type ZodObject, ZodError, type z } from "zod";

// uncontrolled input element 기반
export function useZodForm<T extends ZodObject<z.ZodRawShape>>(schema: T, initialValues: z.infer<T>, options?: { validateOnChange?: boolean }) {
    type FormData = z.infer<typeof schema>;

    const [inputs, setInputs] = useState<FormData>(initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setInputs(prev => ({
            ...prev,
            [name]: value,
        }));

        try {
            // 일부 필드만 검증
            if (options?.validateOnChange) {
                schema.pick({ [name]: true }).parse({ [name]: value });
            }
            setErrors(prev => ({ ...prev, [name]: null }));
        } catch (err) {
            // 일부 필드만 에러 업데이트
            if (err instanceof ZodError) {
                setErrors(prev => ({
                    ...prev,
                    [name]: err.errors[0].message,
                }));
            }
        }
    };

    const validate = () => {
        try {
            schema.parse(inputs);
            setErrors({});
            return true;
        } catch (err) {
            if (err instanceof ZodError) {
                const fieldErrors: Partial<Record<keyof FormData, string>> = {};
                for (const e of err.errors) {
                    const path = e.path[0] as keyof FormData;
                    fieldErrors[path] = e.message;
                }
                setErrors(fieldErrors);
            }
            return false;
        }
    };

    const reset = () => {
        setInputs({});
        setErrors({});
    };

    return {
        inputs,
        errors,
        handleChange,
        validate,
        reset,
        setInputs,
    };
}
