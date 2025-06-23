import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
    alias: z.string().min(1, "배송지명을 입력해주세요.").optional(),
    address1: z.string().min(1, "주소를 입력해주세요."),
    address2: z.string().min(1, "상세주소를 입력해주세요."),
    zipCode: z.string().min(1, "우편번호를 입력해주세요."),
    recipientName: z.string().min(1, "받는 사람 이름을 입력해주세요."),
    recipientPhone: z.string().min(1, "받는 사람 전화번호를 입력해주세요."),
    isDefault: z.boolean().optional(),
});

export async function GET() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/addresses`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer Simeple-Token",
            },
        });
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.log("GET- /addresses", error);
        return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/addresses`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer Simeple-Token",
            },
        });

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }
}
