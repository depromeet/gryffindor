import { useEffect, useState } from "react";
import type { WebToAppMessage } from "@/../../shared/bridge/types";

interface ReactNativeWebView {
  postMessage: (message: string) => void;
}

interface CustomWindow extends Window {
  ReactNativeWebView?: ReactNativeWebView;
}

declare const window: CustomWindow;

export const useWebview = () => {
  const [isWebview, setIsWebview] = useState(false);

  useEffect(() => {
    if (window.ReactNativeWebView) {
      setIsWebview(true);
    }
  }, []);

  const postMessage = (message: WebToAppMessage) => {
    if (isWebview && window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify(message));
    }
  };

  return { isWebview, postMessage };
};
