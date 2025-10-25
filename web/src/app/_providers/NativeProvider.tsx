"use client";

import type { BridgeQuery } from "@bridge";
import { useEffect } from "react";

export const NativeApis: Record<string, (value: any) => void> = {};

export function NativeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleMessage = (message: any) => {
      const response = JSON.parse(message.data);
      const query = Object.keys(response)[0] as BridgeQuery;
      const resolve = NativeApis[query];
      if (resolve) {
        resolve({ data: response });
        delete NativeApis[query];
      }
    };

    // 1. 안드로이드에서 수신 대기
    document.addEventListener("message", handleMessage);

    // 2. IOS에서 수신 대기
    window.addEventListener("message", handleMessage);

    return () => {
      document.removeEventListener("message", handleMessage);
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return <>{children}</>;
}
