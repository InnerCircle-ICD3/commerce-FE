import { Button } from "@/src/shared/components/shared/button";
import { Input } from "@/src/shared/components/shared/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/src/shared/components/shared/select";
import { SelectValue } from "@radix-ui/react-select";
import { cva } from "class-variance-authority";

export default function AddAddress() {
    // TODO: 배송지 추가 후 배송지 목록 조회
    return (
        <form className="flex flex-col gap-6">
            <div>
                <h4 className={labelStyle()}>배송지명</h4>
                <Input id="name" />
            </div>
            <div>
                <h4 className={labelStyle()}>이름</h4>
                <Input id="recipientName" />
            </div>
            <div>
                <h4 className={labelStyle()}>전화번호</h4>
                <Input id="recipientPhone" />
            </div>
            <div>
                <div className="flex flex-col gap-2 mb-6">
                    <h4 className={labelStyle()}>주소</h4>
                    <div className="flex gap-2">
                        <Input name="zipCode" placeholder="우편번호" />
                        <Button variant="outline">주소 찾기</Button>
                    </div>
                    <Input name="address1" placeholder="주소" />
                    <Input name="address2" placeholder="상세주소" />
                </div>
                <div>
                    <h4 className={labelStyle()}>배송 요청사항(선택)</h4>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="선택" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-1 my-6">
                    <input type="checkbox" name="isDefault" id="isDefault" />
                    <label htmlFor="isDefault">기본 배송지로 설정</label>
                </div>
                <Button size="full">저장하기</Button>
            </div>
        </form>
    );
}

const labelStyle = cva("text-sm font-bold mb-3");
