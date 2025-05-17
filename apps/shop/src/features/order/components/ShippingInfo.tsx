interface ShippingInfoProps {
    name: string;
    address: string;
    phone: string;
    memo?: string;
}

export const ShippingInfo = ({ name, address, phone, memo }: ShippingInfoProps) => {
    return (
        <div className="mb-10">
            <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold">배송지</h3>
                <div className="text-sm">
                    <div className="flex items-center gap-1">
                        <span>{name}</span>
                        <span className="border-l border-gray-400 opacity-20 h-2 mx-1" />
                        <span>{address}</span>
                    </div>
                    <p className="mt-1">{phone}</p>
                    {memo && <p className="mt-1 text-[#2e2f33] opacity-90">{memo}</p>}
                </div>
            </div>
        </div>
    );
};
