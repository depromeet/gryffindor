# Bridge Types - App ↔ Web 통신

React Native App과 Next.js Web 간의 타입 안전한 브릿지 통신을 위한 공유 타입 정의.

## 📁 구조

```
shared/bridge/
├── types.ts      # 타입 정의
├── queries.ts    # 쿼리 상수
├── index.ts      # Export 모음
└── README.md     # 이 문서
```

## 🚀 사용법

### Web에서 App으로 요청

```typescript
import { useNativeBridge } from "@/shared/lib/hooks/useNativeBridge";
import { BRIDGE_QUERIES } from "@bridge";

function MyComponent() {
  const { fetchApp } = useNativeBridge();

  const handleGetAppVersion = async () => {
    // ✅ 타입 안전한 요청
    const data = await fetchApp({
      query: BRIDGE_QUERIES.DEVICE_SYSTEM_APP
    });

    // data 타입은 자동으로 DeviceSystemAppSetResponse
    console.log(data.appVersion); // ✅ 타입 체크됨
  };

  const handleGetLocation = async () => {
    const location = await fetchApp({
      query: BRIDGE_QUERIES.DEVICE_LOCATION
    });

    // location 타입은 DeviceLocationLatLngSetResponse
    console.log(location.lat, location.lng); // ✅ 타입 체크됨
  };
}
```

### App에서 쿼리 처리

```typescript
// app/hooks/useDeviceSystem.ts
import type { BridgeMessage, BridgeQuery } from "@bridge";

export const useDeviceSystem = (
  onResponse: <T extends BridgeQuery>(result: BridgeMessage<T>) => void
) => {
  const fetchDeviceSystemForAppSet = () => {
    onResponse({
      fetchDeviceSystemForAppSet: {
        appVersion: "1.0.0", // ✅ 타입 체크됨
      },
    });
  };
};
```

## ➕ 새로운 쿼리 추가하기

### 1. 응답 타입 정의 (`types.ts`)

```typescript
export interface MyNewFeatureResponse {
  someData: string;
  someNumber: number;
}
```

### 2. BridgeSchema에 추가 (`types.ts`)

```typescript
export interface BridgeSchema {
  // ... 기존 쿼리들
  fetchMyNewFeature: MyNewFeatureResponse; // 추가
}
```

### 3. 쿼리 상수 추가 (`queries.ts`)

```typescript
export const BRIDGE_QUERIES = {
  // ... 기존 상수들
  MY_NEW_FEATURE: 'fetchMyNewFeature', // 추가
} as const satisfies Record<string, BridgeQuery>;
```

### 4. App에서 핸들러 구현

```typescript
// app/hooks/useMyFeature.ts
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

// app/apis/index.ts
import { useMyFeature } from "@/hooks/useMyFeature";

export const useApis = (webviewRef: RefObject<WebView | null>) => {
  const APIS = {
    ...useDeviceSystem(onResponse),
    ...useDeviceLocation(onResponse),
    ...useMyFeature(onResponse), // 추가
  };
};
```

### 5. Web에서 사용

```typescript
const data = await fetchApp({
  query: BRIDGE_QUERIES.MY_NEW_FEATURE
});
// data는 MyNewFeatureResponse 타입으로 자동 추론됨 ✅
```

## 🏗️ 배포 시 주의사항

### App (React Native → App Store)
- Metro bundler가 `@bridge` 별칭으로 `shared/bridge` 접근
- Metro 재시작 필요: `npm start -- --reset-cache`

### Web (Next.js → Vercel)
- Next.js webpack/turbopack이 `@bridge` 별칭으로 접근
- Vercel은 전체 저장소를 클론하므로 `shared/` 폴더 접근 가능

### CI/CD 파이프라인
두 파이프라인 모두 **전체 monorepo를 클론**해야 함:

```yaml
# .github/workflows/deploy-app.yml
- name: Checkout repository
  uses: actions/checkout@v4  # 전체 저장소 클론

- name: Build app
  working-directory: ./app
  run: npm ci && npm run build
```

```yaml
# .github/workflows/deploy-web.yml
- name: Checkout repository
  uses: actions/checkout@v4  # 전체 저장소 클론

- name: Build web
  working-directory: ./web
  run: npm ci && npm run build
```

## 🔧 문제 해결

### TypeScript 에러: "Cannot find module '@bridge'"

**App (React Native):**
```bash
# Metro bundler 재시작
npm start -- --reset-cache
```

**Web (Next.js):**
```bash
# TypeScript 서버 재시작
# VSCode: Cmd+Shift+P → "TypeScript: Restart TS Server"

# 개발 서버 재시작
npm run dev
```

### 타입이 자동완성되지 않을 때

IDE에서 TypeScript 언어 서버를 재시작하세요:
- VSCode: `Cmd+Shift+P` → "TypeScript: Restart TS Server"
- 또는 IDE 재시작

## 📊 타입 안전성 보장

모든 브릿지 통신은 컴파일 타임에 타입 체크됩니다:

```typescript
// ❌ 컴파일 에러: 존재하지 않는 쿼리
fetchApp({ query: "nonExistentQuery" });

// ❌ 컴파일 에러: 잘못된 응답 타입
const data = await fetchApp({ query: BRIDGE_QUERIES.DEVICE_SYSTEM_APP });
console.log(data.wrongProperty); // Property 'wrongProperty' does not exist

// ✅ 정상 작동
const data = await fetchApp({ query: BRIDGE_QUERIES.DEVICE_SYSTEM_APP });
console.log(data.appVersion); // 타입 체크 통과
```
