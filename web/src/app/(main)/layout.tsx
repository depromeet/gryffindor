"use client";

import { usePathname } from "next/navigation";
import { BOTTOM_NAV_HEIGHT } from "@/shared/config";
import { BottomNavigation } from "@/shared/ui";
import MainHeader from "@/shared/ui/MainHeader";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHeaderVisible = pathname.startsWith("/home");
  const isMapPage = pathname.startsWith("/map");

  return (
    <div
      style={{
        paddingBottom: isMapPage ? 0 : `calc(${BOTTOM_NAV_HEIGHT}px + env(safe-area-inset-bottom))`,
      }}
    >
      {isHeaderVisible && <MainHeader />}
      {children}
      <BottomNavigation />
    </div>
  );
}
