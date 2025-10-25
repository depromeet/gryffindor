import type { BridgeQuery, BridgeResponse } from "@bridge";
import { NativeApis } from "@/app/_providers";

declare const window: Window & {
  ReactNativeWebView: {
    postMessage: (message: unknown) => void;
  };
};

export function useNativeBridge() {
  const fetchApp = async <T extends BridgeQuery>({
    query,
  }: {
    query: T;
  }): Promise<BridgeResponse<T>> => {
    const result = await new Promise<BridgeResponse<T>>((resolve) => {
      NativeApis[query] = (response: { data: Record<T, BridgeResponse<T>> }) => {
        resolve(response.data[query]);
      };
      window.ReactNativeWebView.postMessage(JSON.stringify({ query }));
    });
    return result;
  };

  return { fetchApp };
}
