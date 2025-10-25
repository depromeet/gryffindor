"use client";

import Link from "next/link";
import { useUserState } from "@/entities/user";
import { Icon, StationOverlaySelect } from "@/shared/ui";

interface MainHeaderProps {
  isShowUserIcon?: boolean;
}

function MainHeader({ isShowUserIcon = true }: MainHeaderProps) {
  const { userState } = useUserState();

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
            {userState.isLoggedIn ? (
              <Icon name="userLogin" size={32} />
            ) : (
              <Icon name="user" size={32} />
            )}
          </Link>
        )}
      </div>
    </header>
  );
}

export default MainHeader;
