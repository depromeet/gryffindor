import { Linking } from "react-native";
import type {
  WebViewErrorEvent,
  WebViewHttpErrorEvent,
} from "react-native-webview/lib/WebViewTypes";

/**
 * 카카오톡 커스텀 URL 스킴을 감지하고 네이티브 앱으로 열기
 * JS SDK를 사용해도 카카오 인증 페이지에서 "카카오톡으로 로그인" 클릭 시 발생할 수 있음
 */
export const handleShouldStartLoadWithRequest = (request: { url: string }): boolean => {
  const url = request.url;

  if (url.startsWith("kakaolink://") || url.startsWith("kakaotalk://")) {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      }
    });
    return false; // WebView에서 로드하지 않고 네이티브 앱으로 열기
  }

  return true;
};

/**
 * WebView에서 받은 메시지를 처리
 * - 브릿지 통신 메시지 파싱
 * - 외부 링크 열기 요청 처리
 */
export const createHandleMessage = (onRequest: (query: any) => void) => {
  return (event: { nativeEvent: { data: string } }) => {
    try {
      if (!event.nativeEvent.data) {
        console.warn("WebView: Empty message received");
        return;
      }

      const request = JSON.parse(event.nativeEvent.data);

      // 외부 링크 열기 요청 처리
      if (request.type === "open-external-link" && request.payload?.url) {
        const { url } = request.payload;
        Linking.canOpenURL(url).then((supported) => {
          if (supported) {
            Linking.openURL(url);
          } else {
            console.warn(`Cannot open URL: ${url}`);
            if (url.startsWith("http")) {
              Linking.openURL(url);
            }
          }
        });
        return;
      }

      // 브릿지 통신 요청 처리
      if (request.query) {
        onRequest(request.query);
      }
    } catch (error) {
      console.error("WebView: Failed to parse message", error, event.nativeEvent.data);
    }
  };
};

/**
 * WebView 에러 핸들러
 */
export const handleError = (syntheticEvent: WebViewErrorEvent) => {
  const { nativeEvent } = syntheticEvent;
  console.error("WebView: Error loading page", nativeEvent);
};

/**
 * WebView HTTP 에러 핸들러
 */
export const handleHttpError = (syntheticEvent: WebViewHttpErrorEvent) => {
  const { nativeEvent } = syntheticEvent;
  console.error("WebView: HTTP error", nativeEvent.statusCode);
};
