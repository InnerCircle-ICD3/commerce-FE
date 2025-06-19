import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { toast } from "@/shared/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Check, Copy, Image, Loader2, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { type ImageType, uploadImage } from "../imageUploadApi";

interface ImageUploadProps {
    imageType: ImageType;
    label: string;
    currentImageUrl?: string;
    onImageUploaded: (imageUrl: string) => void;
    onImageRemoved?: () => void;
    onUploadStateChange?: (isUploading: boolean) => void;
    accept?: string;
    maxSize?: number; // MB 단위
    // 이전 버전 호환성
    onUploadComplete?: (imageUrl: string) => void;
    onUploadStart?: () => void;
    onUploadEnd?: () => void;
    error?: string;
}

export default function ImageUpload({
    imageType,
    label,
    currentImageUrl,
    onImageUploaded,
    onImageRemoved,
    onUploadStateChange,
    accept = "image/*",
    maxSize = 5, // 5MB 기본값
    // 이전 버전 호환성
    onUploadComplete,
    onUploadStart,
    onUploadEnd,
    error,
}: ImageUploadProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [copiedUrl, setCopiedUrl] = useState(false);
    const [urlInput, setUrlInput] = useState<string>(currentImageUrl || "");
    const fileInputRef = useRef<HTMLInputElement>(null);

    // currentImageUrl prop이 변경될 때 state 업데이트
    useEffect(() => {
        if (currentImageUrl !== undefined) {
            setPreviewUrl(currentImageUrl || null);
            setUrlInput(currentImageUrl || "");
        }
    }, [currentImageUrl]);

    // 이미지 업로드 뮤테이션
    const uploadMutation = useMutation({
        mutationFn: (file: File) => uploadImage(imageType, file),
        onMutate: () => {
            // 업로드 시작 시 상태 전달
            onUploadStateChange?.(true);
            onUploadStart?.();
        },
        onSuccess: imageUrl => {
            onImageUploaded(imageUrl);
            onUploadComplete?.(imageUrl); // 이전 버전 호환성
            setUrlInput(imageUrl); // 업로드 완료 시 URL 입력폼에 자동 입력
            setSelectedFile(null);
            toast({
                title: "업로드 성공",
                description: "이미지가 성공적으로 업로드되었습니다.",
            });
        },
        onError: error => {
            toast({
                title: "업로드 실패",
                description: error.message || "이미지 업로드에 실패했습니다.",
                variant: "destructive",
            });
        },
        onSettled: () => {
            // 업로드 완료/실패 시 상태 전달
            onUploadStateChange?.(false);
            onUploadEnd?.();
        },
    });

    // 파일 선택 핸들러
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // 파일 크기 검증
        if (file.size > maxSize * 1024 * 1024) {
            toast({
                title: "파일 크기 초과",
                description: `파일 크기는 ${maxSize}MB 이하여야 합니다.`,
                variant: "destructive",
            });
            return;
        }

        // 파일 타입 검증
        if (!file.type.startsWith("image/")) {
            toast({
                title: "파일 형식 오류",
                description: "이미지 파일만 업로드할 수 있습니다.",
                variant: "destructive",
            });
            return;
        }

        setSelectedFile(file);

        // 미리보기 생성
        const reader = new FileReader();
        reader.onload = e => {
            setPreviewUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    // 업로드 실행
    const handleUpload = () => {
        if (!selectedFile) return;
        uploadMutation.mutate(selectedFile);
    };

    // 이미지 제거
    const handleRemove = () => {
        setPreviewUrl(null);
        setSelectedFile(null);
        setUrlInput("");
        onImageRemoved?.();
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // 파일 선택 버튼 클릭
    const handleSelectClick = () => {
        fileInputRef.current?.click();
    };

    // URL 복사
    const handleCopyUrl = async () => {
        if (!urlInput) return;

        try {
            await navigator.clipboard.writeText(urlInput);
            setCopiedUrl(true);
            toast({
                title: "복사 완료",
                description: "이미지 URL이 클립보드에 복사되었습니다.",
            });

            // 3초 후 복사 상태 초기화
            setTimeout(() => setCopiedUrl(false), 3000);
        } catch (error) {
            toast({
                title: "복사 실패",
                description: "URL 복사에 실패했습니다.",
                variant: "destructive",
            });
        }
    };

    // URL 입력 변경 핸들러
    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newUrl = event.target.value.trim();
        setUrlInput(newUrl);

        // URL이 입력되었을 때 미리보기 업데이트
        if (newUrl) {
            // URL 형식 검증 (http://, https://, // 로 시작하거나 상대경로)
            const isValidUrl = newUrl.startsWith("http://") ||
                newUrl.startsWith("https://") ||
                newUrl.startsWith("//") ||
                newUrl.startsWith("/") ||
                newUrl.startsWith("data:");

            if (isValidUrl) {
                setPreviewUrl(newUrl);
                onImageUploaded(newUrl);
                // 선택된 파일 초기화 (URL 입력 시)
                setSelectedFile(null);
            }
        } else {
            // URL이 비어있으면 미리보기 제거
            setPreviewUrl(null);
        }
    };

    return (
        <div className="space-y-4">
            <Label className="text-sm font-medium">{label}</Label>

            {/* 숨겨진 파일 입력 */}
            <Input ref={fileInputRef} type="file" accept={accept} onChange={handleFileSelect} className="hidden" />

            {/* 이미지 미리보기 영역 */}
            {previewUrl ? (
                <div className="space-y-3">
                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4">
                        <img
                            src={previewUrl}
                            alt="미리보기"
                            className="max-w-full max-h-48 mx-auto object-contain"
                            onError={() => {
                                // 이미지 로드 실패 시 미리보기 제거
                                setPreviewUrl(null);
                                toast({
                                    title: "이미지 로드 실패",
                                    description: "유효하지 않은 이미지 URL입니다.",
                                    variant: "destructive",
                                });
                            }}
                        />

                        {/* 제거 버튼 */}
                        <Button type="button" variant="destructive" size="sm" className="absolute top-2 right-2" onClick={handleRemove}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* 업로드 버튼 (새 파일 선택된 경우) */}
                    {selectedFile && (
                        <div className="flex gap-2">
                            <Button type="button" onClick={handleUpload} disabled={uploadMutation.isPending} className="flex-1">
                                {uploadMutation.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        업로드 중...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="mr-2 h-4 w-4" />
                                        업로드
                                    </>
                                )}
                            </Button>
                            <Button type="button" variant="outline" onClick={handleSelectClick}>
                                다른 파일 선택
                            </Button>
                        </div>
                    )}

                    {/* 변경 버튼 (업로드 완료 상태) */}
                    {!selectedFile && (
                        <Button type="button" variant="outline" onClick={handleSelectClick} className="w-full">
                            이미지 변경
                        </Button>
                    )}
                </div>
            ) : (
                /* 파일 선택 영역 */
                <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
                    onClick={handleSelectClick}
                >
                    <Image className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-sm text-gray-600 mb-2">클릭하여 이미지를 선택하세요</p>
                    <p className="text-xs text-gray-400">최대 {maxSize}MB의 이미지 파일을 업로드할 수 있습니다</p>
                </div>
            )}

            {/* 항상 표시되는 URL 입력 폼 */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-gray-700">이미지 URL</Label>
                    {urlInput && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={handleCopyUrl}
                            className="h-7 px-2 text-xs"
                        >
                            {copiedUrl ? (
                                <>
                                    <Check className="h-3 w-3 mr-1" />
                                    복사됨
                                </>
                            ) : (
                                <>
                                    <Copy className="h-3 w-3 mr-1" />
                                    복사
                                </>
                            )}
                        </Button>
                    )}
                </div>
                <Input
                    value={urlInput}
                    onChange={handleUrlChange}
                    placeholder="이미지 URL을 입력하거나 위에서 파일을 업로드하세요"
                    className={`w-full text-sm font-mono ${error ? "border-red-500" : ""}`}
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
                <p className="text-xs text-gray-500">
                    직접 URL을 입력하거나 위에서 파일을 업로드하면 자동으로 입력됩니다.
                </p>
            </div>
        </div>
    );
}
