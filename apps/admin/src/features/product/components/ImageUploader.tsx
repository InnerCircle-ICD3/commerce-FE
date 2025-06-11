import { useState } from "react";
import { api as apiClient } from "../../../shared/kyInstance";

interface ImageUploaderProps {
    label: string;
    domainContext: "THUMBNAIL" | "DETAIL";
    contextId?: string;
    onUploadComplete: (key: string) => void;
    onContextIdReceived: (contextId: string) => void;
    onError: (error: Error) => void;
}

interface PresignedUrlResponse {
    uploadUrl: string;
    key: string;
    fields: { [key: string]: string };
    contextId?: string;
}

interface PresignedUrlPayload {
    fileName: string;
    contentType: string;
    fileSize: number;
    domainType: "PRODUCT";
    domainContext: "THUMBNAIL" | "DETAIL";
    contextId?: string;
}

export default function ImageUploader({ label, domainContext, contextId, onUploadComplete, onContextIdReceived, onError }: ImageUploaderProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const inputId = `file-upload-${label}`;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file first.");
            return;
        }

        setIsUploading(true);

        try {
            // 1. Get presigned URL from our backend
            const payload: PresignedUrlPayload = {
                fileName: selectedFile.name,
                contentType: selectedFile.type,
                fileSize: selectedFile.size,
                domainType: "PRODUCT",
                domainContext: domainContext,
            };
            if (contextId) {
                payload.contextId = contextId;
            }
            console.log("payload: ", payload);

            const presignedData = await apiClient
                .post("files/presigned-url", {
                    json: payload,
                })
                .json<PresignedUrlResponse>();
            console.log("presignedData: ", presignedData);

            // If server returns a new contextId, update the parent state
            if (presignedData.contextId && !contextId) {
                onContextIdReceived(presignedData.contextId);
            }

            // 2. Upload file to S3 using the presigned URL with POST
            const formData = new FormData();

            // if (!presignedData.fields) {
            //     throw new Error(
            //         "Presigned URL 응답에 'fields' 객체가 포함되어 있지 않습니다. S3 POST 업로드에는 필수적입니다. 백엔드 API를 확인해주세요."
            //     );
            // }

            // Append all fields from the presigned response
            for (const [key, value] of Object.entries(presignedData.fields)) {
                formData.append(key, value as string);
            }

            // IMPORTANT: The file field must be the last field added to the form.
            formData.append("file", selectedFile);
            console.log("formData: ", formData);

            // The browser will automatically set the 'Content-Type' to 'multipart/form-data'
            // with the correct boundary when the body is a FormData instance.
            // The browser will automatically set the 'Content-Type' to 'multipart/form-data'
            // with the correct boundary when the body is a FormData instance.
            // We are using the standard `fetch` API for the S3 upload to work around a
            // persistent internal error in the `ky` library with this specific type of request.
            const response = await fetch(presignedData.uploadUrl, {
                method: "POST",
                body: formData,
            });
            console.log("response: ", response);

            if (!response.ok) {
                // Try to get more detailed error information from S3's XML response
                const errorText = await response.text();
                console.error("S3 upload failed. Response body:", errorText);
                throw new Error(`S3 upload failed with status ${response.status}.`);
            }
            console.log("response ok");

            // 3. Notify parent component of success
            onUploadComplete(presignedData.key);
            alert("Upload successful!");
        } catch (err) {
            console.error("Upload failed:", err);
            alert("Upload failed. Please check the console for details.");
            if (err instanceof Error) {
                onError(err);
            }
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div>
            <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="mt-1 flex items-center space-x-4">
                <input
                    id={inputId}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <button
                    type="button"
                    onClick={handleUpload}
                    disabled={!selectedFile || isUploading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400"
                >
                    {isUploading ? "Uploading..." : "Upload"}
                </button>
            </div>
            {preview && (
                <div className="mt-4">
                    <img src={preview} alt={`${label} preview`} className="h-32 w-32 object-cover rounded-md" />
                </div>
            )}
        </div>
    );
}
