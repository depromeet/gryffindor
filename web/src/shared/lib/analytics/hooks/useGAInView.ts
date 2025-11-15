"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "../ga";
import type { GAEventParams } from "../types";

interface UseGAInViewOptions {
  /** 이벤트 이름 */
  eventName: string;
  /** 이벤트 파라미터 */
  params?: GAEventParams;
  /** 뷰포트 진입으로 판단할 threshold (0~1, 기본값: 0.5 = 50%) */
  threshold?: number;
  /** 한 번만 추적할지 여부 (기본값: true) */
  once?: boolean;
  /** 활성화 여부 (기본값: true) */
  enabled?: boolean;
}

/**
 * 뷰포트 진입 시 이벤트 추적 Hook (Intersection Observer)
 *
 * @example
 * // 기본 사용 - 섹션이 50% 보일 때 추적
 * function HeroSection() {
 *   const ref = useGAInView({
 *     eventName: "section_visible",
 *     params: { section_name: "hero" }
 *   });
 *   return <section ref={ref}>...</section>;
 * }
 *
 * @example
 * // threshold 커스터마이징 - 10%만 보여도 추적
 * function ProductCard({ product }) {
 *   const ref = useGAInView({
 *     eventName: "view_item",
 *     params: { item_id: product.id },
 *     threshold: 0.1
 *   });
 *   return <div ref={ref}>...</div>;
 * }
 *
 * @example
 * // 여러 번 추적 (스크롤할 때마다)
 * function AdBanner() {
 *   const ref = useGAInView({
 *     eventName: "section_visible",
 *     params: { section_name: "ad_banner" },
 *     once: false
 *   });
 *   return <div ref={ref}>...</div>;
 * }
 */
export const useGAInView = <T extends HTMLElement = HTMLDivElement>({
  eventName,
  params,
  threshold = 0.5,
  once = true,
  enabled = true,
}: UseGAInViewOptions) => {
  const ref = useRef<T>(null);
  const [hasTracked, setHasTracked] = useState(false);

  useEffect(() => {
    if (!enabled || !ref.current) return;
    if (once && hasTracked) return;

    const element = ref.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackEvent(eventName, {
              ...params,
              visibility_ratio: Math.round(entry.intersectionRatio * 100),
            });

            if (once) {
              setHasTracked(true);
              observer.disconnect();
            }
          }
        });
      },
      { threshold },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [eventName, params, threshold, once, enabled, hasTracked]);

  return ref;
};
