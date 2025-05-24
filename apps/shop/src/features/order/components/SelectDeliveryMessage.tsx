export default function SelectDeliveryMessage() {
    return (
        <select name="deliveryMessage" className="w-full p-2 outline-none border border-gray-200 rounded-md">
            <option value="문앞에 두고가주세요">문앞에 두고가주세요</option>
            <option value="직접 받아가주세요">직접 받아가주세요</option>
            <option value="현재 자리에 두고가주세요">현재 자리에 두고가주세요</option>
        </select>
    );
}
