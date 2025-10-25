# 🌉 Bridge 타입 시스템 설정 완료

App (React Native) ↔ Web (Next.js) 간 타입 안전한 통신이 구축되었습니다.

## ✅ 완료된 작업

### 1. 공유 타입 패키지 생성
- **위치**: `shared/bridge/`
- **파일**:
  - `types.ts` - 모든 브릿지 타입 정의
  - `queries.ts` - 쿼리 이름 상수
  - `index.ts` - Export 통합
  - `package.json` - 모듈 설정
  - `README.md` - 사용 가이드

### 2. React Native App 설정
- ✅ `metro.config.js` - Metro bundler가 `@bridge` 별칭 인식
- ✅ `tsconfig.json` - TypeScript 경로 매핑
- ✅ `hooks/useDeviceSystem.ts` - 타입 적용
- ✅ `hooks/useDeviceLocation.ts` - 타입 적용
- ✅ `apis/index.ts` - 타입 안전한 API 라우터

### 3. Next.js Web 설정
- ✅ `next.config.ts` - Webpack/Turbopack alias 설정
- ✅ `tsconfig.json` - TypeScript 경로 매핑
- ✅ `useNativeBridge.ts` - 타입 안전한 fetchApp 함수
- ✅ `NativeProvider.tsx` - 타입 적용된 메시지 핸들러

---

## 🚀 빠른 시작

### TypeScript 서버 재시작 (중요!)

**VSCode:**
1. `Cmd+Shift+P`
2. "TypeScript: Restart TS Server" 선택

**또는 VSCode 재시작**

### 개발 서버 실행

**App (React Native):**
```bash
cd app
npm start -- --reset-cache  # Metro 캐시 클리어
```

**Web (Next.js):**
```bash
cd web
npm run dev
```

---

## 📝 사용 예시

### Web에서 Native 기능 호출

```typescript
import { useNativeBridge } from "@/shared/lib/hooks/useNativeBridge";
import { BRIDGE_QUERIES } from "@bridge";

function MyComponent() {
  const { fetchApp } = useNativeBridge();

  const handleGetDeviceInfo = async () => {
    // ✅ 타입 안전: BRIDGE_QUERIES.로 자동완성
    const appInfo = await fetchApp({
      query: BRIDGE_QUERIES.DEVICE_SYSTEM_APP
    });

    // ✅ 타입 안전: appInfo.appVersion 자동완성
    console.log(appInfo.appVersion);

    // ❌ 컴파일 에러: 존재하지 않는 속성
    // console.log(appInfo.wrongProperty);
  };

  const handleGetLocation = async () => {
    const location = await fetchApp({
      query: BRIDGE_QUERIES.DEVICE_LOCATION
    });

    // ✅ 타입 자동 추론: DeviceLocationLatLngSetResponse
    console.log(location.lat, location.lng);
  };
}
```

---

## 🔧 새로운 브릿지 API 추가하기

### 1단계: 응답 타입 정의

**`shared/bridge/types.ts`:**
```typescript
export interface MyNewFeatureResponse {
  someData: string;
  someNumber: number;
}
```

### 2단계: BridgeSchema에 추가

**`shared/bridge/types.ts`:**
```typescript
export interface BridgeSchema {
  // ... 기존 쿼리들
  fetchMyNewFeature: MyNewFeatureResponse;  // ✅ 추가
}
```

### 3단계: 쿼리 상수 추가

**`shared/bridge/queries.ts`:**
```typescript
export const BRIDGE_QUERIES = {
  // ... 기존 상수들
  MY_NEW_FEATURE: 'fetchMyNewFeature',  // ✅ 추가
} as const satisfies Record<string, BridgeQuery>;
```

### 4단계: App에서 핸들러 구현

**`app/hooks/useMyFeature.ts`:** (새 파일)
```typescript
import type { BridgeMessage, BridgeQuery } from "@bridge";

export const useMyFeature = (
  onResponse: <T extends BridgeQuery>(result: BridgeMessage<T>) => void
) => {
  const fetchMyNewFeature = () => {
    onResponse({
      fetchMyNewFeature: {
        someData: "hello",
        someNumber: 42,
      },
    });
  };

  return { fetchMyNewFeature };
};
```

