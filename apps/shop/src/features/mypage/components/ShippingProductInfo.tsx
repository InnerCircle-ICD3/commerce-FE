import type { ShippingProduct } from "@/app/mypage/page";
import { MoreIcon } from "@/src/features/mypage/icons/MoreIcon";

export default function ShippingProductInfo({ product }: { product: ShippingProduct }) {
    const { image, mainProductName, status, remainingProductCount } = product;

    return (
        <button
            type="button"
            className="flex items-center justify-between relative gap-4 p-6 rounded-xl bg-white border border-[#70737c]/[0.08] min-w-xs "
        >
            <div className="flex items-center w-full relative gap-4">
                <div className="w-12 h-12 relative">
                    <div className="flex justify-start items-center absolute gap-2">
                        <img src={image} alt={mainProductName} />
                    </div>
                </div>
                <div className="flex flex-col justify-start items-start relative gap-1">
                    <div className="flex flex-col justify-start items-start self-stretch relative gap-4">
                        <p className="flex text-sm text-left text-black gap-1">
                            <span className="text-sm font-bold text-left text-black">{mainProductName}</span>
                            {remainingProductCount && <span className="text-sm text-left text-black">외 {remainingProductCount}건</span>}
                        </p>
                    </div>
                    <p className="text-base font-bold text-center text-[#257a57]">{status}</p>
                </div>
            </div>
            <MoreIcon />
        </button>
    );
}
