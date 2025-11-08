import Image from "next/image";
import Character from "@/shared/lib/assets/png/character/basic.png";
import { Icon, Modal } from "@/shared/ui";

interface FailureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FailureModal({ isOpen, onClose }: FailureModalProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} title={""} description={""}>
      <div className="flex min-w-[260px] flex-col items-center justify-center gap-6 rounded-lg bg-white p-4">
        <button type="button" className="mb-[-24px] flex h-5 w-full justify-end" onClick={onClose}>
          <Icon name="close" size={24} className="cursor-pointer text-gray400" />
        </button>
        <Image src={Character} alt="character" width={120} height={120} />
        <div className="flex flex-col gap-2">
          <span className="whitespace-pre-line text-center text-gray900 text-subtitle1">
            식당 제보에 실패했어요
          </span>
          <span className="whitespace-pre-line text-center text-gray700 text-body2-regular">
            다시 시도해 주세요.
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-[51px] w-full items-center justify-center rounded-[8px] bg-primary400 py-[14px]"
        >
          <span className="text-body1-semibold text-gray0">확인</span>
        </button>
      </div>
    </Modal>
  );
}
