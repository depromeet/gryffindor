"use client";

import { Ssgoi } from "@ssgoi/react";
import type { PropsWithChildren } from "react";
import { createSsgoiConfig } from "@/shared/config";
import { useMobile } from "@/shared/lib";

interface SsgoiProviderProps extends PropsWithChildren {}

export function SsgoiProvider({ children }: SsgoiProviderProps) {
  const isMobile = useMobile();
  return (
    <Ssgoi config={createSsgoiConfig(isMobile)}>
      <div className="min-h-screen w-full overflow-x-hidden">{children}</div>
    </Ssgoi>
  );
}
