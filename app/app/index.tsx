import { useApis } from "@/apis";
import NetInfo from "@react-native-community/netinfo";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function WebViewScreen() {
  const [isConnected, setIsConnected] = useState(false);
  const webViewRef = useRef<WebView>(null);
  const { onRequest } = useApis(webViewRef);

  // 인터넷 상태 확인
  useEffect(() => {
    NetInfo.addEventListener((status) => {
      setIsConnected(status.isConnected ?? false);
    });
  }, []);

  if (!isConnected)
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>인터넷 연결을 해주세요!</Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: "http://localhost:3000" }}
        onMessage={(event) => {
          if (!event.nativeEvent.data) return;
          const request = JSON.parse(event.nativeEvent.data);
          onRequest(request.query);
        }}
      />
    </SafeAreaView>
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
