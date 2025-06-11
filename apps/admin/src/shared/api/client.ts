// API 클라이언트 기본 설정
import ky from 'ky';
import type { ApiResponse } from './types';

// API 기본 URL
const API_BASE_URL = import.meta.env.VITE_API_URL;

// HTTP 요청 기본 설정
const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30초 타임아웃
  retry: 1, // 실패 시 1번 재시도
  hooks: {
    // API 응답 구조에 맞게 응답을 변환하는 후크
    afterResponse: [
      async (_request: Request, _options: Options, response: Response) => {
        if (!response.ok) return response;
        
        const result: ApiResponse<unknown> = await response.json();
        
        // 에러가 있는 경우 처리
        if (result.error) {
          throw new Error(result.error);
        }
        
        // 성공 시 data 필드만 반환
        return new Response(JSON.stringify(result.data), response);
      }
    ],
  },
};

// 기본 API 클라이언트 인스턴스 생성
export const api = ky.extend({
  prefixUrl: API_BASE_URL,
  ...defaultOptions
});

// KY 인스턴스에서 사용할 헤더 준비 함수

// 인증이 필요한 API 클라이언트 가져오기
export const getAuthClient = () => {
  return api.extend({
    hooks: {
      beforeRequest: [
        async (request) => {
          // Headers 객체는 읽기 전용이므로 set 메서드를 사용하여 개별적으로 설정
          const token = localStorage.getItem('token');
          if (token) {
            request.headers.set('Authorization', `Bearer ${token}`);
          }
        }
      ]
    }
  });
};

/**
 * API 요청 래퍼 함수들
 */

// GET 요청
export async function get<T>(path: string, params?: Record<string, any>): Promise<T> {
  return api.get(path, { searchParams: cleanParams(params) }).json<T>();
}

// POST 요청
export async function post<T>(path: string, data?: any): Promise<T> {
  return api.post(path, { json: data }).json<T>();
}

// PUT 요청
export async function put<T>(path: string, data?: any): Promise<T> {
  return api.put(path, { json: data }).json<T>();
}

// DELETE 요청
export async function del<T>(path: string): Promise<T> {
  return api.delete(path).json<T>();
}

// 인증된 GET 요청
export async function authGet<T>(path: string, params?: Record<string, any>): Promise<T> {
  return getAuthClient().get(path, { searchParams: cleanParams(params) }).json<T>();
}

// 인증된 POST 요청
export async function authPost<T>(path: string, data?: any): Promise<T> {
  return getAuthClient().post(path, { json: data }).json<T>();
}

// 인증된 PUT 요청
export async function authPut<T>(path: string, data?: any): Promise<T> {
  return getAuthClient().put(path, { json: data }).json<T>();
}

// 인증된 DELETE 요청
export async function authDel<T>(path: string): Promise<T> {
  return getAuthClient().delete(path).json<T>();
}

// 파라미터에서 빈 값 제거
function cleanParams(params?: Record<string, any>): Record<string, any> {
  if (!params) return {};
  
  return Object.entries(params).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, any>);
}
