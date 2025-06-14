import { Route } from "@/routes/_authenticated/orders/$orderNumber";
import { Table, TableCell, TableHead, TableRow } from "@/shared/components/ui/table/table";

export default function OrderDetailPage() {
    const { orderNumber } = Route.useParams();
    return (
        <div>
            <div>
                <h2 className="text-h2 font-bold text-gray-900">주문 상세보기</h2>
            </div>

            <div className="">
                <Table className="w-auto bg-white shadow-sm rounded-lg overflow-hidden min-w-96">
                    <TableRow>
                        <TableHead>주문번호</TableHead>
                        <TableCell>{orderNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableHead>주문자명</TableHead>
                        <TableCell>{orderNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableHead>결제금제</TableHead>
                        <TableCell>{orderNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableHead>주문상태</TableHead>
                        <TableCell>{orderNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableHead>주문번호</TableHead>
                        <TableCell>{orderNumber}</TableCell>
                    </TableRow>
                </Table>
            </div>
        </div>
    );
}
