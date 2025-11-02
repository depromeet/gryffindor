import { useDeviceLocation, useDeviceSystem, useHapticFeedback } from "@/hooks";
import type { BridgeMessage, BridgeQuery } from "@bridge";
import { RefObject } from "react";
import { WebView } from "react-native-webview";

export const useApis = (webviewRef: RefObject<WebView | null>) => {
  const onResponse = <T extends BridgeQuery>(result: BridgeMessage<T>) => {
    webviewRef.current?.postMessage(JSON.stringify(result));
  };

  const APIS = {
    ...useDeviceSystem(onResponse),
    ...useDeviceLocation(onResponse),
    ...useHapticFeedback(onResponse),
  };

  const onRequest = (query: BridgeQuery) => {
    const handler = APIS[query as keyof typeof APIS];
    if (handler) {
      handler();
    }
  };

  return {
    onResponse,
    onRequest,
  };
};
