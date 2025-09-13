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
          "relative w-20 h-10 rounded-full transition-all duration-300 ease-in-out",
          "bg-gray-800 shadow-lg hover:shadow-xl",
          "border-2 border-gray-700",
        )}
      >
        {/* Toggle Background */}
        <div className="absolute inset-1 rounded-full bg-gray-900" />

        {/* Sliding Circle */}
        <div
          className={cn(
            "absolute top-1 w-8 h-8 rounded-full transition-transform duration-300 ease-in-out",
            "bg-white shadow-md flex items-center justify-center",
            isMapMode ? "translate-x-10" : "translate-x-1",
          )}
        >
          {/* Active Icon */}
          <Icon
            name={isMapMode ? "map" : "home"}
            size={18}
            className={isMapMode ? "text-red-500" : "text-blue-500"}
          />
        </div>

        {/* Background Icons */}
        <div className="absolute inset-0 flex items-center justify-between px-2">
          {/* Home Icon Background */}
          <div
            className={cn(
              "w-6 h-6 flex items-center justify-center transition-opacity duration-300",
              !isMapMode ? "opacity-0" : "opacity-40",
            )}
          >
            <Icon name="home" size={24} className="text-gray-400" />
          </div>

          {/* Map Icon Background */}
          <div
            className={cn(
              "w-6 h-6 flex items-center justify-center transition-opacity duration-300",
              isMapMode ? "opacity-0" : "opacity-40",
            )}
          >
            <Icon name="map" size={24} className="text-gray-400" />
          </div>
        </div>
      </button>
    </div>
  );
}
