# 네이버 로그인 설정 가이드

## 개요
NextAuth를 사용한 네이버 소셜 로그인이 구현되었습니다. 로그인 완료 후 백엔드 서버로 사용자 정보와 토큰을 자동 전송합니다.

## 1. 네이버 개발자 센터 설정

1. [네이버 개발자 센터](https://developers.naver.com/main/) 접속
2. "Application" → "애플리케이션 등록" 클릭
3. 다음 정보 입력:
   - **애플리케이션 이름**: 원하는 이름
   - **사용 API**: 네이버 로그인
   - **환경**: PC웹
   - **서비스 URL**: `http://localhost:3000`
   - **Callback URL**: `http://localhost:3000/api/auth/callback/naver`
4. 등록 완료 후 **Client ID**와 **Client Secret** 복사

## 2. 환경 변수 설정

`apps/shop/.env.local` 파일을 생성하고 다음 내용을 입력하세요:

```env
# NextAuth 설정
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-key-here

# 네이버 로그인 설정 (위에서 복사한 값들)
NAVER_CLIENT_ID=your_naver_client_id_here
NAVER_CLIENT_SECRET=your_naver_client_secret_here

# 백엔드 서버 URL 설정
BACKEND_URL=http://localhost:8080
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
```

⚠️ **NEXTAUTH_SECRET** 생성 방법:
```bash
# 터미널에서 실행
openssl rand -base64 32
```

## 동작 방식

1. 사용자가 네이버 로그인 버튼을 클릭
2. NextAuth를 통해 네이버 OAuth 인증 진행
3. 로그인 성공 시 `signIn` callback에서 네이버 액세스 토큰과 프로필 정보 획득
4. 내부 `/api/auth/login` 엔드포인트로 데이터 전송
5. 해당 엔드포인트에서 백엔드 서버의 `/auth/login`으로 최종 전송

## 전송되는 데이터 형식

```json
{
  "auth_info": {
    "provider": "naver",
    "token": "네이버_소셜_액세스토큰"
  },
  "user_profile": {
    "email": "test@naver.com",
    "name": "테스터",
    "nickname": "tester",
    "profile_image": "testImage",
    "gender": "남자",
    "birthday": "19001211",
    "age": "30"
  }
}
```

## 구현된 파일들

- `apps/shop/app/api/auth/[...nextauth]/route.ts`: NextAuth 설정 및 네이버 로그인 콜백
- `apps/shop/app/api/auth/login/route.ts`: 백엔드 서버로 데이터 전송하는 중간 엔드포인트

## 3. 테스트 방법

### 단계별 테스트

1. **환경 변수 확인**
   ```bash
   cd apps/shop
   cat .env.local  # 설정된 환경 변수 확인
   ```

2. **개발 서버 시작**
   ```bash
   pnpm dev:shop
   ```

3. **로그인 테스트**
   - 브라우저에서 `http://localhost:3000/login` 접속
   - "네이버 간편 로그인" 버튼 클릭
   - 네이버 로그인 페이지에서 로그인
   - 성공 시 `/main`으로 리다이렉트

4. **로그 확인**
   - 브라우저 개발자 도구 → Console 탭
   - 터미널에서 서버 로그 확인
   - 백엔드 서버 로그 확인 (실행 중인 경우)

### 문제 해결

- **로그인 버튼 클릭 시 오류**: 환경 변수 확인
- **리다이렉트 오류**: 네이버 개발자 센터 Callback URL 확인  
- **백엔드 연결 오류**: `BACKEND_URL` 환경 변수 및 백엔드 서버 상태 확인

#### Safari 브라우저 전용 문제 해결

**증상**: Safari에서만 네이버 로그인이 작동하지 않음 (Chrome, Firefox 등에서는 정상 작동)

**원인 및 해결책**:

1. **쿠키 정책 문제**
   - Safari는 SameSite 쿠키 정책이 더 엄격함
   - NextAuth 설정에 Safari 호환 쿠키 설정 추가됨

2. **팝업 차단 문제**  
   - Safari의 팝업 차단 기능이 로그인 창을 차단할 수 있음
   - **해결법**: Safari 설정 → 웹사이트 → 팝업 창 → 해당 도메인 허용

3. **ITP (Intelligent Tracking Prevention) 문제**
   - Safari의 추적 방지 기능이 소셜 로그인을 차단할 수 있음
   - **해결법**: Safari 설정 → 개인정보 보호 → "크로스 사이트 추적 방지" 끄기 (임시)

4. **개발자 도구로 디버깅**
   ```javascript
   // Safari 개발자 도구 콘솔에서 실행
   console.log('User Agent:', navigator.userAgent);
   console.log('Cookies enabled:', navigator.cookieEnabled);
   ```

5. **환경 변수 확인** (Safari 관련)
   ```env
   # .env.local에 추가
   NEXTAUTH_URL=http://localhost:3000
   # HTTPS 환경에서는 반드시 https:// 사용
   ```

**Safari 사용자를 위한 안내 메시지**:
Safari 사용자는 다음 설정을 확인해주세요:
- 팝업 차단 해제: Safari → 환경설정 → 웹사이트 → 팝업 창
- 쿠키 허용: Safari → 환경설정 → 개인정보 보호
- JavaScript 활성화: Safari → 환경설정 → 보안

## 4. 배포 환경 설정

### 개발 환경에서는 잘 되는데 배포에서 안 되는 경우

**주요 원인**: HTTPS 환경에서의 쿠키 보안 설정

1. **네이버 개발자 센터에 배포 도메인 추가**
   ```
   서비스 URL: https://yourdomain.com
   Callback URL: https://yourdomain.com/api/auth/callback/naver
   ```

2. **배포 플랫폼 환경 변수 설정**
   ```env
   NEXTAUTH_URL=https://yourdomain.com
   NEXTAUTH_SECRET=production-secret-key
   NAVER_CLIENT_ID=same-as-dev
   NAVER_CLIENT_SECRET=same-as-dev
   ```

3. **HTTPS 필수**
   - 네이버 OAuth는 배포 환경에서 HTTPS 강제 요구
   - NextAuth도 프로덕션에서 Secure 쿠키 사용

4. **일반적인 배포 환경 문제들**
   - ❌ HTTP로 배포 (HTTPS 필수)
   - ❌ NEXTAUTH_URL 환경 변수 누락
   - ❌ 네이버 개발자 센터에 배포 도메인 미등록
   - ❌ Secure 쿠키 설정 누락 (현재 해결됨) 