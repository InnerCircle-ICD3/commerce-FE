import { Route } from "@/routes/_authenticated/orders/$orderNumber";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table/table";

type OrderDetail = {
    orderNumber: string;
    orderName: string;
    orderStatus: string;
    finalTotalPrice: number;
    cancellable: boolean;
    refundable: boolean;
    orderedAt: string;
    items: {
        productName: string;
        productPrice: number;
        productQuantity: number;
        productImage: string;
    }[];
    shippingInfo: {
        address1: string;
        address2: string;
        recipientName: string;
        recipientPhone: string;
        zipCode: string;
    };
};
export default function OrderDetailPage() {
    const { orderNumber } = Route.useParams();
    return (
        <div>
            <div className="flex justify-between items-center">
                <h2 className="text-h2 font-bold text-gray-900">주문 상세보기</h2>
                <div>
                    <button type="button" className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600">
                        주문 취소
                    </button>
                </div>
            </div>
            <div className="bg-white shadow-sm rounded-lg mt-4">
                <Table>
                    <TableRow>
                        <TableHead>주문번호</TableHead>
                        <TableCell>{orderNumber}</TableCell>
                        <TableHead rowSpan={2}>배송주소</TableHead>
                        <TableCell rowSpan={2}>{orderNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableHead>주문일자</TableHead>
                        <TableCell>2025-01-01</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableHead>주문자명</TableHead>
                        <TableCell>홍길동</TableCell>
                        <TableHead>연락처</TableHead>
                        <TableCell>010-1234-5678</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableHead>주문상태</TableHead>
                        <TableCell colSpan={3}>주문완료</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableHead>택배사</TableHead>
                        <TableCell>우체국택배</TableCell>
                        <TableHead>운송장번호</TableHead>
                        <TableCell>1234567890</TableCell>
                    </TableRow>
                </Table>
            </div>
            <div className="mt-10">
                <h2 className="text-h2 font-bold text-gray-900">결제 정보</h2>
                <div className="bg-white shadow-sm rounded-lg mt-4">
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableHead>결제번호</TableHead>
                                <TableCell>{orderNumber}</TableCell>
                                <TableHead>결제일시</TableHead>
                                <TableCell>2025-01-01 12:00:00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>주문금액</TableHead>
                                <TableCell>₩{(10000).toLocaleString()}</TableCell>
                                <TableHead>배송비</TableHead>
                                <TableCell>₩3,000</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>총 결제 금액</TableHead>
                                <TableCell>₩{(10000 + 3000).toLocaleString()}</TableCell>
                                <TableHead>결제 상태</TableHead>
                                <TableCell>결제 완료</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className="mt-10">
                <h2 className="text-h2 font-bold text-gray-900">주문 상품</h2>
                <div className="bg-white shadow-sm rounded-lg mt-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>상품번호</TableHead>
                                <TableHead>상품명</TableHead>
                                <TableHead>수량</TableHead>
                                <TableHead>수량</TableHead>
                                <TableHead>가격</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>상품명</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>₩{(10000).toLocaleString()}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
