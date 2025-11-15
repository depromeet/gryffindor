"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "../ga";
import type { GAEventParams } from "../types";

/**
 * 페이지/컴포넌트 체류 시간 추적 Hook
 * 마운트 시 시작 시간을 기록하고, 언마운트 시 체류 시간을 전송
 *
 * @example
 * // 기본 사용 - 페이지 체류 시간
 * function ProductPage() {
 *   useGATimeSpent("time_on_page", { page_name: "product_detail" });
 *   return <div>...</div>;
 * }
 *
 * @example
 * // 특정 임계값 이상만 추적
 * function VideoPlayer() {
 *   useGATimeSpent("video_watch_time", { video_id: "intro" }, 5);
 *   return <video>...</video>;
 * }
 */
export const useGATimeSpent = (
  eventName: string,
  params?: GAEventParams,
  minSeconds: number = 0,
) => {
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    // 시작 시간 기록
    startTimeRef.current = Date.now();

    // 언마운트 시 체류 시간 전송
    return () => {
      const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);

      // 최소 임계값 체크
      if (timeSpent >= minSeconds) {
        trackEvent(eventName, {
          ...params,
          time_seconds: timeSpent,
        });
      }
    };
  }, [eventName, params, minSeconds]);
};
