import { NextResponse } from "next/server";
import { z } from "zod";

let nextId = 1;

const schema = z.object({
    alias: z.string().min(1, "배송지명을 입력해주세요.").optional(),
    address1: z.string().min(1, "주소를 입력해주세요."),
    address2: z.string().min(1, "상세주소를 입력해주세요."),
    zipCode: z.string().min(1, "우편번호를 입력해주세요."),
    recipientName: z.string().min(1, "받는 사람 이름을 입력해주세요."),
    recipientPhone: z.string().min(1, "받는 사람 전화번호를 입력해주세요."),
    isDefault: z.boolean().optional(),
});
// mock api
export async function POST(req: Request) {
    const body = await req.json();
    try {
        const { alias, address1, address2, zipCode, recipientName, recipientPhone, isDefault } = schema.parse(body);

        return new NextResponse(
            JSON.stringify({
                message: "Address created successfully",
                data: {
                    id: nextId++,
                    alias,
                    address1,
                    address2,
                    zipCode,
                    recipientName,
                    recipientPhone,
                    isDefault: false,
                },
            }),
            {
                status: 201,
            },
        );
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Invalid request" }), { status: 400 });
    }
}
