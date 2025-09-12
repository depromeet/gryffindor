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

  // 스택 그룹 - 드릴 네비게이션
  "/mypage": {
    group: "stack",
    transition: "drill",
    header: {
      title: "마이페이지",
    },
  },
  "/mypage/*": {
    group: "stack",
    transition: "drill",
    header: {
      title: "마이페이지 상세",
    },
  },
  "/mypage/tester": {
    group: "stack",
    transition: "drill",
    header: {
      title: "테스터 페이지",
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
};

/**
 * 경로에 매칭되는 페이지 설정 반환
 */
export function getRouteConfig(pathname: string): RouteConfig {
  // 정확한 매칭 우선
  if (ROUTE_CONFIG[pathname]) {
    return ROUTE_CONFIG[pathname];
  }

  // 와일드카드 매칭
  for (const [pattern, config] of Object.entries(ROUTE_CONFIG)) {
    if (pattern.includes("*")) {
      const regex = new RegExp(`^${pattern.replace("*", ".*")}$`);
      if (regex.test(pathname)) {
        return config;
      }
    }
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
