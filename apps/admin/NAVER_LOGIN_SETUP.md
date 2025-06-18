# 🔐 Admin 네이버 로그인 설정 가이드

## 📋 개요

이 가이드는 Admin 애플리케이션에 네이버 소셜 로그인을 설정하는 방법을 설명합니다. Zustand를 사용한 상태 관리와 Supabase Edge Function을 통한 CORS 우회 처리가 포함되어 있습니다.

## 🏗️ 시스템 아키텍처

```mermaid
graph TB
    User[👤 사용자] --> AdminApp[🖥️ Admin App<br/>localhost:5173]
    AdminApp --> NaverLogin[🟢 네이버 로그인<br/>nid.naver.com]
    NaverLogin --> Callback[🔄 Callback<br/>/auth/callback]
    Callback --> EdgeFunc[⚡ Supabase Edge Function<br/>naver-oauth-proxy]
    EdgeFunc --> NaverAPI[🔗 Naver Token API<br/>nid.naver.com/oauth2.0/token]
    EdgeFunc --> NaverProfile[👤 Naver Profile API<br/>openapi.naver.com/v1/nid/me]
    EdgeFunc --> Backend[🚀 Backend API<br/>https://api.801base.com]
    Backend --> JWT[🎟️ JWT Token]
    JWT --> ZustandStore[📦 Zustand Store]
    ZustandStore --> KyInstance[🌐 Ky HTTP Client]
    
    style User fill:#e1f5fe
    style AdminApp fill:#f3e5f5
    style NaverLogin fill:#4caf50
    style EdgeFunc fill:#ff9800
    style Backend fill:#2196f3
    style ZustandStore fill:#9c27b0
```

## 🔄 로그인 플로우

```mermaid
sequenceDiagram
    participant U as 👤 사용자
    participant A as 🖥️ Admin App
    participant N as 🟢 네이버
    participant E as ⚡ Edge Function
    participant B as 🚀 Backend API
    participant S as 📦 Zustand Store

    U->>A: 1. 네이버 로그인 클릭
    A->>N: 2. OAuth 인증 요청
    N->>U: 3. 로그인 페이지 표시
    U->>N: 4. 로그인 정보 입력
    N->>A: 5. Callback (code, state)
    A->>E: 6. 토큰 교환 요청
    E->>N: 7. Access Token 요청
    N->>E: 8. Access Token 응답
    E->>N: 9. 프로필 정보 요청
    N->>E: 10. 프로필 정보 응답
    E->>A: 11. 토큰 + 프로필 반환
    A->>B: 12. 백엔드 로그인 요청
    B->>A: 13. JWT 토큰 응답
    A->>S: 14. 인증 정보 저장
    A->>U: 15. 대시보드로 리다이렉트
```

## 🛠️ 설정 단계

### 1️⃣ 네이버 개발자 센터 설정

```mermaid
flowchart TD
    Start([시작]) --> NaverDev[네이버 개발자 센터<br/>developers.naver.com]
    NaverDev --> CreateApp[애플리케이션 등록]
    CreateApp --> AppInfo[애플리케이션 정보 입력]
    AppInfo --> SetAPI[사용 API: 네이버 로그인]
    SetAPI --> SetEnv[환경: PC웹]
    SetEnv --> SetURL[서비스 URL:<br/>http://localhost:5173]
    SetURL --> SetCallback[Callback URL:<br/>http://localhost:5173/auth/callback]
    SetCallback --> GetKeys[Client ID &<br/>Client Secret 복사]
    GetKeys --> End([완료])
    
    style Start fill:#4caf50
    style GetKeys fill:#ff9800
    style End fill:#4caf50
```

#### 📝 상세 설정값

| 항목 | 값 |
|------|-----|
| 애플리케이션 이름 | Commerce Admin |
| 사용 API | 네이버 로그인 |
| 환경 | PC웹 |
| 서비스 URL | `http://localhost:5173` |
| Callback URL | `http://localhost:5173/auth/callback` |

### 2️⃣ 환경 변수 설정

#### 로컬 환경 변수 (`apps/admin/.env.local`)

