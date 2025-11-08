"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import { SadCharacter } from "@/shared/lib/assets";
import { Button, Icon, Modal, TextButton } from "@/shared/ui";

interface WithdrawConfirmModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export function WithdrawConfirmModal({ isOpen, onOpenChange }: WithdrawConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="회원탈퇴"
      description="회원탈퇴 확인 모달"
      closeOnOverlayClick={true}
    >
      <div className="flex w-[300px] flex-col items-center rounded-[10px] bg-white p-[20px]">
        <button className="cursor-pointer self-end" type="button" onClick={onOpenChange}>
          <Icon name="close" size={22} disableCurrentColor />
        </button>
        <div className="flex w-full flex-col items-center gap-[24px]">
          <Image src={SadCharacter} alt="basicCharacter" width={120} height={120} />
          <div className="flex w-full flex-col items-center gap-[8px]">
            <span className="text-center text-gray900 text-subtitle1">정말 탈퇴하시겠어요?</span>
            <span className="text-body2-regular text-gray700 text-center">
              회원탈퇴 후 등록한 후기는 사라지지 않지만,
              <br /> 다시 볼 수 없어요. 정말 탈퇴하시겠어요?
            </span>
          </div>
          <div className="flex flex-col w-full items-center justify-center gap-y-[20px]">
            <Button
              label="네, 탈퇴할게요"
              size="medium"
              variant="primary"
              onClick={async () => {
                await signOut({ redirectTo: "/home" });
              }}
            />
            <TextButton
              label="다음에 할게요"
              color="gray"
              onClick={onOpenChange}
              isUnderline
              isIcon={false}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
