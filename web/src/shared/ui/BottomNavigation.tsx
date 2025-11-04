"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/shared/lib";
import { useNativeBridge } from "@/shared/lib/hooks/useNativeBridge";
import { BRIDGE_QUERIES } from "../../../../shared/bridge/queries";
import { Icon, type IconName } from "./Icon";

interface NavItem {
  id: string;
  label: string;
  icon: IconName;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "home",
    label: "홈",
    icon: "home",
    path: "/home",
  },
  {
    id: "map",
    label: "지도",
    icon: "map",
    path: "/map",
  },
  {
    id: "report",
    label: "식당제보",
    icon: "colorSpeaker",
    path: "/report",
  },
  {
    id: "mypage",
    label: "마이",
    icon: "user",
    path: "/mypage",
  },
];

export function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { fetchApp } = useNativeBridge();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const triggerHaptic = async () => {
    try {
      await fetchApp({ query: BRIDGE_QUERIES.HAPTIC_FEEDBACK });
    } catch (_error) {
      // WebView 환경이 아닐 경우 무시
      console.debug("Haptic feedback not available");
    }
  };

  const handleNavigation = async (path: string) => {
    if (path === pathname) return;

    await triggerHaptic();
    router.push(path as any);
  };

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white pt-[8px] px-[40px] rounded-t-2xl shadow-[0_-4px_16px_0_rgba(0,0,0,0.12)]"
      style={{
        paddingBottom: mounted ? "env(safe-area-inset-bottom)" : "24px",
      }}
    >
      <div className="flex items-center justify-between">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.path);

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavigation(item.path)}
              className={cn(
                "flex flex-col items-center justify-center  gap-1 w-[48px] h-[53px]",
                "transition-colors duration-200",
                "active:bg-gray50",
              )}
            >
              <Icon
                name={item.icon}
                size={24}
                className={cn(
                  "transition-colors duration-200",
                  active ? "text-primary400" : "text-gray500",
                )}
              />
              <span
                className={cn(
                  "text-xs font-medium transition-colors duration-200",
                  active ? "text-primary400" : "text-gray500",
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
