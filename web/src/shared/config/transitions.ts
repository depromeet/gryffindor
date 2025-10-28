import type { SsgoiConfig } from "@ssgoi/react";
import { drill, fade } from "@ssgoi/react/view-transitions";
import { getAllRoutes, getRouteConfig } from "./routeConfig";

/**
 * 공통 스프링 설정
 */
export const springConfig = {
  stiffness: 300,
  damping: 35,
};

/**
 * 기본 fade 전환 설정
 */
export const fadeTransition = fade({
  inSpring: springConfig,
  outSpring: springConfig,
});

/**
 * 기본 drill 전환 설정 (enter)
 */
export const drillEnterTransition = drill({
  direction: "enter",
  spring: springConfig,
});

/**
 * 기본 drill 전환 설정 (exit) - 헤더 이질감 방지를 위한 최적화
 */
export const drillExitTransition = drill({
  direction: "exit",
  spring: {
    stiffness: 450, // 약간 더 부드럽게
    damping: 40, // 바운스 줄임
  },
});

/**
 * 경로가 어떤 라우트 그룹에 속하는지 판단
 */
function getRouteGroup(path: string): "main" | "stack" {
  return getRouteConfig(path).group;
}

/**
 * 스택 그룹 내에서 계층 관계 판단 (개선된 버전)
 */
function getStackHierarchy(fromPath: string, toPath: string): "enter" | "exit" {
  const fromClean = fromPath.replace("/*", "");
  const toClean = toPath.replace("/*", "");

  // 1. 명확한 부모-자식 관계 확인
  if (toClean.startsWith(`${fromClean}/`)) {
    return "enter"; // 더 깊은 곳으로 (부모 → 자식)
  }

  if (fromClean.startsWith(`${toClean}/`)) {
    return "exit"; // 더 얕은 곳으로 (자식 → 부모)
  }

  // 패턴 매칭 특별 처리
  if (fromPath.includes("/*") && toClean === fromClean) {
    // 예: /mypage/* → /mypage 는 자식→부모 관계
    return "exit";
  }

  if (toPath.includes("/*") && fromClean === toClean) {
    // 예: /mypage → /mypage/* 는 부모→자식 관계
    return "enter";
  }

  // 2. 같은 레벨이지만 더 정교한 구분
  const fromDepth = fromClean.split("/").length;
  const toDepth = toClean.split("/").length;

  if (toDepth > fromDepth) {
    return "enter"; // 더 깊은 레벨로
  } else if (toDepth < fromDepth) {
    return "exit"; // 더 얕은 레벨로
  }

  // 3. 완전히 같은 레벨일 때 - 브라우저 히스토리 기반 추론
  // 특별 케이스: 특정 페이지에서 mypage로 돌아가는 것은 exit으로 처리
  if (toClean === "/mypage" && fromClean !== "/mypage") {
    return "exit"; // mypage는 홈 역할을 하므로 exit
  }

  // 기본적으로 새로운 스택 페이지로의 진입은 enter
  return "enter";
}

/**
 * 라우트 그룹 기반 전환 규칙을 자동 생성하는 헬퍼
 */
export function createTransitionRules() {
  const rules: SsgoiConfig["transitions"] = [];
  const allRoutes = getAllRoutes();

  allRoutes.forEach((from) => {
    allRoutes.forEach((to) => {
      if (from !== to) {
        const fromGroup = getRouteGroup(from);
        const toGroup = getRouteGroup(to);

        // 라우트 그룹에 따른 전환 규칙 결정
        if (fromGroup === "main" && toGroup === "main") {
          // (main) → (main): 규칙 추가 안함 (기본 fade 사용)
          return;
        } else if (fromGroup === "main" && toGroup === "stack") {
          // (main) → (stack): drill enter
          rules.push({
            from,
            to,
            transition: drillEnterTransition,
            symmetric: false,
          });
        } else if (fromGroup === "stack" && toGroup === "main") {
          // (stack) → (main): drill exit
          rules.push({
            from,
            to,
            transition: drillExitTransition,
            symmetric: false,
          });
        } else if (fromGroup === "stack" && toGroup === "stack") {
          // (stack) → (stack): 계층 관계에 따라 drill enter/exit
          const hierarchy = getStackHierarchy(from, to);

          const transition = hierarchy === "exit" ? drillExitTransition : drillEnterTransition;

          rules.push({
            from,
            to,
            transition,
            symmetric: false,
          });
        }
      }
    });
  });

  return rules;
}

/**
 * 디바이스별 Ssgoi 설정을 생성하는 헬퍼
 */
export function createSsgoiConfig(isMobile: boolean = true): SsgoiConfig {
  const baseConfig: SsgoiConfig = {
    defaultTransition: fadeTransition,
  };

  // 모바일에서만 drill 전환 규칙 적용
  if (isMobile) {
    baseConfig.transitions = createTransitionRules();
  }

  return baseConfig;
}

/**
 * 특정 라우트 패턴에 대한 커스텀 전환 규칙 추가
 */
export function addCustomTransitionRule(
  from: string,
  to: string,
  transitionType: "fade" | "drill-enter" | "drill-exit",
) {
  const transitionMap = {
    fade: fadeTransition,
    "drill-enter": drillEnterTransition,
    "drill-exit": drillExitTransition,
  };

  return {
    from,
    to,
    transition: transitionMap[transitionType],
  };
}
