# 컴포넌트 사용법 가이드

이 문서는 Gryffindor 프로젝트에서 구현된 주요 UI 컴포넌트들의 사용법을 정리합니다.

## 📋 목차

1. [TransitionLayout 컴포넌트](#transitionlayout-컴포넌트)
2. [StackHeader 컴포넌트](#stackheader-컴포넌트)
3. [Icon 컴포넌트](#icon-컴포넌트)
4. [라우트 설정 (RouteConfig)](#라우트-설정-routeconfig)
5. [Input 컴포넌트](#input-컴포넌트)

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

## Input 컴포넌트

설정 기반의 확장 가능한 입력 필드 시스템입니다.

### 주요 특징

- 🔧 **설정 기반**: inputConfig로 중앙화된 필드 관리
- ✅ **내장 검증**: 실시간 validation과 에러 메시지
- 🔄 **상태 관리**: 커스텀 훅으로 간편한 상태 처리
- 🎨 **일관된 UI**: 통일된 디자인 시스템

### 기본 사용법

```tsx
import { useNicknameInput } from "@/shared/lib";
import { Input } from "@/shared/ui";

export default function NicknamePage() {
  const nickname = useNicknameInput("기본값"); //사전 정의 hook을 활용할 경우

  const nicknameV2 = useInputField("nickname", "nickname", initialValue); //기본 hook을 활용할 경우 => 위 hook을 통해 Input 태그에 필요한 props를 쉽게 설정 가능합니다.
  
  return (
    <div>
      <Input {...nickname.inputProps} />
      <button disabled={!nickname.isValid || !nickname.hasChanged}>
        저장
      </button>
    </div>
  );
}
```

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `value` | `string` | - | 입력 값 |
| `onChange` | `(value: string) => void` | - | 값 변경 핸들러 |
| `placeholder` | `string` | - | 플레이스홀더 텍스트 |
| `label` | `string` | - | 라벨 텍스트 |
| `validation` | `ValidationRule` | - | 검증 규칙 |
| `disabled` | `boolean` | `false` | 비활성화 상태 |
| `className` | `string` | `""` | 추가 CSS 클래스 |
| `resetButton` | `boolean` | `false` | 초기화 버튼 표시(value가 truthy시 렌더링) |

### ValidationRule 인터페이스

```tsx
interface ValidationRule {
  required?: boolean;        // 필수 입력
  pattern?: RegExp;         // 정규식 패턴
  maxLength?: number;       // 최대 글자 수
  minLength?: number;       // 최소 글자 수
  message?: string;         // 커스텀 에러 메시지
}
```

### 미리 정의된 검증 패턴과 규칙

validation을 직접 작성할 수도 있지만, 자주 사용되는 패턴과 규칙들을 미리 정의해두고 조합하여 사용할 수 있습니다.

```tsx
// VALIDATION_PATTERNS: 자주 사용되는 정규식 패턴들
export const VALIDATION_PATTERNS = {
  NICKNAME: /^[가-힣a-zA-Z0-9]{2,8}$/,  // 닉네임 패턴
} as const;

// VALIDATION_RULES: 미리 정의된 검증 규칙들을 조합하여 사용
export const VALIDATION_RULES = {
  REQUIRED: { required: true },
  REQUIRED_WITH_MESSAGE: {
    NICKNAME: { required: true, message: "닉네임을 입력해주세요." }
  },
  PATTERNS: {
    NICKNAME: { pattern: VALIDATION_PATTERNS.NICKNAME, message: "2-8글자의 한글, 영문, 숫자만 가능합니다." }
  },
  LENGTH: {
    NICKNAME: { minLength: 2, maxLength: 8 }
  }
};
```

### 설정 기반(inputConfig.ts) 사용법

이를 통해 Input 컴포넌트를 활용하는 요소들의 설정을 한 곳에서 제어할 수 있습니다.

```tsx
// inputConfig.ts에서 필드 설정 정의
export const INPUT_CONFIG = {
  nickname: {
    nickname: {
      label: "닉네임",
      placeholder: "닉네임을 입력하세요",
      // 미리 정의된 규칙들을 조합하여 사용
      validation: {
        ...VALIDATION_RULES.REQUIRED_WITH_MESSAGE.NICKNAME,
        ...VALIDATION_RULES.PATTERNS.NICKNAME,
        ...VALIDATION_RULES.LENGTH.NICKNAME,
      },
      resetButton: true
    },
    nicknameTest: {
      label: "닉네임Test",
      placeholder: "닉네임Test을 입력하세요",
      // 직접 validation 규칙 작성도 가능
      validation: {
        required: true,
        pattern: /^.{2,8}$/,
        message: "2-8글자 가능합니다"
      },
      resetButton: true
    }
  }
};

// 컴포넌트에서 사용
//const nickname = useInputField("<page>", "<fieldName>", "<initialValue>");
const nickname = useInputField("nickname", "nickname", "이잉");
const nickname = useInputField("nickname", "nicknameTest", "이잉😇");
```

### useInputField 훅

커스텀 훅이 제공하는 반환값:

```tsx
interface UseInputFieldReturn {
  // 기본 상태
  value: string;
  setValue: (value: string) => void;
  
  // 설정 정보
  config: InputFieldConfig | null;
  
  // 검증 상태
  isValid: boolean;
  errorMessage: string;
  
  // 변경 감지
  hasChanged: boolean;
  
  // Input 컴포넌트용 props
  inputProps: {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    validation?: ValidationRule;
    resetButton?: boolean;
  };
}
```

### 편의 훅들

자주 사용되는 필드를 위한 미리 정의된 훅들:

```tsx
// 닉네임 입력
const nickname = useNicknameInput("기본값");

// 리뷰 입력  
const review = useReviewInput();

// 커스텀 필드
const customField = useInputField("페이지명", "필드명", "초기값");
```

### 고급 사용법

```tsx
// 복수 필드 관리
export default function ProfileForm() {
  const nickname = useNicknameInput();
  const email = useInputField("profile", "email");
  
  // 전체 폼 검증
  const isFormValid = nickname.isValid && email.isValid;
  const hasAnyChanges = nickname.hasChanged || email.hasChanged;
  
  const handleSubmit = () => {
    if (!isFormValid) return;
    
    console.log({
      nickname: nickname.value,
      email: email.value
    });
  };
  
  return (
    <form>
      <Input {...nickname.inputProps} />
      <Input {...email.inputProps} />
      
      <button 
        disabled={!isFormValid || !hasAnyChanges}
        onClick={handleSubmit}
      >
        저장
      </button>
    </form>
  );
}
```

### 새 필드 추가하기

1. **inputConfig.ts에 설정 추가**
```tsx
export const INPUT_CONFIG = {
  // 기존 설정들...
  
  profile: {
    email: {
      label: "이메일",
      placeholder: "이메일을 입력하세요",
      validation: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "올바른 이메일 형식이 아닙니다"
      }
    }
  }
};
```

2. **편의 훅 생성 (선택사항)**
```tsx
export const useEmailInput = (initialValue: string = "") =>
  useInputField("profile", "email", initialValue);
```

3. **컴포넌트에서 사용**
```tsx
const email = useEmailInput();
<Input {...email.inputProps} />
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

### 4. 새 Input config 추가하고 사용하기

Input 컴포넌트 시스템에 새로운 필드를 추가하는 전체 과정:

```tsx
// 1. inputConfig.ts에 새 페이지/필드 설정 추가
export const INPUT_CONFIG = {
  // 기존 설정들...
  
  // 새 페이지 추가 (예: 상점 등록)
  storeRegister: {
    storeName: {
      label: "가게 이름",
      placeholder: "가게 이름",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 120,
        message: "5글자 이상 작성해주세요"
      },
      resetButton: true
    },
  }
};

// 2. useInputField.ts에 편의 훅 추가
export const useStoreNameInput = (initialValue: string = "") =>
  useInputField("storeRegister", "storeName", initialValue);

// 3. 컴포넌트에서 사용
export default function StoreRegisterPage() {
  const storeName = useStoreNameInput();

  
  // 폼 검증
  const isFormValid = storeName.isValid;
  const hasChanged = storeName.hasChanged;
  
  const handleSubmit = () => {
    if (!isFormValid || !hasChanged) return;
    
    console.log({
      storeName: storeName.value,
    });
  };
  
  return (
    <form className="space-y-4">
      <Input {...storeName.inputProps} />
      
      <button 
        disabled={!isFormValid || !hasChanged}
        onClick={handleSubmit}
      >
        등록하기
      </button>
    </form>
  );
}

// 4. 필요시 새 validation 패턴 추가
export const VALIDATION_PATTERNS = {
  STORE_NAME: /^.{5,120}$/,  // 5글자 이상 120글자 이하
} as const;
```

---

## 🔗 관련 파일

- `src/shared/ui/TransitionLayout.tsx` - 전환 레이아웃 컴포넌트
- `src/shared/ui/StackHeader.tsx` - 스택 헤더 컴포넌트  
- `src/shared/ui/icons/` - 아이콘 컴포넌트들
- `src/shared/ui/Input.tsx` - Input 컴포넌트
- `src/shared/lib/hooks/useInputField.ts` - Input 관련 커스텀 훅들
- `src/shared/config/routeConfig.ts` - 라우트 설정
- `src/shared/config/inputConfig.ts` - Input 필드 설정
- `src/shared/config/transitions.ts` - 전환 애니메이션 설정
- `src/shared/lib/utils/inputValidation.ts` - Input 검증 유틸리티