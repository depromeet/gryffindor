# 🚀 Vercel 배포 가이드

## 모노레포 구조에서 Web 프로젝트 배포하기

이 프로젝트는 pnpm 워크스페이스를 사용하는 모노레포입니다. Vercel에서 `web/` 디렉토리의 Next.js 앱을 배포하는 방법을 안내합니다.

---

## 📋 사전 준비

1. [Vercel 계정](https://vercel.com) 생성
2. GitHub 리포지토리와 Vercel 연결

---

## ⚙️ Vercel 프로젝트 설정

### 1. Vercel 대시보드에서 프로젝트 Import

1. Vercel 대시보드에서 **"Add New Project"** 클릭
2. GitHub 리포지토리 선택: `depromeet/gryffindor`

### 2. Build & Development Settings

다음과 같이 설정합니다:

#### **Framework Preset**

```
Next.js
```

#### **Root Directory**

```
./
```

(루트를 그대로 두고 vercel.json이 처리합니다)

#### **Build Command**

```
cd web && pnpm build
```

#### **Output Directory**

```
web/.next
```

#### **Install Command**

```
pnpm install
```

### 3. Environment Variables (필요시)

배포 환경에 필요한 환경변수를 추가합니다:

- `NEXTAUTH_URL`: 배포된 도메인 URL
- `NEXTAUTH_SECRET`: NextAuth.js 시크릿 키
- `NEXT_PUBLIC_*`: 클라이언트 노출 환경변수
- 기타 필요한 API 키들

---

## 🔧 설정 파일 설명

### `vercel.json`

모노레포 배포를 위한 Vercel 설정 파일입니다:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "cd web && pnpm build",
  "devCommand": "cd web && pnpm dev",
  "installCommand": "pnpm install",
  "framework": null,
  "outputDirectory": "web/.next"
}
```

- **buildCommand**: web 디렉토리에서 빌드 실행
- **installCommand**: pnpm을 사용하여 모노레포 전체 의존성 설치
- **outputDirectory**: Next.js 빌드 결과물 위치

---

## 📦 빌드 스크립트

### `web/package.json`

```json
{
  "scripts": {
    "build": "next build",
    "build:check": "biome check --write src/ && next build"
  }
}
```

- **build**: Vercel에서 사용 (lint 체크 없이 빌드만)
- **build:check**: 로컬/pre-push hook에서 사용 (lint 체크 + 빌드)

---

## 🔄 배포 프로세스

### 자동 배포

- **main 브랜치**: 푸시 시 자동으로 Production 배포
- **기타 브랜치**: 푸시 시 자동으로 Preview 배포 생성

### 수동 배포

Vercel CLI를 사용한 배포:

```bash
# Vercel CLI 설치
pnpm add -g vercel

# 로그인
vercel login

# 프로젝트 배포
vercel

# Production 배포
vercel --prod
```

---

## 🐛 트러블슈팅

### 빌드 실패 시

1. **로컬에서 빌드 테스트**

   ```bash
   pnpm --filter web build
   ```

2. **의존성 문제**

   ```bash
   pnpm install
   pnpm --filter web build
   ```

3. **환경변수 확인**
   - Vercel 대시보드에서 Environment Variables 확인
   - `.env.example` 파일 참고

### pnpm 버전 이슈

Vercel은 기본적으로 최신 pnpm을 사용합니다. 특정 버전이 필요한 경우:

```json
// package.json
{
  "engines": {
    "node": ">=20.0.0",
    "pnpm": ">=9.0.0"
  }
}
```

---

## 📚 참고 자료

- [Vercel Monorepo 배포 가이드](https://vercel.com/docs/monorepos)
- [Next.js 배포 문서](https://nextjs.org/docs/deployment)
- [pnpm 워크스페이스](https://pnpm.io/workspaces)

---

## ✅ 배포 체크리스트

- [ ] GitHub 리포지토리와 Vercel 연결
- [ ] Build Settings 설정 완료
- [ ] Environment Variables 추가
- [ ] 로컬에서 빌드 테스트 성공
- [ ] main 브랜치에 푸시하여 자동 배포 확인
- [ ] 배포된 사이트 동작 확인
- [ ] 커스텀 도메인 설정 (선택사항)

---

**문의사항이 있으시면 팀 채널에 남겨주세요!** 🙌
