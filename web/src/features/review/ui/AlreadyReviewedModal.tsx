"use client";

import Image from "next/image";
import Character from "@/shared/lib/assets/png/character/basic.png";
import { Icon, Modal } from "@/shared/ui";

interface AlreadyReviewedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function AlreadyReviewedModal({ isOpen, onClose, onConfirm }: AlreadyReviewedModalProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} title={""} description={""}>
      <div className="flex min-w-[300px] flex-col items-center justify-center gap-6 rounded-lg bg-white p-4">
        <button type="button" className="mb-[-24px] flex h-5 w-full justify-end" onClick={onClose}>
          <Icon name="close" size={24} className="cursor-pointer text-gray400" />
        </button>
        <Image src={Character} alt="character" width={120} height={120} />
        <div className="flex flex-col items-center gap-2">
          <span className="text-center text-gray900 text-subtitle1">이미 작성한 리뷰가 있어요</span>
          <span className="text-gray700 text-body2-regular">
            같은 식당에는 하나의 리뷰만 작성할 수 있어요
          </span>
        </div>
        <button
          type="button"
          onClick={onConfirm}
          className="flex h-[51px] w-full items-center justify-center rounded-[8px] bg-primary400 py-[14px]"
        >
          <span className="text-body1-semibold text-gray0">내가 작성한 리뷰 보기</span>
        </button>
      </div>
    </Modal>
  );
}
