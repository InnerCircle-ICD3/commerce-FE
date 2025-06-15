import { v4 as uuidv4 } from 'uuid';

const USER_ID_KEY = 'commerce_user_id';

/**
 * 사용자 ID를 가져오거나 없는 경우 새로 생성하여 저장
 * @returns 사용자 식별 ID
 */
export function getUserId(): string {
  // 브라우저 환경에서만 실행
  if (typeof window === 'undefined') {
    return '';
  }

  // 로컬 스토리지에서 기존 ID 가져오기
  let userId = localStorage.getItem(USER_ID_KEY);
  
  // ID가 없으면 새로 생성하여 저장
  if (!userId) {
    userId = uuidv4();
    localStorage.setItem(USER_ID_KEY, userId);
  }
  
  return userId;
}

/**
 * 사용자 ID 초기화 (주로 테스트용)
 */
export function resetUserId(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_ID_KEY);
  }
}
