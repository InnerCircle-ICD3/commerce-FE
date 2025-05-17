import { ArrowIcon } from "@/src/shared/components/shared/Icon";

interface OrderHeaderProps {
    title: string;
}

export const OrderHeader = ({ title }: OrderHeaderProps) => {
    return (
        <div className="flex items-center gap-2 mb-10">
            <button type="button" className="focus:outline-none" aria-label="뒤로 가기">
                <ArrowIcon direction="left" size="lg" strokeWidth={2} title="뒤로 가기" className="text-black" />
            </button>
            <h1 className="text-2xl font-bold">{title}</h1>
        </div>
    );
};
