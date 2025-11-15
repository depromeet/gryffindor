/**
 * GA4 이벤트 파라미터 기본 타입
 */
export interface GAEventParams {
  [key: string]: string | number | boolean | undefined;
}

/**
 * GA4 권장 이벤트 이름
 * @see https://support.google.com/analytics/answer/9267735
 */
export const GA4_RECOMMENDED_EVENTS = {
  // 사용자 액션
  LOGIN: "login",
  SIGN_UP: "sign_up",
  SEARCH: "search",
  SHARE: "share",

  // 콘텐츠 관련
  SELECT_CONTENT: "select_content",
  VIEW_ITEM: "view_item",
  VIEW_SEARCH_RESULTS: "view_search_results",

  // 페이지
  PAGE_VIEW: "page_view",
} as const;

/**
 * 커스텀 이벤트 이름 (GA4 네이티브 규칙: [대상]_[행동])
 */
export const CUSTOM_EVENTS = {
  BUTTON_CLICK: "button_click",
  COMPONENT_VIEW: "component_view",
  SECTION_VISIBLE: "section_visible",
  TIME_ON_PAGE: "time_on_page",
} as const;

/**
 * 버튼 클릭 파라미터
 */
export interface ButtonClickParams extends GAEventParams {
  button_id?: string;
  button_text?: string;
  location?: string; // 버튼 위치 (예: 'header', 'footer', 'hero_section')
}

/**
 * 컴포넌트/섹션 뷰 파라미터
 */
export interface ComponentViewParams extends GAEventParams {
  component_name: string;
  section_name?: string;
  location?: string;
}

/**
 * 뷰포트 진입 파라미터
 */
export interface SectionVisibleParams extends GAEventParams {
  section_name: string;
  visibility_ratio?: number;
}

/**
 * 페이지 체류 시간 파라미터
 */
export interface TimeOnPageParams extends GAEventParams {
  page_title?: string;
  time_seconds: number;
}
