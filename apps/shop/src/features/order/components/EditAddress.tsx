import { Button } from "@/src/shared/components/shared/button";
import { Input } from "@/src/shared/components/shared/input";
import { cva } from "class-variance-authority";
import type { AddressType } from "../types";
import { useEditAddress } from "../hooks/useEditAddress";
import { useZodForm } from "@/src/shared/hooks/useZodForm";
import { z } from "zod";
import { useDaumPostcodePopup } from "react-daum-postcode";
interface EditAddressProps {
    address?: AddressType;
    onComplete?: () => void;
}

const createAddressSchema = z.object({
    alias: z.string().min(1, { message: "배송지명을 입력해주세요." }),
    recipientName: z.string().min(1, { message: "이름을 입력해주세요." }),
    recipientPhone: z.string().min(1, { message: "전화번호를 입력해주세요." }),
    address1: z.string().min(1, { message: "주소를 입력해주세요." }),
    address2: z.string().min(1, { message: "상세주소를 입력해주세요." }),
    zipCode: z.string().min(1, { message: "우편번호를 입력해주세요." }),
});
export default function EditAddress({ address, onComplete }: EditAddressProps) {
    const { inputs, setInputs, handleChange, errors, validate } = useZodForm(
        createAddressSchema,
        {
            alias: address?.alias || "",
            recipientName: address?.recipientName || "",
            recipientPhone: address?.recipientPhone || "",
            address1: address?.address1 || "",
            address2: address?.address2 || "",
            zipCode: address?.zipCode || "",
        },
        { validateOnChange: true },
    );
    const { mutate, isPending } = useEditAddress({
        onSuccess: () => {
            // TODO: 배송지 캐싱 무효화
            onComplete?.();
        },
    });

    const openDaumPostCode = useDaumPostcodePopup();

    const handleSubmit = () => {
        validate();
        // mutate({ address: { ...inputs, isDefault: false, id: address?.id } });
    };

    const handleComplete = (data: { address: string; zonecode: string }) => {
        setInputs({ ...inputs, address1: data.address, zipCode: data.zonecode, address2: "" });
    };

    return (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div>
                <h4 className={labelStyle()}>배송지명</h4>
                <Input id="alias" name="alias" placeholder="집" value={inputs.alias} onChange={handleChange} />
                <p className={errorStyle()}>{errors.alias}</p>
            </div>
            <div>
                <h4 className={labelStyle()}>이름</h4>
                <Input id="recipientName" name="recipientName" placeholder="홍길동" onChange={handleChange} value={inputs.recipientName} />
                <p className={errorStyle()}>{errors.recipientName}</p>
            </div>
            <div>
                <h4 className={labelStyle()}>전화번호</h4>
                <Input id="recipientPhone" name="recipientPhone" placeholder="-없이 입력" onChange={handleChange} value={inputs.recipientPhone} />
                <p className={errorStyle()}>{errors.recipientPhone}</p>
            </div>
            <div>
                <div className="flex flex-col gap-1 mb-6">
                    <h4 className={labelStyle()}>주소</h4>
                    <div className="flex gap-2">
                        <Input name="zipCode" placeholder="우편번호" value={inputs.zipCode} onChange={handleChange} readOnly />
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() =>
                                openDaumPostCode({
                                    onComplete: handleComplete,
                                    height: 500,
                                    width: 500,
                                })
                            }
                        >
                            주소 찾기
                        </Button>
                    </div>
                    <div>
                        <Input name="address1" placeholder="주소" value={inputs.address1} onChange={handleChange} readOnly />
                    </div>
                    <div>
                        <Input name="address2" placeholder="상세주소" value={inputs?.address2} onChange={handleChange} />
                        <p className={errorStyle()}>{errors.address1 || errors.address2}</p>
                    </div>
                </div>
                <div className="flex items-center gap-1 my-6">
                    <input type="checkbox" name="isDefault" id="isDefault" defaultChecked={address?.isDefault} />
                    <label htmlFor="isDefault">기본 배송지로 설정</label>
                </div>
                <Button size="full" type="button" onClick={handleSubmit}>
                    저장하기
                </Button>
            </div>
        </form>
    );
}

const labelStyle = cva("text-sm font-bold mb-3");
const errorStyle = cva("text-red-500 text-xs h-5 flex items-center mt-1");
