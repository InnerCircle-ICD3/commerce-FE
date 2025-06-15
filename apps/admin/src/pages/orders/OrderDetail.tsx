import { Route } from "@/routes/_authenticated/orders/$orderNumber";
import { Table, TableCell, TableHead, TableRow } from "@/shared/components/ui/table/table";

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
            <div>
                <h2 className="text-h2 font-bold text-gray-900">주문 상세보기</h2>
            </div>

            <div className="">
                <Table className="bg-white shadow-sm rounded-lg">
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
            </div>
        </div>
    );
}
