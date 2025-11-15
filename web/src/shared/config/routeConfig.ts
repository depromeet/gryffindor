import type { ReactNode } from "react";

/**
 * 헤더 설정 타입
 */
export interface HeaderConfig {
  title: string;
  backButton?: {
    icon?: ReactNode;
    action?: string | (() => void);
    hidden?: boolean;
  };
  rightActions?: ReactNode[];
  style?: {
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
  };
}

/**
 * 페이지별 통합 설정
 */
interface RouteConfig {
  /** 라우트 그룹 */
  group: "main" | "stack";
  /** 전환 애니메이션 타입 */
  transition: "fade" | "drill";
  /** 헤더 설정 (null이면 헤더 없음) */
  header: HeaderConfig | null;
}

/**
 * 인증/권한 관련 경로 설정
 */
export const AUTH_CONFIG = {
  // 인증이 필요한 경로들
  PROTECTED_ROUTES: ["/onboarding"] as const,
  // 인증되지 않은 사용자만 접근 가능한 경로들
  AUTH_ROUTES: ["/login"] as const,
  // 공개 경로들
  PUBLIC_ROUTES: ["/", "/home", "/map", "/auth-callback", "/store/[id]"] as const,
} as const;

/**
 * 모든 페이지의 통합 설정
 * 여기서 한 번에 모든 페이지의 라우팅, 전환, 헤더를 관리
 */
export const ROUTE_CONFIG: Record<string, RouteConfig> = {
  // 메인 그룹 - FAB 네비게이션
  "/home": {
    group: "main",
    transition: "fade",
    header: null,
  },
  "/map": {
    group: "main",
    transition: "fade",
    header: null,
  },

  "/mypage": {
    group: "main",
    transition: "fade",
    header: {
      title: "마이페이지",
      backButton: {
        hidden: true,
      },
    },
  },

  "/mypage/*": {
    group: "main",
    transition: "fade",
    header: {
      title: "마이페이지 상세",
    },
  },

  // 스택 그룹 - 드릴 네비게이션
  "/reviews": {
    group: "stack",
    transition: "drill",
    header: {
      title: "방문 후기",
    },
  },
  "/nickname": {
    group: "stack",
    transition: "drill",
    header: {
      title: "닉네임 변경",
    },
  },
  "/item": {
    group: "stack",
    transition: "drill",
    header: {
      title: "아이템",
    },
  },
  "/item/*": {
    group: "stack",
    transition: "drill",
    header: {
      title: "아이템 상세",
    },
  },
  "/level-test": {
    group: "stack",
    transition: "drill",
    header: {
      title: "레벨테스트",
      backButton: {
        action: "/",
      },
    },
  },
  "/level-test/*": {
    group: "stack",
    transition: "fade",
    header: {
      title: "레벨테스트",
      backButton: {
        action: "/",
      },
    },
  },
  "/store/*/review": {
    group: "stack",
    transition: "drill",
    header: {
      title: "매장 정보",
    },
  },
  "/store/*/review/*": {
    group: "stack",
    transition: "drill",
    header: {
      title: "매장 정보",
    },
  },
  "/store/*": {
    group: "stack",
    transition: "drill",
    header: {
      title: "매장 정보",
    },
  },
  "/store/": {
    group: "stack",
    transition: "drill",
    header: null,
  },
  "/store/*/suggestion-store": {
    group: "stack",
    transition: "drill",
    header: {
      title: "정보 수정 제안",
    },
  },
  "/report": {
    group: "main",
    transition: "fade",
    header: {
      title: "혼밥 식당 제보",
      backButton: {
        hidden: true,
      },
    },
  },
  "/honbob-level-info": {
    group: "stack",
    transition: "drill",
    header: {
      title: "혼밥 레벨 설명",
    },
  },
  "/search": {
    group: "stack",
    transition: "drill",
    header: null,
  },
};

/**
 * 경로에 매칭되는 route pattern 반환
 * @example
 * getRoutePattern('/store/123') // returns '/store/*'
 * getRoutePattern('/store/123/review') // returns '/store/star/review' (star = *)
 */
export function getRoutePattern(pathname: string): string {
  // 정확한 매칭 우선
  if (ROUTE_CONFIG[pathname]) {
    return pathname;
  }

  // 와일드카드 매칭
  // 패턴 길이가 긴 순서대로 정렬 (구체적인 패턴이 우선)
  const sortedPatterns = Object.keys(ROUTE_CONFIG)
    .filter((pattern) => pattern.includes("*"))
    .sort((a, b) => b.length - a.length);

  for (const pattern of sortedPatterns) {
    // /store/* → /store/ 이후 모든 경로 매칭 (슬래시 포함)
    const regexPattern = pattern.replace(/\*/g, ".*");
    const regex = new RegExp(`^${regexPattern}$`);

    if (regex.test(pathname)) {
      return pattern;
    }
  }

  // 기본값: pathname 그대로 반환
  return pathname;
}

/**
 * 경로에 매칭되는 페이지 설정 반환
 */
export function getRouteConfig(pathname: string): RouteConfig {
  const pattern = getRoutePattern(pathname);

  if (ROUTE_CONFIG[pattern]) {
    return ROUTE_CONFIG[pattern];
  }

  // 기본값: 스택 페이지
  return {
    group: "stack",
    transition: "drill",
    header: {
      title: "페이지",
    },
  };
}

/**
 * 모든 라우트 경로 반환
 */
export function getAllRoutes(): string[] {
  return Object.keys(ROUTE_CONFIG);
}

/**
 * 라우트 그룹별 경로 반환
 */
export function getRoutesByGroup(group: "main" | "stack"): string[] {
  return Object.entries(ROUTE_CONFIG)
    .filter(([_, config]) => config.group === group)
    .map(([path, _]) => path);
}
