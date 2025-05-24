import { Button } from "@/src/shared/components/shared/button";
import { Input } from "@/src/shared/components/shared/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/src/shared/components/shared/select";
import { SelectValue } from "@radix-ui/react-select";
import { cva } from "class-variance-authority";
import type { AddressType } from "../types";

interface EditAddressProps {
    address?: AddressType;
}

export default function EditAddress({ address }: EditAddressProps) {
    // TODO: address 값에 따라 주소 추가 or 주소 편집 분기처리
    return (
        <form className="flex flex-col gap-6">
            <div>
                <h4 className={labelStyle()}>배송지명</h4>
                <Input id="name" defaultValue={address?.name} />
            </div>
            <div>
                <h4 className={labelStyle()}>이름</h4>
                <Input id="recipientName" defaultValue={address?.recipientName} />
            </div>
            <div>
                <h4 className={labelStyle()}>전화번호</h4>
                <Input id="recipientPhone" defaultValue={address?.recipientPhone} />
            </div>
            <div>
                <div className="flex flex-col gap-2 mb-6">
                    <h4 className={labelStyle()}>주소</h4>
                    <div className="flex gap-2">
                        <Input name="zipCode" placeholder="우편번호" />
                        <Button variant="outline">주소 찾기</Button>
                    </div>
                    <Input name="address1" placeholder="주소" defaultValue={address?.address1} />
                    <Input name="address2" placeholder="상세주소" defaultValue={address?.address2} />
                </div>
                <div className="flex items-center gap-1 my-6">
                    <input type="checkbox" name="isDefault" id="isDefault" defaultChecked={address?.isDefault} />
                    <label htmlFor="isDefault">기본 배송지로 설정</label>
                </div>
                <Button size="full">저장하기</Button>
            </div>
        </form>
    );
}

const labelStyle = cva("text-sm font-bold mb-3");
