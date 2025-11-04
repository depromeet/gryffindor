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

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: __DEV__ ? "http://localhost:3000" : "https://bobtory.com" }}
      onMessage={(event) => {
        if (!event.nativeEvent.data) return;
        const request = JSON.parse(event.nativeEvent.data);
        onRequest(request.query);
      }}
      // iOS 스와이프 백 제스처 활성화
      allowsBackForwardNavigationGestures={true}
      // iOS에서 바운스 효과 비활성화 (선택사항)
      bounces={false}
      onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
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