**`app/apis/index.ts`:** (기존 파일 수정)
```typescript
import { useMyFeature } from "@/hooks/useMyFeature";

export const useApis = (webviewRef: RefObject<WebView | null>) => {
  const APIS = {
    ...useDeviceSystem(onResponse),
    ...useDeviceLocation(onResponse),
    ...useMyFeature(onResponse),  // ✅ 추가
  };
  // ...
};
```

### 5단계: Web에서 사용

```typescript
const data = await fetchApp({
  query: BRIDGE_QUERIES.MY_NEW_FEATURE
});
// ✅ data는 자동으로 MyNewFeatureResponse 타입
console.log(data.someData, data.someNumber);
```

---

## 🏗️ 배포 설정

### Monorepo 전체 클론 필요

**중요**: App과 Web 모두 `shared/` 폴더에 접근해야 하므로, 배포 파이프라인은 **전체 저장소를 클론**해야 합니다.

### App → App Store (Expo EAS)

```yaml
# .github/workflows/deploy-app.yml
name: Deploy App
on:
  push:
    paths:
      - 'app/**'
      - 'shared/**'  # shared 변경도 감지

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4  # ✅ 전체 저장소 클론

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        working-directory: ./app
        run: npm ci

      - name: Build
        working-directory: ./app
        run: eas build --platform all
```

### Web → Vercel

**Vercel 설정 (`vercel.json`):**
```json
{
  "buildCommand": "cd web && npm ci && npm run build",
  "outputDirectory": "web/.next",
  "installCommand": "npm install --prefix web"
}
```

Vercel은 자동으로 전체 저장소를 클론하므로 `shared/` 접근 가능합니다. ✅

---

## 🐛 문제 해결

### 1. "Cannot find module '@bridge'" 에러

**원인**: TypeScript 서버가 `tsconfig.json` 변경을 인식하지 못함

**해결**:
```bash
# VSCode에서
Cmd+Shift+P → "TypeScript: Restart TS Server"

# 또는 VSCode 재시작
```

### 2. Metro bundler에서 `@bridge` 못 찾는 에러

**원인**: Metro 캐시 문제

**해결**:
```bash
cd app
npm start -- --reset-cache
```

### 3. Web 빌드 시 `@bridge` 못 찾는 에러

**원인**: Next.js 서버가 webpack alias를 인식하지 못함

**해결**:
```bash
cd web
rm -rf .next
npm run dev
```

### 4. Vercel 배포 실패

**원인**: Vercel이 `shared/` 폴더에 접근 못함

**확인**:
- Vercel 프로젝트 설정에서 Root Directory가 올바른지 확인
- Build Command가 `cd web && npm run build`인지 확인
- Vercel은 자동으로 전체 repo를 클론하므로 보통 문제없음

---

## ✨ 타입 안전성 보장

### 컴파일 타임 체크

```typescript
// ❌ 컴파일 에러: 존재하지 않는 쿼리
await fetchApp({ query: "nonExistentQuery" });

// ❌ 컴파일 에러: 잘못된 타입
const data = await fetchApp({ query: BRIDGE_QUERIES.DEVICE_SYSTEM_APP });
console.log(data.wrongProperty);

// ✅ 정상 작동
const data = await fetchApp({ query: BRIDGE_QUERIES.DEVICE_SYSTEM_APP });
console.log(data.appVersion);  // string | number | undefined
```

### 자동완성 지원

1. `BRIDGE_QUERIES.` 입력 시 모든 쿼리 자동완성
2. `fetchApp` 호출 시 query 매개변수 자동완성
3. 응답 데이터의 속성 자동완성

---

## 📚 추가 문서

- **사용 가이드**: [shared/bridge/README.md](shared/bridge/README.md)
- **타입 정의**: [shared/bridge/types.ts](shared/bridge/types.ts)
- **쿼리 상수**: [shared/bridge/queries.ts](shared/bridge/queries.ts)

---

## 🎉 완료!

이제 App-Web 간 브릿지 통신이 완전한 타입 안전성을 가집니다.

**다음 단계:**
1. TypeScript 서버 재시작
2. 개발 서버 실행 (Metro 캐시 클리어)
3. 새 API 추가 시 위의 5단계 가이드 참고
