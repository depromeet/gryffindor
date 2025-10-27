import type { SsgoiConfig } from "@ssgoi/react";
import { drill, fade } from "@ssgoi/react/view-transitions";
import type { NavigationDirection } from "../lib/hooks/useNavigationDirection";
import { getAllRoutes, getRouteConfig } from "./routeConfig";

/**
 * 공통 스프링 설정
 */
export const springConfig = {
  stiffness: 150,
  damping: 20,
};

/**
 * 기본 fade 전환 설정
 */
export const fadeTransition = fade({
  inSpring: springConfig,
  outSpring: springConfig,
});

/**
 * drill 전환 객체 재사용 (성능 최적화)
 * 동일한 설정의 객체를 매번 생성하지 않고 재사용
 */
const drillEnterTransition = drill({
  direction: "enter",
  spring: springConfig,
});

const drillExitTransition = drill({
  direction: "exit",
  spring: springConfig,
});

/**
 * drill 전환 가져오기 (캐시된 객체 반환)
 */
function getDrillTransition(direction: "enter" | "exit") {
  return direction === "enter" ? drillEnterTransition : drillExitTransition;
}

/**
 * 경로가 어떤 라우트 그룹에 속하는지 판단
 */
function getRouteGroup(path: string): "main" | "stack" {
  return getRouteConfig(path).group;
}

/**
 * Transition rules 캐시
 * forward/backward용 rules를 각각 미리 계산해서 저장
 */
let cachedForwardRules: SsgoiConfig["transitions"] | null = null;
let cachedBackwardRules: SsgoiConfig["transitions"] | null = null;

/**
 * 라우트 그룹 기반 전환 규칙을 생성하는 내부 함수
 */
function generateTransitionRules(
  navigationDirection: NavigationDirection,
): SsgoiConfig["transitions"] {
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
        }

        // Transition 방향 결정
        let drillDirection: "enter" | "exit";

        if (fromGroup === "main" && toGroup === "stack") {
          // (main) → (stack)
          drillDirection = navigationDirection === "backward" ? "exit" : "enter";
        } else if (fromGroup === "stack" && toGroup === "main") {
          // (stack) → (main)
          drillDirection = navigationDirection === "backward" ? "exit" : "enter";
        } else {
          // (stack) → (stack)
          drillDirection = navigationDirection === "backward" ? "exit" : "enter";
        }

        rules.push({
          from,
          to,
          transition: getDrillTransition(drillDirection),
          symmetric: false,
        });
      }
    });
  });

  return rules;
}

/**
 * 라우트 그룹 기반 전환 규칙을 가져오기 (캐싱 적용)
 * Navigation direction을 고려하여 올바른 drill transition 적용
 */
export function getTransitionRules(
  navigationDirection: NavigationDirection = "forward",
): SsgoiConfig["transitions"] {
  // 캐시된 rules 반환
  if (navigationDirection === "forward") {
    if (!cachedForwardRules) {
      cachedForwardRules = generateTransitionRules("forward");
    }
    return cachedForwardRules;
  } else {
    if (!cachedBackwardRules) {
      cachedBackwardRules = generateTransitionRules("backward");
    }
    return cachedBackwardRules;
  }
}

/**
 * 디바이스별 Ssgoi 설정을 생성하는 헬퍼
 */
export function createSsgoiConfig(
  isMobile: boolean = true,
  navigationDirection: NavigationDirection = "forward",
): SsgoiConfig {
  const baseConfig: SsgoiConfig = {
    defaultTransition: fadeTransition,
  };

  // 모바일에서만 drill 전환 규칙 적용 (캐싱된 rules 사용)
  if (isMobile) {
    baseConfig.transitions = getTransitionRules(navigationDirection);
  }

  return baseConfig;
}
