"use client";

import { useEffect } from 'react';
import { getUserId } from '@/src/lib/userId';

/**
 * 앱 초기화 시 사용자 ID를 생성하고 로컬 스토리지에 저장하는 컴포넌트
 * Next.js의 클라이언트 컴포넌트로, 브라우저 환경에서만 실행됩니다.
 */
export default function UserIdInitializer() {
  useEffect(() => {
    // 컴포넌트가 마운트될 때 사용자 ID 초기화 (없으면 생성)
    getUserId();
  }, []);

  // 이 컴포넌트는 UI를 렌더링하지 않고 초기화 로직만 수행합니다
  return null;
}
