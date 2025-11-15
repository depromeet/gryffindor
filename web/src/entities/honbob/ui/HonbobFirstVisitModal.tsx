"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUserState } from "@/entities/user";
import { GA4_RECOMMENDED_EVENTS, useGAClick, useSessionStorage } from "@/shared/lib";
import { BasicCharacter } from "@/shared/lib/assets";
import { Button, Icon, Modal, TextButton } from "@/shared/ui";

export const FIRST_VISIT_SESSION_KEY = "honbob_level_test_first_visit_fIRST_VISIT";
const FIRST_VISIT_EXPIRED_TIME = 24 * 60 * 60 * 1000; // 24시간

export function HonbobFirstVisitModal() {
  const { userState } = useUserState();
  const router = useRouter();

  const { getSession, setSession } = useSessionStorage<boolean>(FIRST_VISIT_SESSION_KEY);
  const hasSeenModal = getSession();

  const [isOpen, setIsOpen] = useState(
    !hasSeenModal && !userState.isLoggedIn && !userState.isLevelTestCompleted,
  );

  const trackSelectContent = useGAClick(GA4_RECOMMENDED_EVENTS.SELECT_CONTENT);

  const closeModal = () => {
    setIsOpen(false);
    setSession(true, Date.now() + FIRST_VISIT_EXPIRED_TIME);
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
        <button
          className="cursor-pointer self-end"
          type="button"
          onClick={() => {
            trackSelectContent({ select_content_type: "close_honbob_level_test" });
            closeModal();
          }}
        >
          <Icon name="close" size={22} disableCurrentColor />
        </button>
        <div className="flex w-full flex-col items-center gap-[24px]">
          <Image src={BasicCharacter} alt="basicCharacter" width={120} height={120} />
          <div className="flex w-full flex-col items-center gap-[8px]">
            <span className="text-center text-gray900 text-subtitle1">
              처음 방문하셨네요!
              <br />
              혼밥 레벨 테스트를 시작해보세요
            </span>
            <span className="text-body2-regular text-gray600">테스트는 첫 방문 1회만 진행해요</span>
          </div>
          <Button
            label="시작하기"
            size="medium"
            variant="primary"
            onClick={() => {
              trackSelectContent({ select_content_type: "start_honbob_level_test" });
              router.push("/login");
            }}
          />
          <TextButton
            label="이미 계정이 있어요"
            onClick={() => router.replace("/login")}
            isUnderline
            isIcon={false}
          />
        </div>
      </div>
    </Modal>
  );
}
