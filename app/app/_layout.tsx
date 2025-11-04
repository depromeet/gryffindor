import { StatusBar } from "expo-status-bar";

import { View } from "react-native";
import WebViewScreen from "./index";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <WebViewScreen />
      <StatusBar style="dark" />
    </View>
  );
}
