# 컴포넌트 사용법 가이드

이 문서는 Gryffindor 프로젝트에서 구현된 주요 UI 컴포넌트들의 사용법을 정리합니다.

## 📋 목차

1. [TransitionLayout 컴포넌트](#transitionlayout-컴포넌트)
2. [StackHeader 컴포넌트](#stackheader-컴포넌트)
3. [Icon 컴포넌트](#icon-컴포넌트)
4. [라우트 설정 (RouteConfig)](#라우트-설정-routeconfig)

---

## TransitionLayout 컴포넌트

페이지 전환 애니메이션과 헤더 관리를 담당하는 스마트한 레이아웃 컴포넌트입니다.

### 주요 특징

- 🎭 **자동 페이지 전환**: pathname을 기반으로 적절한 애니메이션 타입 자동 선택
- 📱 **디바이스별 최적화**: 모바일과 데스크톱에 맞는 전환 효과
- 🧭 **통합 헤더 관리**: 라우트 설정에 따른 자동 헤더 표시/숨김
- 🔄 **라우트 그룹 지원**: main(fade) / stack(drill) 그룹별 전환

### 기본 사용법

```tsx
import { TransitionLayout } from "@/shared/ui";

export default function MyPage() {
  return (
    <TransitionLayout>
      <div>페이지 콘텐츠</div>
    </TransitionLayout>
  );
}
```

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `children` | `ReactNode` | - | 페이지 콘텐츠 |
| `id` | `string` | `pathname` | 전환 ID (수동 지정 시) |
| `transition` | `"fade" \| "drill" \| "auto"` | `"auto"` | 애니메이션 타입 |
| `className` | `string` | `"min-h-full min-w-full"` | 추가 CSS 클래스 |
| `forceMobile` | `boolean` | `undefined` | 디바이스 타입 강제 지정 |

### 고급 사용법

```tsx
// 수동 전환 타입 지정
<TransitionLayout transition="fade">
  <div>항상 fade 전환</div>
</TransitionLayout>

// 커스텀 ID로 전환 제어
<TransitionLayout id="custom-page">
  <div>커스텀 전환 ID</div>
</TransitionLayout>

// 모바일 강제 모드
<TransitionLayout forceMobile={true}>
  <div>강제 모바일 모드</div>
</TransitionLayout>
```

---

## StackHeader 컴포넌트

스택 네비게이션용 공통 헤더 컴포넌트입니다.

### 주요 특징

- 🔙 **스마트 뒤로가기**: 브라우저 history 또는 커스텀 액션 지원
- 🎨 **완전한 커스터마이징**: 색상, 아이콘, 액션 버튼 자유 설정
- 📱 **모바일 최적화**: 터치 친화적 디자인
- ⚡ **설정 기반**: HeaderConfig 객체로 통합 관리

### 기본 사용법

```tsx
import { StackHeader } from "@/shared/ui";

const headerConfig = {
  title: "페이지 제목",
};

export default function Page() {
  return (
    <div>
      <StackHeader config={headerConfig} />
      <main>페이지 콘텐츠</main>
    </div>
  );
}
```

### HeaderConfig 인터페이스

```tsx
interface HeaderConfig {
  title: string;
  backButton?: {
    icon?: ReactNode;           // 커스텀 아이콘
    action?: string | (() => void); // 뒤로가기 액션
    hidden?: boolean;           // 버튼 숨김
  };
  rightActions?: ReactNode[];   // 우측 액션 버튼들
  style?: {
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
  };
}
```

### 고급 사용법

```tsx
// 완전히 커스터마이징된 헤더
const advancedConfig = {
  title: "설정",
  backButton: {
    icon: <CustomBackIcon />,
    action: () => router.push('/home'),
    hidden: false
  },
  rightActions: [
    <IconButton key="search" icon="search" />,
    <IconButton key="menu" icon="menu" />
  ],
  style: {
    backgroundColor: '#f8fafc',
    textColor: '#1e293b',
    borderColor: '#e2e8f0'
  }
};

<StackHeader config={advancedConfig} className="shadow-lg" />
```

---

## Icon 컴포넌트

타입 세이프한 아이콘 시스템입니다.

### 주요 특징

- 🔒 **타입 안전성**: TypeScript로 사용 가능한 아이콘 제한
- 🎨 **일관된 스타일**: 통일된 디자인 시스템
- ⚡ **동적 로딩**: 컴포넌트 기반 최적화
- 🔧 **쉬운 확장**: 새 아이콘 추가 용이

### 사용 가능한 아이콘

현재 지원되는 아이콘들:
- `home` - 홈 아이콘
- `map` - 지도 아이콘  
- `user` - 사용자 아이콘

### 기본 사용법

```tsx
import { Icon } from "@/shared/ui";

// 기본 사용
<Icon name="home" />

// 크기와 색상 지정
<Icon name="user" size={32} className="text-blue-500" />

// 접근성을 위한 title 추가
<Icon name="map" size={24} title="지도 보기" />
```

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `name` | `IconName` | - | 아이콘 이름 (`"home" \| "map" \| "user"`) |
| `size` | `number` | - | 아이콘 크기 (px) |
| `className` | `string` | - | Tailwind CSS 클래스 |
| `color` | `string` | - | 아이콘 색상 |
| `title` | `string` | - | 접근성을 위한 제목 |

### 스타일링 예제

```tsx
// Tailwind CSS 클래스로 스타일링
<Icon name="home" size={48} className="text-blue-500 hover:text-blue-600" />

// 인라인 색상 지정
<Icon name="user" size={24} color="#ef4444" />

// 복합 스타일링
<Icon 
  name="map" 
  size={32} 
  className="text-green-500 drop-shadow-md transition-colors" 
  title="지도 열기"
/>
```

---

## 라우트 설정 (RouteConfig)

중앙화된 라우트 관리 시스템입니다.

### 주요 특징

- 🎯 **중앙 집중 관리**: 모든 라우트 설정을 한 곳에서
- 🔄 **자동 전환 매핑**: 라우트별 전환 타입 자동 결정
- 📱 **그룹 기반 네비게이션**: main/stack 그룹으로 구분
- 🔍 **와일드카드 지원**: 동적 라우트 패턴 매칭

### 라우트 그룹

1. **main 그룹** (`fade` 전환)
   - `/home` - 홈페이지
   - `/map` - 지도페이지
   - 헤더 없음, FAB 네비게이션 사용

2. **stack 그룹** (`drill` 전환)
   - `/mypage` - 마이페이지
   - `/item` - 아이템페이지
   - 등등...
   - 헤더 있음, 스택 네비게이션

### 설정 구조

```tsx
// src/shared/config/routeConfig.ts
export const ROUTE_CONFIG: Record<string, RouteConfig> = {
  "/home": {
    group: "main",
    transition: "fade",
    header: null,
  },
  "/mypage": {
    group: "stack", 
    transition: "drill",
    header: {
      title: "마이페이지",
    },
  },
  // 와일드카드 패턴
  "/mypage/*": {
    group: "stack",
    transition: "drill", 
    header: {
      title: "마이페이지 상세",
    },
  },
};
```

### 유틸리티 함수

```tsx
import { 
  getRouteConfig,
  getAllRoutes,
  getRoutesByGroup 
} from "@/shared/config/routeConfig";

// 특정 경로의 설정 가져오기
const config = getRouteConfig("/mypage");

// 모든 라우트 경로 가져오기
const allRoutes = getAllRoutes();

// 그룹별 라우트 가져오기
const stackRoutes = getRoutesByGroup("stack");
```

---

## 💡 사용 팁

### 1. 새 페이지 추가하기

```tsx
// 1. routeConfig.ts에 라우트 추가
"/new-page": {
  group: "stack",
  transition: "drill", 
  header: {
    title: "새 페이지"
  }
}

// 2. 페이지 컴포넌트에서 TransitionLayout 사용
export default function NewPage() {
  return (
    <TransitionLayout>
      <div>새 페이지 콘텐츠</div>
    </TransitionLayout>
  );
}
```

### 2. 커스텀 헤더 만들기

```tsx
const customHeader = {
  title: "커스텀 페이지",
  backButton: {
    action: "/custom-back-path"
  },
  rightActions: [
    <button key="save">저장</button>,
    <Icon key="more" name="menu" />
  ]
};
```

### 3. 아이콘 추가하기

새 아이콘을 추가하려면:

1. `src/shared/ui/icons/` 에 새 아이콘 컴포넌트 생성
2. `types.ts`에 아이콘 이름 추가
3. `Icon.tsx`의 `iconMap`에 매핑 추가

---

## 🔗 관련 파일

- `src/shared/ui/TransitionLayout.tsx` - 전환 레이아웃 컴포넌트
- `src/shared/ui/StackHeader.tsx` - 스택 헤더 컴포넌트  
- `src/shared/ui/icons/` - 아이콘 컴포넌트들
- `src/shared/config/routeConfig.ts` - 라우트 설정
- `src/shared/config/transitions.ts` - 전환 애니메이션 설정