"use client";

import type { PaymentMethod } from "../../payment/types/payment";

type SelectPaymentMethodProps = {
    paymentMethods: PaymentMethod[];
};

export default function SelectPaymentMethod({ paymentMethods }: SelectPaymentMethodProps) {
    return (
        <div>
            {paymentMethods.map(({ code, label }) => (
                <div key={code} className="flex items-center gap-2">
                    <input type="radio" name="paymentMethod" id={code} value={code} />
                    <label htmlFor={code}>{label}</label>
                </div>
            ))}
        </div>
    );
}
