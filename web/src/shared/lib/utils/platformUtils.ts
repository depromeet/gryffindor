/**
 * 플랫폼 관련 유틸리티 함수
 */

/**
 * 현재 환경이 Native 앱(React Native WebView)인지 확인
 * @returns Native 앱 환경이면 true, 일반 웹 브라우저면 false
 */
export function isNativeApp(): boolean {
  if (typeof window === "undefined") {
    console.log("🔍 isNativeApp: window is undefined (SSR)");
    return false;
  }
  const hasReactNativeWebView = typeof (window as any).ReactNativeWebView !== "undefined";
  console.log("🔍 isNativeApp:", hasReactNativeWebView, {
    userAgent: window.navigator?.userAgent,
    hasReactNativeWebView,
    windowKeys: Object.keys(window).filter(
      (key) => key.includes("React") || key.includes("Native"),
    ),
  });
  return hasReactNativeWebView;
}
