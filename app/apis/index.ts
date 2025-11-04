import type { BridgeMessage, BridgeQuery } from "@bridge";
import type { RefObject } from "react";
import type { WebView } from "react-native-webview";
import { useDeviceLocation, useDeviceSystem, useLoginApple, useLoginKakao } from "@/hooks";

export const useApis = (webviewRef: RefObject<WebView | null>) => {
  const onResponse = <T extends BridgeQuery>(result: BridgeMessage<T>) => {
    webviewRef.current?.postMessage(JSON.stringify(result));
  };

  const APIS = {
    ...useDeviceSystem(onResponse),
    ...useDeviceLocation(onResponse),
    ...useLoginApple(onResponse),
    ...useLoginKakao(onResponse),
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
