import { type NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ addressId: string }> }) {
    const { addressId } = await params;
    try {
        const response = await fetch(`http://3.39.233.3:8080/users/addresses/${addressId}`, {
            method: "DELETE",
        });
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ addressId: string }> }) {
    const { addressId } = await params;
    const body = await req.json();

    try {
        const response = await fetch(`http://3.39.233.3:8080/users/addresses/${addressId}`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer Simeple-Token",
            },
        });
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }
        return NextResponse.json(data);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }
}
