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