```env
# 네이버 OAuth 설정
VITE_NAVER_CLIENT_ID=your_client_id_here
VITE_NAVER_CLIENT_SECRET=your_client_secret_here

# 백엔드 API 설정
VITE_API_URL=https://api.801base.com

# Supabase 설정
VITE_SUPABASE_URL=https://lmqyvuxfubsudknigrgz.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### Supabase Edge Function 환경 변수

Supabase 대시보드에서 설정:

```env
NAVER_CLIENT_ID=your_client_id_here
NAVER_CLIENT_SECRET=your_client_secret_here
```

## 🏗️ 프로젝트 구조

```mermaid
graph TD
    Root[📁 apps/admin/src] --> Features[📁 features]
    Features --> Auth[📁 auth]
    Auth --> AuthTypes[📄 types/auth.ts]
    Auth --> AuthStore[📄 stores/authStore.ts]
    Auth --> AuthHooks[📁 hooks]
    AuthHooks --> UseAuth[📄 useAuth.ts]
    AuthHooks --> UseNaverAuth[📄 useNaverAuth.ts]
    
    Root --> Routes[📁 routes]
    Routes --> AuthRoutes[📁 auth]
    AuthRoutes --> Callback[📄 callback.tsx]
    Routes --> Login[📄 login.tsx]
    
    Root --> Shared[📁 shared]
    Shared --> KyInstance[📄 kyInstance.ts]
    
    Root --> LoginFeature[📁 features/login]
    LoginFeature --> LoginComponent[📄 LoginComponent.tsx]
    
    style Auth fill:#e3f2fd
    style AuthStore fill:#f3e5f5
    style Callback fill:#fff3e0
    style KyInstance fill:#e8f5e8
```

## 📊 데이터 플로우

```mermaid
graph LR
    NaverToken[🟢 네이버 토큰] --> Profile[👤 프로필 정보]
    Profile --> BackendPayload[📦 백엔드 페이로드]
    BackendPayload --> JWT[🎟️ JWT 토큰]
    JWT --> LocalStorage[💾 로컬 스토리지]
    LocalStorage --> APIRequests[🌐 API 요청]
    
    subgraph "백엔드 페이로드 구조"
        AuthInfo[auth_info:<br/>provider: 'naver'<br/>token: access_token]
        UserProfile[user_profile:<br/>email, name, nickname<br/>profile_image, etc.]
    end
    
    BackendPayload --> AuthInfo
    BackendPayload --> UserProfile
    
    style JWT fill:#4caf50
    style LocalStorage fill:#ff9800
    style APIRequests fill:#2196f3
```

## 🧪 테스트 가이드

### 테스트 플로우

```mermaid
graph TD
    Start([테스트 시작]) --> CheckEnv{환경 변수<br/>설정 확인}
    CheckEnv -->|❌| SetupEnv[환경 변수 설정]
    SetupEnv --> CheckEnv
    CheckEnv -->|✅| StartServer[개발 서버 시작<br/>pnpm dev]
    StartServer --> OpenBrowser[브라우저에서<br/>localhost:5173 접속]
    OpenBrowser --> CheckRedirect{자동 리다이렉트<br/>/login 확인}
    CheckRedirect -->|❌| FixRouting[라우팅 설정 확인]
    CheckRedirect -->|✅| ClickLogin[네이버 로그인<br/>버튼 클릭]
    ClickLogin --> NaverAuth[네이버 인증<br/>페이지에서 로그인]
    NaverAuth --> CheckCallback{콜백 처리<br/>성공 확인}
    CheckCallback -->|❌| DebugCallback[콜백 디버깅]
    CheckCallback -->|✅| CheckStorage{로컬 스토리지<br/>토큰 확인}
    CheckStorage -->|❌| DebugStorage[스토리지 디버깅]
    CheckStorage -->|✅| CheckAPI{API 요청<br/>토큰 헤더 확인}
    CheckAPI -->|❌| DebugAPI[API 디버깅]
    CheckAPI -->|✅| Success([✅ 테스트 성공])
    
    FixRouting --> CheckRedirect
    DebugCallback --> CheckCallback
    DebugStorage --> CheckStorage
    DebugAPI --> CheckAPI
    
    style Start fill:#4caf50
    style Success fill:#4caf50
    style CheckEnv fill:#ffeb3b
    style CheckRedirect fill:#ffeb3b
    style CheckCallback fill:#ffeb3b
    style CheckStorage fill:#ffeb3b
    style CheckAPI fill:#ffeb3b
