import { Button } from "@/src/shared/components/shared/button";
import Link from "next/link";

export default function Page() {
    return (
        <div className="p-8 flex flex-col items-start gap-4">
            <Link href="/main">
                <Button className="w-auto">(임시) 메인 페이지로 이동</Button>
            </Link>
            <Link href="/login">
                <Button className="w-auto">(임시) 로그인 페이지로 이동</Button>
            </Link>
            <Link href="/search">
                <Button className="w-auto">(임시) 검색 결과 페이지로 이동</Button>
            </Link>
            <Link href="/product/1">
                <Button className="w-auto">(임시) 커피 상품 상세 페이지로 이동</Button>
            </Link>
            <Link href="/order">
                <Button className="w-auto">(임시) 주문 내역 리스트 페이지로 이동</Button>
            </Link>
            <Link href="/order/123456456789">
                <Button className="w-auto">(임시) 주문 상세 페이지로 이동</Button>
            </Link>
            <Link href="/products/1/review">
                <Button className="w-auto">(임시) 상품의 리뷰 리스트 페이지로 이동</Button>
            </Link>
            <Link href="/review/my">
                <Button className="w-auto">(임시) 내 리뷰 리스트 페이지로 이동</Button>
            </Link>
            <Link href="/review/create">
                <Button className="w-auto">(임시) 리뷰 작성 팝업창 미리보기</Button>
            </Link>
        </div>
    );
} 