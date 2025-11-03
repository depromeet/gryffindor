"use client";

import { useState } from "react";
import { useUserState } from "@/entities/user";
import { LogoutConfirmModal } from "@/features/auth";

export function AccountActionsSection() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const { userState } = useUserState();

  if (!userState.isLoggedIn) {
    return null;
  }

  return (
    <>
      <div className="m-auto mb-[40px] flex w-fit items-center gap-x-[16px]">
        <button
          type="button"
          className="text-body2-medium text-gray600"
          onClick={() => {
            console.log("로그아웃");
            setIsLogoutModalOpen(true);
          }}
        >
          로그아웃
        </button>
        <div className="h-full w-[1px] bg-gray100 py-[4px]" />
        <button type="button">
          <span className="text-body2-medium text-gray600">회원탈퇴</span>
        </button>
      </div>
      <LogoutConfirmModal
        isOpen={isLogoutModalOpen}
        onOpenChange={() => setIsLogoutModalOpen((prev) => !prev)}
      />
    </>
  );
}
