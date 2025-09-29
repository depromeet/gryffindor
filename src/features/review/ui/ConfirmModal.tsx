import Image from "next/image";
import Character from "@/shared/lib/assets/png/character/basic.png";
import { Icon, Modal } from "@/shared/ui";

interface ConfirmModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  isEditMode: boolean;
  cancelText?: string;
}

export function ConfirmModal({ isModalOpen, setIsModalOpen, isEditMode }: ConfirmModalProps) {
  return (
    <Modal
      isOpen={isModalOpen}
      onOpenChange={setIsModalOpen}
      title="후기 작성 완료"
      description="후기 작성이 완료되었습니다."
    >
      <div className="flex min-w-[260px] flex-col items-center justify-center gap-6 rounded-lg bg-white p-4">
        <button
          type="button"
          className="mb-[-24px] flex h-5 w-full justify-end"
          onClick={() => setIsModalOpen(false)}
        >
          <Icon name="close" size={24} className="cursor-pointer text-gray400" />
        </button>
        <Image src={Character} alt="character" width={120} height={120} />
        <span className="whitespace-pre-line text-center text-gray900 text-subtitle1">
          {isEditMode ? "방문 후기를 수정했어요!" : `방문 후기\n작성이 완료되었어요!`}
        </span>
        <button
          type="button"
          onClick={() => setIsModalOpen(false)}
          className="flex h-[51px] w-full items-center justify-center rounded-[8px] bg-primary400 py-[14px]"
        >
          <span className="text-body1-semibold text-gray0">확인</span>
        </button>
      </div>
    </Modal>
  );
}
