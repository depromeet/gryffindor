"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/shared/lib";
import { Icon } from "./Icon";

export function FloatingNavButton() {
  const router = useRouter();
  const pathname = usePathname();

  // 현재 경로에 따라 초기 상태 결정
  const [isMapMode, setIsMapMode] = useState(false);

  // pathname이 변경될 때마다 상태 업데이트
  useEffect(() => {
    setIsMapMode(pathname.startsWith("/map"));
  }, [pathname]);

  const handleToggle = () => {
    const newMode = !isMapMode;

    // 토글에 따라 페이지 이동
    if (newMode) {
      router.push("/map");
    } else {
      router.push("/home");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          "flex w-[96px] h-[52px] relative items-center justify-center p-1.5 rounded-[100px] transition-all duration-300 ease-in-out",
          "bg-gray-800 shadow-lg hover:shadow-xl",
        )}
      >
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <Icon
            name="home"
            size={24}
            className={cn(
              "transition-colors duration-300",
              isMapMode ? "text-gray500" : "text-white",
            )}
          />
          <Icon
            name="map"
            size={24}
            className={cn(
              "transition-colors duration-300",
              isMapMode ? "text-white" : "text-gray500",
            )}
          />
        </div>

        {/* Sliding Circle */}
        <div
          className={cn(
            "absolute w-[40px] h-[40px] rounded-full transition-transform duration-300 ease-in-out",
            "bg-gray0 flex items-center justify-center",
            isMapMode ? "translate-x-[20px]" : "translate-x-[-20px]",
          )}
        >
          <Icon name={isMapMode ? "map" : "home"} size={28} className="text-primary400" />
        </div>
      </button>
    </div>
  );
}
