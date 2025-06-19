import log from 'loglevel';

// 환경에 따른 로그 레벨 설정
const isDev = import.meta.env.DEV || import.meta.env.MODE === 'development';

// 개발 환경에서는 DEBUG, 프로덕션에서는 WARN 레벨로 설정
log.setLevel(isDev ? log.levels.DEBUG : log.levels.WARN);

/**
 * 애플리케이션 전역 로거
 */
export const logger = {
    debug: (...args: any[]) => log.debug(...args),
    info: (...args: any[]) => log.info(...args),
    warn: (...args: any[]) => log.warn(...args),
    error: (...args: any[]) => log.error(...args),
};

/**
 * 특정 모듈용 로거 생성
 */
export function createLogger(moduleName: string) {
    return {
        debug: (...args: any[]) => logger.debug(`[${moduleName}]`, ...args),
        info: (...args: any[]) => logger.info(`[${moduleName}]`, ...args),
        warn: (...args: any[]) => logger.warn(`[${moduleName}]`, ...args),
        error: (...args: any[]) => logger.error(`[${moduleName}]`, ...args),
    };
}

/**
 * API 관련 전용 로거
 */
export const apiLogger = createLogger('API');

/**
 * 파일 업로드 관련 전용 로거
 */
export const uploadLogger = createLogger('Upload');

/**
 * 상품 관련 전용 로거
 */
export const productLogger = createLogger('Product');

// 레거시 호환을 위한 별칭들
export const devLog = logger.debug;
export const devInfo = logger.info;
export const devWarn = logger.warn;
export const devError = logger.error;

/**
 * API 관련 로그 유틸리티
 */
export const apiLog = {
    request: (method: string, url: string, data?: any) => {
        devLog(`🌐 API 요청: ${method.toUpperCase()} ${url}`, data ? { data } : '');
    },
    response: (method: string, url: string, response: any) => {
        devLog(`📥 API 응답: ${method.toUpperCase()} ${url}`, response);
    },
    error: (method: string, url: string, error: any) => {
        devError(`🔥 API 에러: ${method.toUpperCase()} ${url}`, error);
    }
};

/**
 * 상품 관련 로그 유틸리티
 */
export const productLog = {
    formSubmit: (action: string, data?: any) => {
        devLog(`📝 상품 폼 ${action}`, data || '');
    },
    mutation: (action: string, status: 'start' | 'success' | 'error', data?: any) => {
        const emoji = status === 'start' ? '🚀' : status === 'success' ? '✅' : '❌';
        const message = `${emoji} 상품 ${action} ${status === 'start' ? '시작' : status === 'success' ? '성공' : '실패'}`;

        if (status === 'error') {
            devError(message, data);
        } else {
            devLog(message, data || '');
        }
    },
    validation: (isValid: boolean, errors?: any) => {
        if (isValid) {
            devLog('✔️ 폼 유효성 검사 통과');
        } else {
            devWarn('❌ 폼 유효성 검사 실패', errors);
        }
    },
    upload: (step: string, data?: any) => {
        devLog(`📤 이미지 업로드: ${step}`, data || '');
    },
    draft: (action: 'save' | 'load' | 'restore' | 'clear', data?: any) => {
        const actionMap = {
            save: '💾 임시저장',
            load: '📂 임시저장 데이터 로드',
            restore: '🔄 임시저장 데이터 복원',
            clear: '🗑️ 임시저장 데이터 삭제'
        };
        devLog(actionMap[action], data || '');
    }
};

/**
 * 이미지 업로드 관련 로그 유틸리티
 */
export const uploadLog = {
    start: (imageType: string, file: { name: string; type: string; size: number }) => {
        devLog(`[업로드 시작] ${imageType}:`, file);
    },
    presigned: (url: string, key: string) => {
        devLog(`[Presigned URL 생성]`, { url, key });
    },
    s3Upload: (status: 'start' | 'success' | 'error', data?: any) => {
        if (status === 'start') {
            devLog(`[S3 업로드 시작]`);
        } else if (status === 'success') {
            devLog(`[S3 업로드 성공]`);
        } else {
            devError(`[S3 업로드 실패]`, data);
        }
    },
    complete: (fullUrl: string) => {
        devLog(`[업로드 완료] 이미지 URL:`, fullUrl);
    },
    error: (step: string, error: any) => {
        devError(`[업로드 오류] ${step}:`, error);
    }
}; 