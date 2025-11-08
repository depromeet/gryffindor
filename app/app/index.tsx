import NetInfo from "@react-native-community/netinfo";
import { useEffect, useRef, useState } from "react";
import { Linking, Platform, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { useApis } from "@/apis";

export default function WebViewScreen() {
  const [isConnected, setIsConnected] = useState(true);
  const webViewRef = useRef<WebView>(null);
  const { onRequest } = useApis(webViewRef);

  // 인터넷 상태 확인
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((status) => {
      setIsConnected(status.isConnected ?? false);
    });

    return () => unsubscribe();
  }, []);

  if (!isConnected)
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>인터넷 연결을 해주세요!</Text>
      </SafeAreaView>
    );

  const handleShouldStartLoadWithRequest = (request: { url: string }) => {
    const url = request.url;

    // 카카오톡 커스텀 URL 스킴 감지 (kakaolink://, kakaotalk:// 등)
    if (
      Platform.OS === "ios" &&
      (url.startsWith("kakaolink://") || url.startsWith("kakaotalk://"))
    ) {
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        }
      });
      return false;
    }

    return true;
  };

  const handleMessage = (event: any) => {
    try {
      if (!event.nativeEvent.data) {
        console.warn("WebView: Empty message received");
        return;
      }
      const request = JSON.parse(event.nativeEvent.data);
      console.log("WebView: Message received from Web", request);
      onRequest(request.query);
    } catch (error) {
      console.error("WebView: Failed to parse message", error, event.nativeEvent.data);
    }
  };

  const handleError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    console.error("WebView: Error loading page", nativeEvent);
  };

  const handleHttpError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    console.error("WebView: HTTP error", nativeEvent.statusCode);
  };

  const handleLoadEnd = () => {
    console.log("WebView: Page loaded successfully");
    // 페이지 로드 후 ReactNativeWebView 확인을 위해 JavaScript 실행
    webViewRef.current?.injectJavaScript(`
      console.log('🔍 onLoadEnd: Checking ReactNativeWebView');
      console.log('🔍 window.ReactNativeWebView:', typeof window.ReactNativeWebView);
      if (typeof window.ReactNativeWebView === 'undefined') {
        console.error('❌ ReactNativeWebView is still not available after load!');
      } else {
        console.log('✅ ReactNativeWebView is available after load');
      }
    `);
  };

  // 프로덕션 빌드에서 ReactNativeWebView 객체가 제대로 주입되었는지 확인
  // 이 스크립트는 페이지 로드 전에 실행되어 디버깅 정보를 수집
  const injectedJavaScriptBeforeContentLoaded = `
    (function() {
      console.log('🔍 Injected before content loaded');
      console.log('🔍 window.ReactNativeWebView:', typeof window.ReactNativeWebView);
      console.log('🔍 window.webkit:', typeof window.webkit);
      if (window.webkit && window.webkit.messageHandlers) {
        console.log('🔍 messageHandlers:', Object.keys(window.webkit.messageHandlers));
      }
      true;
    })();
  `;

  // 페이지 로드 후 ReactNativeWebView 확인 및 디버깅
  const injectedJavaScript = `
    (function() {
      console.log('🔍 Injected after content loaded');
      console.log('🔍 window.ReactNativeWebView:', typeof window.ReactNativeWebView);

      if (typeof window.ReactNativeWebView === 'undefined') {
        console.error('❌ ReactNativeWebView is not available!');
        console.log('🔍 window keys:', Object.keys(window).filter(k => k.includes('React') || k.includes('Native') || k.includes('Web')));
      } else {
        console.log('✅ ReactNativeWebView is available');
        console.log('🔍 postMessage type:', typeof window.ReactNativeWebView.postMessage);
      }

      // 디버깅을 위한 전역 변수 설정
      window.__REACT_NATIVE_WEBVIEW_BRIDGE_READY = typeof window.ReactNativeWebView !== 'undefined';
      console.log('🌉 Bridge ready:', window.__REACT_NATIVE_WEBVIEW_BRIDGE_READY);
      true;
    })();
  `;

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: "http://192.168.2.53:3000" }}
      // ✅ 필수: 브릿지 통신을 위해 반드시 필요
      onMessage={handleMessage}
      // ✅ 필수: 카카오톡 앱 열기 등을 위해 필요
      onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
      // ⚠️ 선택: UX 개선용 (로딩 인디케이터 표시)
      startInLoadingState={true}
      // 🐛 디버깅용: 프로덕션에서는 제거 가능
      injectedJavaScript={injectedJavaScript}
      injectedJavaScriptBeforeContentLoaded={injectedJavaScriptBeforeContentLoaded}
      onLoadEnd={handleLoadEnd}
      // ⚠️ 선택: 에러 처리용 (디버깅/모니터링에 유용)
      onError={handleError}
      onHttpError={handleHttpError}
      // iOS 스와이프 백 제스처 활성화
      allowsBackForwardNavigationGestures={true}
      // iOS에서 바운스 효과 비활성화 (선택사항)
      bounces={false}
      // iOS에서 JavaScript 실행 허용
      allowsInlineMediaPlayback={true}
      mediaPlaybackRequiresUserAction={false}
      // 디버깅 활성화 실제 배포에서는 빠져야한다고 함.(testFlight 에서 console.log 가 보이기 위함)
      webviewDebuggingEnabled={true}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
