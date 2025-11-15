"use client";

import { useCallback } from "react";
import { trackEvent } from "../ga";
import type { GAEventParams } from "../types";

/**
 * 클릭 이벤트 추적 Hook
 *
 * @example
 * // 기본 사용
 * const trackClick = useGAClick("button_click");
 * <button onClick={() => trackClick({ button_id: "login" })}>로그인</button>
 *
 * @example
 * // GA4 권장 이벤트 사용
 * const trackLogin = useGAClick("login");
 * <button onClick={() => trackLogin({ method: "email" })}>이메일 로그인</button>
 *
 * @example
 * // onClick에 바로 연결
 * const trackCTA = useGAClick("button_click", { button_id: "main_cta" });
 * <button onClick={trackCTA}>시작하기</button>
 */
export const useGAClick = (eventName: string, defaultParams?: GAEventParams) => {
  return useCallback(
    (additionalParams?: GAEventParams) => {
      trackEvent(eventName, {
        ...defaultParams,
        ...additionalParams,
      });
    },
    [eventName, defaultParams],
  );
};
