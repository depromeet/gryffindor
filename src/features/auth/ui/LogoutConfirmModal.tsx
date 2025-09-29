"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import { BasicCharacter } from "@/shared/lib/assets";
import { Button, Icon, Modal } from "@/shared/ui";

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export function LogoutConfirmModal({ isOpen, onOpenChange }: LogoutConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="로그아웃"
      description="로그아웃 확인 모달"
      closeOnOverlayClick={true}
    >
      <div className="flex w-[300px] flex-col items-center rounded-[10px] bg-white p-[20px]">
        <button className="cursor-pointer self-end" type="button" onClick={onOpenChange}>
          <Icon name="close" size={22} disableCurrentColor />
        </button>
        <div className="flex w-full flex-col items-center gap-[24px]">
          <Image src={BasicCharacter} alt="basicCharacter" width={120} height={120} />
          <div className="flex w-full flex-col items-center gap-[8px]">
            <span className="text-center text-gray900 text-subtitle1">
              로그아웃
              <br />
              하시겠어요?
            </span>
          </div>
          <Button
            label="확인"
            size="medium"
            variant="primary"
            onClick={async () => {
              await signOut({ redirectTo: "/home" });
            }}
          />
        </div>
      </div>
    </Modal>
  );
}
