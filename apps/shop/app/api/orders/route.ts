import { NextResponse } from "next/server";

export async function GET() {
    const response = await fetch("http://3.39.233.3:8080/orders", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer Simeple-Token",
        },
    });
    const data = await response.json();
    return NextResponse.json(data);
}

export async function POST(request: Request) {
    const body = await request.json();
    return NextResponse.json({ message: "success" });
}
