import type { BridgeMessage, BridgeQuery } from "@bridge";
import type { RefObject } from "react";
import type { WebView } from "react-native-webview";
import {
  useDeviceLocation,
  useDeviceSystem,
  useHapticFeedback,
  useLoginApple,
  useLoginKakao,
} from "@/hooks";

export const useApis = (webviewRef: RefObject<WebView | null>) => {
  const onResponse = <T extends BridgeQuery>(result: BridgeMessage<T>) => {
    webviewRef.current?.postMessage(JSON.stringify(result));
  };

  const APIS = {
    ...useDeviceSystem(onResponse),
    ...useDeviceLocation(onResponse),
    ...useLoginApple(onResponse),
    ...useLoginKakao(onResponse),
    ...useHapticFeedback(onResponse),
  };

  const onRequest = (query: BridgeQuery) => {
    console.log("🌉 [Native] useApis: onRequest called", { query });
    const handler = APIS[query as keyof typeof APIS];
    if (handler) {
      console.log("🌉 [Native] useApis: Handler found, calling handler");
      handler();
    } else {
      console.error("❌ [Native] useApis: Handler not found for query", {
        query,
        availableHandlers: Object.keys(APIS),
      });
    }
  };

  return {
    onResponse,
    onRequest,
  };
};