```

### 실행 명령어

```bash
# 1. 환경 변수 설정 확인
cat apps/admin/.env.local

# 2. 개발 서버 시작
cd apps/admin
pnpm dev

# 3. 브라우저 접속
open http://localhost:5173
```

## 🐛 문제 해결

### 일반적인 오류와 해결책

```mermaid
graph TD
    Error[🚨 오류 발생] --> CheckType{오류 유형}
    
    CheckType -->|환경 변수| EnvError[환경 변수 오류]
    CheckType -->|네이버 API| NaverError[네이버 API 오류]
    CheckType -->|백엔드 연결| BackendError[백엔드 연결 오류]
    CheckType -->|토큰 관리| TokenError[토큰 관리 오류]
    
    EnvError --> CheckEnvFile[.env.local 파일 확인]
    EnvError --> CheckSupabaseEnv[Supabase 환경 변수 확인]
    
    NaverError --> CheckNaverKeys[네이버 Client ID/Secret 확인]
    NaverError --> CheckCallback[Callback URL 확인]
    
    BackendError --> CheckBackendURL[VITE_API_URL 확인]
    BackendError --> CheckServerStatus[백엔드 서버 상태 확인]
    
    TokenError --> CheckStorage[로컬 스토리지 확인]
    TokenError --> CheckJWT[JWT 토큰 유효성 확인]
    
    CheckEnvFile --> Restart[서버 재시작]
    CheckSupabaseEnv --> Restart
    CheckNaverKeys --> Restart
    CheckCallback --> Restart
    CheckBackendURL --> Restart
    CheckServerStatus --> ContactAdmin[관리자 문의]
    CheckStorage --> ClearStorage[스토리지 초기화]
    CheckJWT --> Logout[로그아웃 후 재로그인]
    
    Restart --> Success[✅ 해결됨]
    ContactAdmin --> Success
    ClearStorage --> Success
    Logout --> Success
    
    style Error fill:#f44336
    style Success fill:#4caf50
    style EnvError fill:#ff9800
    style NaverError fill:#ff9800
    style BackendError fill:#ff9800
    style TokenError fill:#ff9800
```

### 오류별 해결 방법

| 오류 메시지 | 원인 | 해결 방법 |
|------------|------|-----------|
| `백엔드 URL이 설정되지 않았습니다` | VITE_API_URL 미설정 | `.env.local`에 `VITE_API_URL` 추가 |
| `Server configuration error` | Supabase 환경 변수 미설정 | Supabase 대시보드에서 환경 변수 설정 |
| `Failed to get access token` | 네이버 클라이언트 정보 오류 | 네이버 개발자 센터에서 정보 재확인 |
| `Callback URL mismatch` | 콜백 URL 불일치 | 네이버 개발자 센터에서 콜백 URL 수정 |

## 🔍 디버깅 도구

### 브라우저 개발자 도구 확인 사항

1. **Local Storage** (`admin-auth-storage`):
   ```json
   {
     "state": {
       "user": { "email": "test@naver.com", ... },
       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
       "isAuthenticated": true
     }
   }
   ```

2. **Network 탭**:
   - API 요청에 `Authorization: Bearer <token>` 헤더 확인
   - Edge Function 호출 성공 여부 확인

3. **Console 로그**:
   - 네이버 인증 과정의 상세 로그 확인
   - 오류 메시지 및 스택 트레이스 확인

## 🎯 주요 특징

- **🔒 보안**: JWT 토큰 기반 인증
- **⚡ 성능**: Zustand를 통한 효율적인 상태 관리
- **🔄 자동화**: 토큰 자동 갱신 및 만료 처리
- **🌐 CORS 해결**: Supabase Edge Function 프록시
- **💾 영속성**: 새로고침 시에도 로그인 상태 유지
- **🛡️ 에러 처리**: 포괄적인 오류 처리 및 사용자 피드백

## 📞 지원

문제가 지속되는 경우:
1. GitHub Issue 생성
2. 개발팀 Slack 채널 문의
3. 이 문서의 디버깅 섹션 참조

---

*📝 이 문서는 Admin 네이버 로그인 구현을 위한 완전한 가이드입니다. 설정 과정에서 문제가 발생하면 위의 문제 해결 섹션을 참조하세요.*