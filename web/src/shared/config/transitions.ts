import type { SsgoiConfig } from "@ssgoi/react";
import { drill, fade } from "@ssgoi/react/view-transitions";
import type { NavigationDirection } from "../lib/hooks/useNavigationDirection";
import { getAllRoutes, getRouteConfig } from "./routeConfig";

/**
 * 공통 스프링 설정 (drill용)
 */
export const springConfig = {
  stiffness: 150,
  damping: 20,
};

/**
 * 기본 fade 전환 설정
 * outSpring은 느리게 (이전 화면 오래 유지), inSpring은 빠르게 (새 화면 빠른 페이드인)
 * 이렇게 하면 새 화면이 렌더링될 시간을 확보하면서도 부드러운 전환 가능
 */
export const fadeTransition = fade({
  inSpring: { stiffness: 500, damping: 40 }, // 새 화면은 빠르게 페이드인
  outSpring: { stiffness: 150, damping: 25 }, // 이전 화면은 천천히 페이드아웃
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
 * Transition rules 캐시
 * forward/backward용 rules를 각각 미리 계산해서 저장
 */
let cachedForwardRules: SsgoiConfig["transitions"] | null = null;
let cachedBackwardRules: SsgoiConfig["transitions"] | null = null;

/**
 * 캐시 초기화 (개발 중 라우트 설정 변경 시 사용)
 */
export function clearTransitionCache() {
  cachedForwardRules = null;
  cachedBackwardRules = null;
}

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
        const fromConfig = getRouteConfig(from);
        const toConfig = getRouteConfig(to);
        const fromTransition = fromConfig.transition;
        const toTransition = toConfig.transition;
        const fromGroup = fromConfig.group;
        const toGroup = toConfig.group;

        // 우선순위 1: 그룹 간 전환 (main ↔ stack)
        // → 항상 drill 사용 (개별 transition 설정 무시)
        if (
          (fromGroup === "main" && toGroup === "stack") ||
          (fromGroup === "stack" && toGroup === "main")
        ) {
          const drillDirection = navigationDirection === "backward" ? "exit" : "enter";
          rules.push({
            from,
            to,
            transition: getDrillTransition(drillDirection),
            symmetric: false,
          });
          return;
        }

        // 우선순위 2: main → main 이동
        // → 기본 fade 사용 (규칙 추가 안함)
        if (fromGroup === "main" && toGroup === "main") {
          rules.push({
            from,
            to,
            transition: fadeTransition,
            symmetric: true,
          });
          return;
        }

        // 우선순위 3: stack → stack 이동
        // → 각 라우트의 transition 설정 확인

        // 3-1. 한쪽이라도 fade: defaultTransition(fade) 사용
        // 명시적 규칙을 추가하지 않아 중복 방지
        if (fromTransition === "fade" || toTransition === "fade") {
          rules.push({
            from,
            to,
            transition: fadeTransition,
            symmetric: true,
          });
          return;
        }

        // 3-2. 양쪽 모두 drill: drill 규칙 추가
        const drillDirection = navigationDirection === "backward" ? "exit" : "enter";
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
