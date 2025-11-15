import NetInfo from "@react-native-community/netinfo";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { useApis } from "@/apis";
import {
  createHandleMessage,
  handleError,
  handleHttpError,
  handleShouldStartLoadWithRequest,
} from "@/lib/webview/handlers";

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

  const handleMessage = createHandleMessage(onRequest);

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: "http://localhost:3000" }}
      // ✅ 필수: 브릿지 통신을 위해 반드시 필요
      onMessage={handleMessage}
      // ✅ 필수: 카카오톡 앱 열기 등을 위해 필요
      onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
      // ⚠️ 선택: UX 개선용 (로딩 인디케이터 표시)
      startInLoadingState={true}
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
      // ✅ 쿠키 공유 활성화 (웹과 앱 간 쿠키 동기화)
      sharedCookiesEnabled={true}
      // ✅ 서드파티 쿠키 허용 (sameSite: "none" 쿠키 지원)
      thirdPartyCookiesEnabled={true}
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
