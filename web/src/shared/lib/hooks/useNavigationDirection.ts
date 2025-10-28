"use client";

import { useEffect, useState } from "react";

export type NavigationDirection = "forward" | "backward";

/**
 * 브라우저 히스토리 기반 navigation direction 추적
 * popstate 이벤트로 뒤로가기/앞으로가기를 정확히 감지
 */
export function useNavigationDirection(): NavigationDirection {
  const [direction, setDirection] = useState<NavigationDirection>("forward");

  useEffect(() => {
    // popstate 이벤트는 뒤로가기/앞으로가기에서만 발생
    const handlePopState = () => {
      setDirection("backward");

      // 뒤로가기 후 충분한 시간 뒤 forward로 리셋
      // View Transitions API가 비동기적으로 동작하므로 넉넉하게 시간 확보
      setTimeout(() => {
        setDirection("forward");
      }, 500);
    };

    // pushState/replaceState는 forward navigation
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
      // React 렌더링 사이클 중 state 업데이트 방지를 위해 비동기 처리
      queueMicrotask(() => {
        setDirection("forward");
      });
      return originalPushState.apply(this, args);
    };

    window.history.replaceState = function (...args) {
      // React 렌더링 사이클 중 state 업데이트 방지를 위해 비동기 처리
      queueMicrotask(() => {
        setDirection("forward");
      });
      return originalReplaceState.apply(this, args);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  return direction;
}
