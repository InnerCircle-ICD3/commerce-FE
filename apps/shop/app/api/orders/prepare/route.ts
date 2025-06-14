import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const cartItemIds = searchParams.get("cartItemIds");

    const response = await fetch(`http://3.39.233.3:8080/orders/prepare?cartItemIds=${cartItemIds}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer Simeple-Token",
        },
    });
    const data = await response.json();
    return NextResponse.json(data);
}
