export const ShippingTracking = ({ trackingNumber }: { trackingNumber: string }) => {
    return (
        <div>
            <div>
                <span className="font-bold">운송장 번호 : </span>
                {trackingNumber}
            </div>
        </div>
    );
};
