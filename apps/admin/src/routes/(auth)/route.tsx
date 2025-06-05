import { createRoute } from '@tanstack/react-router'
import { Route as rootRoute } from '../__root'
import AuthLayout from '@/features/common/layout/AuthLayout'

// 인증 상태 확인 함수
const isAuthenticated = () => {
  const authToken = localStorage.getItem('auth-token')
  return authToken === 'abcd'
}

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  id: 'auth',
  component: AuthLayout,
  beforeLoad: () => {
    // 이미 로그인된 경우 대시보드로 리디렉션
    if (isAuthenticated()) {
      return {
        redirect: '/',
      }
    }
    return {}
  },
})
