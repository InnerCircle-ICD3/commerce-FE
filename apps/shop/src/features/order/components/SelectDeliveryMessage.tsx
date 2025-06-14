"use client";

import { Input } from "@/src/shared/components/shared/input";
import { useEffect, useState } from "react";

export default function SelectDeliveryMessage() {
    const [deliveryMessage, setDeliveryMessage] = useState("");
    const [isCustom, setIsCustom] = useState(false);
    const deliveryMessages = ["문앞에 두고가주세요", "직접 받아가주세요", "현재 자리에 두고가주세요"];

    const [selectedDeliveryMessage, setSelectedDeliveryMessage] = useState(deliveryMessages[0]);

    useEffect(() => {
        switch (selectedDeliveryMessage) {
            case "custom":
                setDeliveryMessage("");
                setIsCustom(true);
                break;
            case "none":
                setDeliveryMessage("");
                setIsCustom(false);
                break;
            default:
                setDeliveryMessage(selectedDeliveryMessage);
                setIsCustom(false);
                break;
        }
    }, [selectedDeliveryMessage]);

    return (
        <div>
            <select
                className="w-full p-2 outline-none border border-gray-200 rounded-md"
                value={selectedDeliveryMessage}
                onChange={e => setSelectedDeliveryMessage(e.target.value)}
            >
                {deliveryMessages.map(message => (
                    <option key={message} value={message}>
                        {message}
                    </option>
                ))}
                <option value="none">없음</option>
                <option value="custom">직접 입력</option>
            </select>
            <Input
                type="text"
                value={deliveryMessage}
                onChange={e => setDeliveryMessage(e.target.value)}
                className="mt-2"
                name="deliveryMessage"
                hidden={!isCustom}
            />
        </div>
    );
}
