"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUserState } from "@/entities/user";
import { useSessionStorage } from "@/shared/lib";
import { BasicCharacter } from "@/shared/lib/assets";
import { Button, Icon, Modal } from "@/shared/ui";

const MODAL_SESSION_KEY = "honbob_level_test_guide_modal";
const MODAL_EXPIRED_TIME = 24 * 60 * 60 * 1000; // 24시간

export function HonbobLevelTestGuideModal() {
  const { userState } = useUserState();
  const router = useRouter();

  const { getSession, setSession } = useSessionStorage<boolean>(MODAL_SESSION_KEY);
  const hasSeenModal = getSession();

  const [isOpen, setIsOpen] = useState(
    !hasSeenModal && userState.isLoggedIn && !userState.isLevelTestCompleted,
  );

  const closeModal = () => {
    setIsOpen(false);
    setSession(true, Date.now() + MODAL_EXPIRED_TIME);
  };

  //todo: 모달 레이아웃을 따로 빼둘까 고민
  if (userState.isLevelTestCompleted) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      title="사용자 정보"
      description="사용자 정보를 확인해주세요"
      closeOnOverlayClick={false}
    >
      <div className="flex w-[300px] flex-col items-center rounded-[10px] bg-white p-[20px]">
        <button className="cursor-pointer self-end" type="button" onClick={closeModal}>
          <Icon name="close" size={22} disableCurrentColor />
        </button>
        <div className="flex w-full flex-col items-center gap-[24px]">
          <Image src={BasicCharacter} alt="basicCharacter" width={120} height={120} />
          <div className="flex w-full flex-col items-center gap-[8px]">
            <span className="text-gray900 text-subtitle1">
              혼밥 레벨 테스트를 <br />
              완료하지 않으셨어요
            </span>
            <span className="text-body2-regular text-gray600">테스트는 첫 방문 1회만 진행해요</span>
          </div>
          <Button
            label="다시 시작하기"
            size="medium"
            variant="primary"
            onClick={() => router.push("/level-test")}
          />
        </div>
      </div>
    </Modal>
  );
}
