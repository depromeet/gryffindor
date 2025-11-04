# 인증/인가 구조

## 개요

이 프로젝트는 NextAuth.js (Auth.js v5)를 기반으로 하되, Native 앱 환경에서 소셜 로그인을 지원하기 위해 하이브리드 구조를 채택했습니다.
(웹, 앱에 대한 유저 반응을 조사한 뒤 핵심 디바이스를 정할 예정)

## 핵심 아이디어

- **Web 브라우저**: NextAuth의 표준 OAuth Provider를 그대로 사용 (Auth.js)
- **Native 앱**: NextAuth Provider가 작동하지 않으므로, Native SDK를 통해 소셜 로그인을 수행하고, 그 결과를 Next.js 서버로 전달하여 NextAuth 세션을 생성

## 플로우 비교

### 1. Web 브라우저 환경

```
사용자 클릭 → NextAuth Provider (Kakao/Apple) → OAuth 서버 → 백엔드 API → NextAuth JWT 생성 → 쿠키 설정
```

- `signInAction("kakao")` 또는 `signInAction("apple")` 호출
- NextAuth가 자동으로 OAuth 플로우 처리
- `auth.ts`의 `jwt` 콜백에서 백엔드 API 호출 및 토큰 저장

### 2. Native 앱 환경 (현재 구현)

```
사용자 클릭 → Native SDK → 소셜 로그인 수행 → Token/URL 반환 → Next.js API Route → 백엔드 API → NextAuth JWT 생성 → 쿠키 설정
```

#### 카카오 로그인 (Native)

1. **Native 측** (`app/hooks/useLoginKakao.ts`)
   - 카카오톡 앱 설치 여부 확인
   - 앱이 있으면 `kakaolink://` 스킴으로 앱 열기
   - 앱이 없으면 카카오 로그인 URL 반환
   - 결과를 WebView로 전달 (브릿지)

2. **Web 측** (`web/src/features/auth/lib/utils/useLoginKakao.ts`)
   - 브릿지를 통해 Native 결과 수신
   - URL이 있으면 `window.location.href`로 이동
   - 카카오 인증 완료 후 `/api/kakao/callback`으로 리다이렉트

3. **Next.js API Route** (`web/src/app/api/kakao/callback/route.ts`)
   - 카카오 인증 코드(`code`) 받음
   - `exchangeKakaoCodeForToken`: 코드를 액세스 토큰으로 교환
   - 백엔드 API 호출: `POST /api/v1/oauth/social-login`
   - 최신 사용자 정보 가져오기: `GET /api/v1/users/me`
   - `createNextAuthSessionWithCookie`: NextAuth JWT 생성 및 쿠키 설정
   - `/home?success=true`로 리다이렉트

#### 애플 로그인 (Native)

1. **Native 측** (`app/hooks/useLoginApple.ts`)
   - `expo-apple-authentication` SDK로 로그인 수행
   - `identityToken` (JWT) 반환
   - 결과를 WebView로 전달 (브릿지)

2. **Web 측** (`web/src/features/auth/lib/utils/useLoginApple.ts`)
   - 브릿지를 통해 `identityToken` 수신
   - `POST /api/apple/callback`로 전송

3. **Next.js API Route** (`web/src/app/api/apple/callback/route.ts`)
   - `identityToken` 받음 (이미 JWT이므로 코드 교환 불필요)
   - 백엔드 API 호출: `POST /api/v1/oauth/social-login`
   - 최신 사용자 정보 가져오기: `GET /api/v1/users/me`
   - `createNextAuthSessionWithCookie`: NextAuth JWT 생성 및 쿠키 설정
   - `/home?success=true`로 리다이렉트

## 핵심 컴포넌트

### 1. NextAuth 세션 생성 유틸리티

**`web/src/shared/lib/utils/createNextAuthSession.ts`**

- **목적**: 백엔드에서 받은 `LoginResponse`를 NextAuth JWT로 변환하고 쿠키 설정
- **주요 함수**:
  - `createNextAuthSessionWithCookie`: 통합 함수 (JWT 생성 + 쿠키 설정 + 리다이렉트)
  - `createNextAuthToken`: 내부 함수 (JWT 토큰 생성만)

### 2. 브릿지 통신

- **Native → Web**: `ReactNativeWebView.postMessage`
- **Web → Native**: `window.ReactNativeWebView` 존재 여부로 Native 환경 감지

### 3. 플랫폼 감지

**`web/src/shared/lib/utils/platformUtils.ts`**

```typescript
export function isNativeApp(): boolean {
  return typeof window.ReactNativeWebView !== "undefined";
}
```

## 왜 이 구조인가?

1. **Native SDK 필수**: 카카오는 네이티브 앱 지원을 위해 `kakaolink://` 스킴 필요, Apple은 네이티브 SDK 필수
2. **Auth.js 호환성**: Native에서 NextAuth Provider를 직접 사용할 수 없음
3. **세션 통일**: Web과 Native 모두 동일한 NextAuth 세션(JWT 쿠키)을 사용하여 `useSession()` 등이 정상 작동
