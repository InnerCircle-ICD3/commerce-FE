export default function ErrorComponent({ code, message }: { code: string; message: string }) {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">페이지를 불러오는 데 실패했습니다.</h1>
            <p className="mt-4">잠시 후 다시 시도해주세요.</p>
            <p className="mt-2 text-red-500">{message}</p>
            <p className="mt-2 text-gray-500">에러 코드: {code}</p>
        </div>
    );
}
