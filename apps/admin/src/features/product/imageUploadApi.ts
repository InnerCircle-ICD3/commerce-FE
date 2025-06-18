import { post } from "@/shared/kyInstance";

// Presigned URL 요청 타입 (백엔드 API에 맞게 수정)
export interface PresignedUrlRequest {
    fileName: string;
    contentType: string;
    fileSize: number;
    domainType: string;
    domainContext: string;
    contextId?: string;
}

// Presigned URL 응답 타입 (백엔드 API에 맞게 수정)
export interface PresignedUrlResponse {
    uploadUrl: string;
    key: string;
    contextId: string;
}

// 이미지 업로드 타입 (썸네일 또는 상세 이미지)
export type ImageType = "thumbnail" | "detail";

// S3 버킷 URL을 저장할 변수 (presigned URL에서 자동으로 추출)
let s3BucketUrl: string | null = null;

/**
 * Presigned URL에서 S3 버킷 URL 추출
 */
function extractS3BucketUrl(presignedUrl: string): string {
    console.log("[extractS3BucketUrl] Input URL:", presignedUrl);

    try {
        const url = new URL(presignedUrl);
        console.log("[extractS3BucketUrl] Parsed URL:", {
            protocol: url.protocol,
            hostname: url.hostname,
            pathname: url.pathname,
            origin: url.origin
        });

        // S3 URL 형식: https://bucket-name.s3.region.amazonaws.com/key
        // 또는: https://s3.region.amazonaws.com/bucket-name/key
        const pathParts = url.pathname.split('/');
        let bucketUrl: string;

        if (url.hostname.includes('.s3.')) {
            // 첫 번째 형식: bucket이 hostname에 포함됨
            bucketUrl = `${url.protocol}//${url.hostname}`;
            console.log("[extractS3BucketUrl] Detected format 1 (bucket in hostname):", bucketUrl);
        } else if (url.hostname === 's3.amazonaws.com' || url.hostname.startsWith('s3-')) {
            // 두 번째 형식: bucket이 path의 첫 부분
            bucketUrl = `${url.protocol}//${url.hostname}/${pathParts[1]}`;
            console.log("[extractS3BucketUrl] Detected format 2 (bucket in path):", bucketUrl);
        } else {
            // 기본값으로 전체 origin 반환
            bucketUrl = url.origin;
            console.log("[extractS3BucketUrl] Using default origin:", bucketUrl);
        }

        return bucketUrl;
    } catch (error) {
        console.error('[extractS3BucketUrl] Failed to extract S3 bucket URL:', error);
        throw new Error('잘못된 presigned URL 형식입니다.');
    }
}

/**
 * S3 key를 전체 URL로 변환
 */
export function getImageUrl(key: string): string {
    console.log("[getImageUrl] Converting key to URL:", key);
    console.log("[getImageUrl] Current s3BucketUrl:", s3BucketUrl);

    // key가 이미 전체 URL인 경우 그대로 반환
    if (key.startsWith("http://") || key.startsWith("https://")) {
        console.log("[getImageUrl] Key is already a full URL:", key);
        return key;
    }

    if (!s3BucketUrl) {
        console.error("[getImageUrl] S3 bucket URL not set!");
        throw new Error("S3 버킷 URL이 설정되지 않았습니다. 먼저 이미지를 업로드해주세요.");
    }

    // S3 버킷 URL과 key를 조합하여 전체 URL 생성
    const fullUrl = `${s3BucketUrl}/${key}`;
    console.log("[getImageUrl] Generated full URL:", fullUrl);
    return fullUrl;
}

/**
 * presigned URL 요청
 */
export async function getPresignedUrl(imageType: ImageType, request: Omit<PresignedUrlRequest, 'domainType' | 'domainContext'>): Promise<PresignedUrlResponse> {
    const fullRequest: PresignedUrlRequest = {
        ...request,
        domainType: "PRODUCT",
        domainContext: imageType,
    };

    console.log("[getPresignedUrl] Request data:", fullRequest);

    try {
        const response = await post<PresignedUrlResponse>("files/presigned-url", fullRequest);
        console.log("[getPresignedUrl] Response data:", response);

        // 응답 데이터 검증
        if (!response.uploadUrl || !response.key) {
            console.error("[getPresignedUrl] Invalid response - missing required fields:", response);
            throw new Error("서버 응답이 올바르지 않습니다.");
        }

        return response;
    } catch (error) {
        console.error("[getPresignedUrl] Error occurred:", error);
        throw error;
    }
}

/**
 * S3에 이미지 업로드
 */
export async function uploadImageToS3(presignedUrl: string, file: File): Promise<void> {
    console.log("[uploadImageToS3] Starting upload");
    console.log("[uploadImageToS3] Presigned URL:", presignedUrl);
    console.log("[uploadImageToS3] File info:", {
        name: file.name,
        type: file.type,
        size: file.size
    });

    try {
        const response = await fetch(presignedUrl, {
            method: "PUT",
            body: file,
            headers: {
                "Content-Type": file.type,
            },
        });

        console.log("[uploadImageToS3] Response status:", response.status);
        console.log("[uploadImageToS3] Response headers:", Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
            const errorText = await response.text();
            console.error("[uploadImageToS3] Upload failed:", {
                status: response.status,
                statusText: response.statusText,
                errorBody: errorText
            });
            throw new Error(`이미지 업로드에 실패했습니다. (${response.status})`);
        }

        console.log("[uploadImageToS3] Upload successful!");
    } catch (error) {
        console.error("[uploadImageToS3] Error during upload:", error);
        throw error;
    }
}

/**
 * 완전한 이미지 업로드 프로세스
 * 1. presigned URL 요청
 * 2. S3에 이미지 업로드
 * 3. 업로드된 이미지의 전체 URL 반환
 */
export async function uploadImage(imageType: ImageType, file: File): Promise<string> {
    console.log("[uploadImage] Starting upload process");
    console.log("[uploadImage] Image type:", imageType);
    console.log("[uploadImage] File:", {
        name: file.name,
        type: file.type,
        size: file.size
    });

    // 파일 정보 추출
    const fileName = file.name;  // 원본 파일명 그대로 사용 (백엔드가 유니크한 이름으로 변경)
    const contentType = file.type;
    const fileSize = file.size;

    console.log("[uploadImage] Prepared file info:", { fileName, contentType, fileSize });

    try {
        // presigned URL 요청
        console.log("[uploadImage] Step 1: Requesting presigned URL...");
        const { uploadUrl, key } = await getPresignedUrl(imageType, {
            fileName,
            contentType,
            fileSize,
        });

        console.log("[uploadImage] Received presigned URL response:", { uploadUrl, key });

        // presigned URL에서 S3 버킷 URL 추출 (최초 1회만)
        if (!s3BucketUrl) {
            console.log("[uploadImage] Extracting S3 bucket URL...");
            s3BucketUrl = extractS3BucketUrl(uploadUrl);
            console.log("[uploadImage] Extracted S3 bucket URL:", s3BucketUrl);
        }

        // S3에 이미지 업로드
        console.log("[uploadImage] Step 2: Uploading to S3...");
        await uploadImageToS3(uploadUrl, file);

        // 업로드된 이미지의 전체 URL 반환
        console.log("[uploadImage] Step 3: Generating full image URL...");
        const fullImageUrl = getImageUrl(key);
        console.log("[uploadImage] Upload complete! Full URL:", fullImageUrl);

        return fullImageUrl;
    } catch (error) {
        console.error("[uploadImage] Upload process failed:", error);
        throw error;
    }
}
