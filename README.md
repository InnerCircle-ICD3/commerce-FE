# ☕ Commerce-FE

Inner Circle 프로젝트 - 커머스 팀 (**801 베이스**)
<br><br>

❗ `/apps` 디렉토리 내에 쇼핑몰과 백오피스 앱이 나누어진 모노레포 구조입니다.
- **쇼핑몰 앱** (`/apps/shop`) - [Next.js](https://nextjs.org/) : SSR/SEO 최적화와 초기 렌더링 성능을 위해 사용

- **백오피스 앱** (`/apps/admin`) - [React](https://reactjs.org/) : 백오피스 특성상 SSR이 불필요하다고 판단하여 구조가 보다 자유로운 React 사용

- **공통 코드** - `/packages` 디렉토리에 위치. <br>
현재 `/packages/utils`, `/packages/stores` 디렉토리가 패키지로 추가되어 있으며, 패키지를 추가할 시 각 앱 안에 있는 `package.json`의 dependencies에 패키지 이름을 추가한 뒤 `pnpm install`을 실행합니다.
```ts
// 공통 코드 사용 예시
import { formatDate } from "@commerce-fe/utils";
import { useUserStore } from "@commerce-fe/stores";
```

<br><br>
## 의존성 설치 및 실행 방법

- `pnpm`이 설치되어 있어야 합니다. (설치 방법: https://pnpm.io/installation)
- 프로젝트 루트 디렉토리에서 아래의 명령어를 실행합니다.
- `pnpm install` 하기 전에 `package-lock.json`이나 `node_modules`가 존재한다면 삭제합니다.

```bash
pnpm install

# 쇼핑몰 프로젝트 실행
pnpm --filter shop dev
# 또는
pnpm dev:shop

# 백오피스 프로젝트 실행
pnpm --filter admin dev
# 또는
pnpm dev:admin

# 쇼핑몰 애플리케이션 빌드
pnpm build:shop

# 백오피스 애플리케이션 빌드
pnpm build:admin

# 모든 애플리케이션 빌드
pnpm build:all
```

### 간소화된 명령어

개발 및 빌드 과정에서 자주 사용하는 명령어를 package.json의 scripts에 등록했습니다. 이를 통해 보다 간편하게 프로젝트를 개발하고 빌드할 수 있습니다. pnpm에서는 `run` 키워드를 생략하여 더 간결하게 사용할 수 있습니다.

| 명령어 | 설명 |
| --- | --- |
| `pnpm dev:shop` | 쇼핑몰 앱 개발 서버 실행 (`run` 키워드 생략) |
| `pnpm dev:admin` | 백오피스 앱 개발 서버 실행 (`run` 키워드 생략) |
| `pnpm build:shop` | 쇼핑몰 앱 빌드 (`run` 키워드 생략) |
| `pnpm build:admin` | 백오피스 앱 빌드 (`run` 키워드 생략) |
| `pnpm build:all` | 모든 앱 빌드 (`run` 키워드 생략) |

<br><br>
## 쇼핑몰 앱 API 요청 방법

서버 컴포넌트에서의 요청 편의를 위해 `fetch`를 사용합니다.<br>
`/src/shared/fetcher.ts`의 공통 인스턴스 `fetchServer()`와 `fetchClient()`를 사용합니다.

```ts
// 서버 컴포넌트에서 사용 예시
import { fetchServer, type CustomError } from "@/src/shared/fetcher";

export default async function Page() {
    const fetch = fetchServer();

    try {
        const res = await fetch("/users");
        return <UserList data={res.data} />;
    } catch (e) {
        const err = e as CustomError;
        return <ErrorComponent code={err.code} message={err.message} />;
    }
}
```
```ts
// 클라이언트 컴포넌트에서 사용 예시
"use client";

import { fetchClient, type CustomError } from "@/src/shared/fetcher";

export default function TestComponent() {
    const handleClick = async () => {
        const fetch = fetchClient();

        try {
            const res = await fetch("/users");
            console.log(res);
        } catch (e) {
            const err = e as CustomError;
            console.error(
                `${err.code} - ${err.message}`,
            );
        }
    };
}
```
<br><br>

## 백오피스 앱 API 요청 방법

### [Ky](https://github.com/sindresorhus/ky#readme)
- axios보다 가벼워 번들 사이즈에 이점이 있으며, 체이닝이 가능합니다. 또한 fetch 기반이라 불필요한 의존성을 줄여 클라이언트 앱 최적화에 유리합니다.
- `/src/shared/kyInstance.ts`의 공통 인스턴스를 사용합니다.

```ts
import { api, fetcher, type CustomError } from "./shared/kyInstance";

fetcher("users")
    .then(res => console.log(res))
    .catch(e => {
        const err = e as CustomError;
        console.error(`${err.code} - ${err.message}`);
    });
```

<br><br>
## 전역 패키지

### [TanStack Query](https://tanstack.com/query/latest)
- 서버 상태 관리 라이브러리로, API 요청/응답에 대한 캐싱, 로딩/에러 상태 관리, 자동 리패칭 등의 기능을 제공하여 비동기 데이터 처리 로직을 간결하게 유지할 수 있습니다.
- 각 앱의 `src/shared/TanstackQueryProviders.tsx`에 전역 Provider가 설정되어 있습니다.


### [Zustand](https://zustand-demo.pmnd.rs/)
- 팀원들이 Redux 패턴에 익숙해 상태 분리 및 관리 구조는 유지하되, 설정과 코드량을 줄일 수 있어 선택하였습니다.
- 각 앱에서 `src`의 각 feature별 `stores` 디렉토리 내에 store 파일을 생성하여 사용합니다.<br>
앱 간 공통 store를 사용할 경우 `/packages/stores` 디렉토리에 store 파일을 생성합니다.


### [Biome.js](https://biome.dev/)
- 기존 ESLint + Prettier 조합을 대체하며, 빠른 실행 속도를 위해 사용하였습니다.
```bash
# lint 검사하기
pnpm run lint

# 자동 포맷팅하기
pnpm run format
```

- VSCode 사용시 Biome 익스텐션 설치하면 저장할 때 자동으로 포맷팅됩니다. (참고: `/.vscode/settings.json`)


### [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- Tailwind는 팀원들의 숙련도가 높고, 유틸리티 클래스 기반으로 스타일을 적용할 수 있어 개발 속도가 빨라 선택하였습니다.
- shadcn/ui는 Tailwind 기반의 템플릿으로, 접근성이나 다크모드 등 기본 설정이 잘 되어 있고 디자인 시스템 없이도 일관된 UI를 유지할 수 있어 사용하였습니다.

관련 패키지 (shadcn/ui에 필요)

- `class-variance-authority`
- `clsx`
- `lucide-react`
- `tailwind-merge`

```bash
# 컴포넌트 추가 예시
pnpm dlx shadcn-ui@latest add button
```

### [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- Jest 대비 셋업이 간단하고 속도가 빨라 사용하였습니다.
- 각 앱의 `src` 내 feature별 `components` 디렉토리에 단위 테스트 코드를 작성합니다.


### [Playwright](https://playwright.dev/)
- E2E 테스트와 자동화된 테스트 시나리오 생성(codegen) 기능 활용을 위해 사용하였습니다. 테스트 결과를 UI로 시각화 가능해 디버깅 및 유지보수에도 유리합니다.
- 각 앱의 프로젝트 루트에 있는 `tests` 디렉토리에 테스트 코드를 작성합니다.

```bash
# 브라우저 설치
pnpm exec playwright install

# 특정 브라우저만 설치 (chromium, firefox, webkit)
pnpm exec playwright install chromium

# E2E 테스트 실행 (❗ 서버가 실행 중이어야 함)
# --ui : UI 환경에서 실행
# --project=shop : 쇼핑몰 앱만 테스트
pnpm exec playwright test --ui --project=shop

# 테스트 시나리오 자동 생성 (codegen)
pnpm exec playwright codegen http://localhost:3000    # 쇼핑몰 앱
pnpm exec playwright codegen http://localhost:5173    # 백오피스 앱
```

### [json-server](https://github.com/typicode/json-server#readme)
- 간단한 API 테스트용 Mock 서버로 사용합니다.
- 필요시 `/mocks` 디렉토리에 JSON 파일을 생성하여 Mock API를 작성합니다.
```bash
pnpm exec json-server --watch mocks/orders.json --port 3001
```