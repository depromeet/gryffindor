"use client";

import { useEffect } from "react";
import { trackEvent } from "../ga";
import type { GAEventParams } from "../types";

/**
 * 컴포넌트/페이지 마운트 시 이벤트 추적 Hook
 *
 * @example
 * // 페이지 뷰 추적
 * function HomePage() {
 *   useGAMount("page_view", { page_name: "home" });
 *   return <div>...</div>;
 * }
 *
 * @example
 * // 컴포넌트 마운트 추적
 * function WelcomeModal() {
 *   useGAMount("component_view", { component_name: "welcome_modal" });
 *   return <Modal>...</Modal>;
 * }
 *
 * @example
 * // 조건부 추적
 * function ProductDetail({ productId }) {
 *   useGAMount("view_item", { item_id: productId }, !!productId);
 *   return <div>...</div>;
 * }
 */
export const useGAMount = (eventName: string, params?: GAEventParams, enabled: boolean = true) => {
  useEffect(() => {
    if (!enabled) return;

    trackEvent(eventName, params);
  }, [eventName, params, enabled]);
};
