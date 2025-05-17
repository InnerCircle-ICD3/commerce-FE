interface OrderInfoProps {
    orderId: string;
    orderDate: string;
    orderStatus: string;
}

export const OrderInfo = ({ orderId, orderDate, orderStatus }: OrderInfoProps) => {
    return (
        <div className="mb-10">
            <p className="text-[#2e2f33] opacity-90 text-base">{orderDate}</p>
            <h2 className="text-xl font-bold my-2">주문 번호 {orderId}</h2>
            <p className="text-base font-bold text-[#257a57]">{orderStatus}</p>
        </div>
    );
};
