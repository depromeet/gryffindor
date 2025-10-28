"use client";

import { Ssgoi } from "@ssgoi/react";
import type { PropsWithChildren } from "react";
import { useMemo } from "react";
import { createSsgoiConfig } from "@/shared/config";
import { useMobile } from "@/shared/lib";

interface SsgoiProviderProps extends PropsWithChildren {}

export function SsgoiProvider({ children }: SsgoiProviderProps) {
  const isMobile = useMobile();

  // Config 생성 최적화: 캐싱된 transition rules를 사용하므로 빠름
  const config = useMemo(() => createSsgoiConfig(isMobile), [isMobile]);

  return (
    <Ssgoi config={config}>
      <div className="min-h-screen w-full">{children}</div>
    </Ssgoi>
  );
}
