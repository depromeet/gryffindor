"use client";

// biome-ignore format: 함수 인수 줄바꿈 스타일 유지
import type { BridgeQuery } from "@bridge";
import { useEffect } from "react";

export const NativeApis: Record<string, (value: any) => void> = {};

export function NativeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleMessage = (message: any) => {
      try {
        // message.data가 이미 객체인지 확인
        let response: any;
        if (typeof message.data === "string") {
          response = JSON.parse(message.data);
        } else if (typeof message.data === "object" && message.data !== null) {
          response = message.data;
        } else {
          // biome-ignore format: 가독성을 위해 여러 줄로 유지
          console.warn(
            "NativeProvider: Invalid message data type:",
            typeof message.data
          );
          return;
        }

        const query = Object.keys(response)[0] as BridgeQuery;
        const resolve = NativeApis[query];
        if (resolve) {
          resolve({ data: response });
          delete NativeApis[query];
        }
      } catch (error) {
        // biome-ignore format: 가독성을 위해 여러 줄로 유지
        console.error(
          "NativeProvider: Failed to parse message:",
          error,
          message
        );
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
