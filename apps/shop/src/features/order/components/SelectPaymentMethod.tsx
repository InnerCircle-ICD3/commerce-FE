"use client";

import type { PaymentMethod } from "../../payment/types/paymentMethod";

interface SelectPaymentMethodProps {
    paymentMethods: PaymentMethod[];
    onChangePaymentMethod: (paymentMethod: string) => void;
}

export default function SelectPaymentMethod({ paymentMethods, onChangePaymentMethod }: SelectPaymentMethodProps) {
    const handleChangePaymentMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            onChangePaymentMethod(e.target.value);
        }
    };
    return (
        <div>
            {paymentMethods.map(({ code, label }) => (
                <div key={code} className="flex items-center gap-2">
                    <input type="radio" name="paymentMethod" id={code} value={code} onChange={handleChangePaymentMethod} />
                    <label htmlFor={code}>{label}</label>
                </div>
            ))}
        </div>
    );
}
