import { useCancelOrder } from "@/features/order/hooks/useCancelOrder";
import { useOrderDetail } from "@/features/order/hooks/useOrderDetail";
import { useUpdateTrackingNumber } from "@/features/order/hooks/useUpdateTrackingNumber";
import { Route } from "@/routes/_authenticated/orders/$orderId";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table/table";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";

export default function OrderDetailPage() {
    const { orderId } = Route.useParams();
    const router = useRouter();

    const { order } = useOrderDetail(Number(orderId));
    const [inputTrackingNumber, setInputTrackingNumber] = useState<string>("");

    const { cancelOrderMutation } = useCancelOrder(Number(orderId));
    const { updateTrackingNumberMutation } = useUpdateTrackingNumber(Number(orderId));

    const handleBack = () => {
        if (router.history.canGoBack()) router.history.back();
    };

    return (
        <div>
            <div className="flex items-center">
                <div onClick={handleBack}>
                    <svg width={32} height={32} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
                        <title>뒤로가기</title>
                        <path d="M20 24L12 16L20 8" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <h2 className="text-h2 font-bold text-gray-900">주문 상세보기</h2>
            </div>
            <div className="bg-white shadow-sm rounded-lg mt-4">
                <Table className="[&_th]:w-50">
                    <TableBody>
                        <TableRow>
                            <TableHead>주문번호</TableHead>
                            <TableCell>{order?.orderNumber}</TableCell>
                            <TableHead rowSpan={2}>배송주소</TableHead>
                            <TableCell rowSpan={2}>{`${order?.shippingInfo.address1} ${order?.shippingInfo.address2}`}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>주문일자</TableHead>
                            <TableCell>{order?.orderedAt}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>주문자명</TableHead>
                            <TableCell>{order?.shippingInfo.recipientName}</TableCell>
                            <TableHead>연락처</TableHead>
                            <TableCell>{order?.shippingInfo.recipientPhone}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>주문상태</TableHead>
                            <TableCell colSpan={3}>
                                {order?.orderStatus}
                                {order?.cancellable && (
                                    <Button
                                        type="button"
                                        className="rounded-md bg-red-500 text-sm font-medium text-white shadow-sm hover:bg-red-600 ml-4"
                                        size="sm"
                                        onClick={() => {
                                            cancelOrderMutation();
                                        }}
                                    >
                                        주문 취소
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>운송장번호</TableHead>
                            <TableCell colSpan={3}>
                                {order?.trackingNumber ||
                                    (order?.orderStatus === "PAID" && (
                                        <>
                                            <Input
                                                type="text"
                                                className="w-100"
                                                value={inputTrackingNumber}
                                                onChange={e => setInputTrackingNumber(e.target.value)}
                                            />
                                            <Button
                                                type="button"
                                                className="ml-2 rounded-md text-sm font-medium shadow-sm"
                                                size="sm"
                                                variant="outline"
                                                onClick={() => {
                                                    if (inputTrackingNumber.trim() !== "") {
                                                        updateTrackingNumberMutation({
                                                            orderId: Number(orderId),
                                                            trackingNumber: inputTrackingNumber,
                                                        });
                                                    }
                                                }}
                                            >
                                                운송장 등록
                                            </Button>
                                        </>
                                    ))}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <div className="mt-10">
                <h2 className="text-h2 font-bold text-gray-900">결제 정보</h2>
                <div className="bg-white shadow-sm rounded-lg mt-4">
                    <Table className="[&_th]:w-50">
                        <TableBody>
                            <TableRow>
                                <TableHead>결제번호</TableHead>
                                <TableCell>{order?.paymentNumber}</TableCell>
                                <TableHead>결제일시</TableHead>
                                <TableCell>{order?.paidAt}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>결제방법</TableHead>
                                <TableCell>{order?.paymentMethod}</TableCell>
                                <TableHead>결제상태</TableHead>
                                <TableCell>{order?.paymentStatus}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>주문금액</TableHead>
                                <TableCell>₩{order?.finalTotalPrice?.toLocaleString()}</TableCell>
                                <TableHead>배송비</TableHead>
                                <TableCell>₩{order?.shippingFee?.toLocaleString()}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>총 결제 금액</TableHead>
                                <TableCell>₩{order?.finalTotalPrice?.toLocaleString()}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className="mt-10">
                <h2 className="text-h2 font-bold text-gray-900">주문 상품</h2>
                <div className="bg-white shadow-sm rounded-lg mt-4">
                    <Table className="[&_th]:w-50">
                        <TableHeader>
                            <TableRow>
                                <TableHead>상품번호</TableHead>
                                <TableHead>상품명</TableHead>
                                <TableHead>수량</TableHead>
                                <TableHead>가격</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {order?.items.map(item => (
                                <TableRow key={item.orderItemId}>
                                    <TableCell>{item.productId}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{(item.unitPrice * item.quantity).toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
