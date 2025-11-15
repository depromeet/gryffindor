import { sendGAEvent } from "@next/third-parties/google";
import type { GAEventParams } from "./types";

/**
 * 현재 페이지 경로 가져오기
 */
const getCurrentPath = (): string => {
  if (typeof window === "undefined") return "";
  return window.location.pathname;
};

/**
 * 현재 페이지 타이틀 가져오기
 */
const getCurrentTitle = (): string => {
  if (typeof window === "undefined") return "";
  return document.title;
};

/**
 * GA 이벤트 전송 (sendGAEvent wrapper)
 * 자동으로 page_path와 page_title을 추가
 */
export const trackEvent = (eventName: string, params?: GAEventParams) => {
  const eventData = {
    page_path: getCurrentPath(),
    page_title: getCurrentTitle(),
    ...params,
  };

  try {
    sendGAEvent("event", eventName, eventData);
  } catch (error) {
    console.error("🔴 [GA] trackEvent failed:", error);
  }
};

/**
 * GA Config 설정
 */
export const configGA = (targetId: string, params?: GAEventParams) => {
  sendGAEvent("config", targetId, params ?? {});
};

/**
 * GA Set (전역 파라미터 설정)
 */
export const setGA = (params: GAEventParams) => {
  sendGAEvent("set", params);
};
