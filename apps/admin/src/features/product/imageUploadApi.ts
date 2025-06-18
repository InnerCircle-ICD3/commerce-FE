import { post } from "@/shared/kyInstance";
import { logger } from "@/shared/utils/logger";

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
    logger.debug("[Upload] extractS3BucketUrl - Input URL:", presignedUrl);

    try {
        const url = new URL(presignedUrl);
        logger.debug("[Upload] extractS3BucketUrl - Parsed URL:", {
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
            logger.debug("[Upload] extractS3BucketUrl - Detected format 1 (bucket in hostname):", bucketUrl);
        } else if (url.hostname === 's3.amazonaws.com' || url.hostname.startsWith('s3-')) {
            // 두 번째 형식: bucket이 path의 첫 부분
            bucketUrl = `${url.protocol}//${url.hostname}/${pathParts[1]}`;
            logger.debug("[Upload] extractS3BucketUrl - Detected format 2 (bucket in path):", bucketUrl);
        } else {
            // 기본값으로 전체 origin 반환
            bucketUrl = url.origin;
            logger.debug("[Upload] extractS3BucketUrl - Using default origin:", bucketUrl);
        }

        return bucketUrl;
    } catch (error) {
        logger.error('[Upload] extractS3BucketUrl - Failed to extract S3 bucket URL:', error);
        throw new Error('잘못된 presigned URL 형식입니다.');
    }
}

/**
 * S3 key를 전체 URL로 변환
 */
export function getImageUrl(key: string): string {
    logger.debug("[getImageUrl] Converting key to URL:", key);
    logger.debug("[getImageUrl] Current s3BucketUrl:", s3BucketUrl);

    // key가 이미 전체 URL인 경우 그대로 반환
    if (key.startsWith("http://") || key.startsWith("https://")) {
        logger.debug("[getImageUrl] Key is already a full URL:", key);
        return key;
    }

    if (!s3BucketUrl) {
        logger.error("[Upload] getImageUrl - S3 bucket URL not set!");
        throw new Error("S3 버킷 URL이 설정되지 않았습니다. 먼저 이미지를 업로드해주세요.");
    }

    // S3 버킷 URL과 key를 조합하여 전체 URL 생성
    const fullUrl = `${s3BucketUrl}/${key}`;
    logger.debug("[getImageUrl] Generated full URL:", fullUrl);
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

    logger.debug("[getPresignedUrl] Request data:", fullRequest);

    try {
        const response = await post<PresignedUrlResponse>("files/presigned-url", fullRequest);
        logger.debug("[getPresignedUrl] Response data:", response);

        // 응답 데이터 검증
        if (!response.uploadUrl || !response.key) {
            logger.error("[Upload] getPresignedUrl - Invalid response - missing required fields:", response);
            throw new Error("서버 응답이 올바르지 않습니다.");
        }

        return response;
    } catch (error) {
        logger.error("[Upload] getPresignedUrl - Error occurred:", error);
        throw error;
    }
}

/**
 * S3에 이미지 업로드
 */
export async function uploadImageToS3(presignedUrl: string, file: File): Promise<void> {
    logger.debug("[uploadImageToS3] Starting upload");
    logger.debug("[uploadImageToS3] Presigned URL:", presignedUrl);
    logger.debug("[uploadImageToS3] File info:", {
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

        logger.debug("[uploadImageToS3] Response status:", response.status);
        logger.debug("[uploadImageToS3] Response headers:", Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
            const errorText = await response.text();
            logger.error("[uploadImageToS3] Upload failed:", {
                status: response.status,
                statusText: response.statusText,
                errorBody: errorText
            });
            throw new Error(`이미지 업로드에 실패했습니다. (${response.status})`);
        }

        logger.debug("[uploadImageToS3] Upload successful!");
    } catch (error) {
        logger.error("[uploadImageToS3] Error during upload:", error);
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
    logger.debug("[uploadImage] Starting upload process");
    logger.debug("[uploadImage] Image type:", imageType);
    logger.debug("[uploadImage] File:", {
        name: file.name,
        type: file.type,
        size: file.size
    });

    // 파일 정보 추출
    const fileName = file.name;  // 원본 파일명 그대로 사용 (백엔드가 유니크한 이름으로 변경)
    const contentType = file.type;
    const fileSize = file.size;

    logger.debug("[uploadImage] Prepared file info:", { fileName, contentType, fileSize });

    try {
        // presigned URL 요청
        logger.debug("[uploadImage] Step 1: Requesting presigned URL...");
        const { uploadUrl, key } = await getPresignedUrl(imageType, {
            fileName,
            contentType,
            fileSize,
        });

        logger.debug("[uploadImage] Received presigned URL response:", { uploadUrl, key });

        // presigned URL에서 S3 버킷 URL 추출 (최초 1회만)
        if (!s3BucketUrl) {
            logger.debug("[uploadImage] Extracting S3 bucket URL...");
            s3BucketUrl = extractS3BucketUrl(uploadUrl);
            logger.debug("[uploadImage] Extracted S3 bucket URL:", s3BucketUrl);
        }

        // S3에 이미지 업로드
        logger.debug("[uploadImage] Step 2: Uploading to S3...");
        await uploadImageToS3(uploadUrl, file);

        // 업로드된 이미지의 전체 URL 반환
        logger.debug("[uploadImage] Step 3: Generating full image URL...");
        const fullImageUrl = getImageUrl(key);
        logger.debug("[uploadImage] Upload complete! Full URL:", fullImageUrl);

        return fullImageUrl;
    } catch (error) {
        logger.error("[uploadImage] Upload process failed:", error);
        throw error;
    }
}
