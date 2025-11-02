import { useApis } from "@/apis";
import NetInfo from "@react-native-community/netinfo";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

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

  return (
      <WebView
        ref={webViewRef}
        // 개발 환경: 로컬 IP 사용 (Expo Go에서 localhost 접근 불가)
        // 프로덕션: https://bobtory.com
        source={{ uri: "https://bobtory.com" }}
        // source={{ uri: "http://localhost:3000" }}
        onMessage={(event) => {
          if (!event.nativeEvent.data) return;
          const request = JSON.parse(event.nativeEvent.data);
          onRequest(request.query);
        }}
        // iOS 스와이프 백 제스처 활성화
        allowsBackForwardNavigationGestures={true}
        // iOS에서 바운스 효과 비활성화 (선택사항)
        bounces={false}
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
