import { useEffect } from "react";

export default function SelectDeliveryMessage() {
    const deliveryMessages = ["문앞에 두고가주세요", "직접 받아가주세요", "현재 자리에 두고가주세요"];

    return (
        <select name="deliveryMessage" className="w-full p-2 outline-none border border-gray-200 rounded-md" defaultValue={deliveryMessages[0]}>
            <option value="">배송 메시지 선택</option>
            {deliveryMessages.map(message => (
                <option key={message} value={message}>
                    {message}
                </option>
            ))}
        </select>
    );
}
