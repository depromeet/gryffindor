"use client";

import { Icon, StationOverlaySelect } from "@/shared/ui";

function MainHeader() {
  return (
    <header
      className="fixed top-0 z-40 flex w-full items-center justify-between bg-gray50 px-[20px] pb-[14px]"
      style={{
        paddingTop: "calc(14px + env(safe-area-inset-top))",
      }}
    >
      <StationOverlaySelect />
      <div className="flex items-center gap-[16px]">
        <Icon name="search" />
      </div>
    </header>
  );
}

export default MainHeader;
