"use client";

import Link from "next/link";
import { Icon, StationOverlaySelect } from "@/shared/ui";

interface MainHeaderProps {
  isShowUserIcon?: boolean;
}

function MainHeader({ isShowUserIcon = true }: MainHeaderProps) {
  return (
    <header
      className={
        "fixed top-0 z-40 flex w-full items-center justify-between bg-gray50 px-[20px] py-[14px]"
      }
    >
      {/* todo: 홈과 지도에서 색상이 다름 */}
      <StationOverlaySelect />
      <div className="flex items-center gap-[16px]">
        <Icon name="search" />
        {isShowUserIcon && (
          <Link href="/mypage">
            <Icon name="user" />
          </Link>
        )}
      </div>
    </header>
  );
}

export default MainHeader;
