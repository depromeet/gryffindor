import Image from "next/image";
import { useRouter } from "next/navigation";
import Character from "@/shared/lib/assets/png/character/basic.png";
import { Icon, Modal } from "@/shared/ui";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const handleConfirm = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} title={""} description={""}>
      <div className="flex min-w-[260px] flex-col items-center justify-center gap-6 rounded-lg bg-white p-4">
        <button type="button" className="mb-[-24px] flex h-5 w-full justify-end" onClick={onClose}>
          <Icon name="close" size={24} className="cursor-pointer text-gray400" />
        </button>
        <Image src={Character} alt="character" width={120} height={120} />
        <div className="flex flex-col gap-2">
          <span className="whitespace-pre-line text-center text-gray900 text-subtitle1">
            식당을 제보했어요
          </span>
          <span className="whitespace-pre-line text-center text-gray700 text-body2-regular">
            제보해주셔서 감사합니다.
          </span>
        </div>
        <button
          type="button"
          onClick={handleConfirm}
          className="flex h-[51px] w-full items-center justify-center rounded-[8px] bg-primary400 py-[14px]"
        >
          <span className="text-body1-semibold text-gray0">완료하기</span>
        </button>
      </div>
    </Modal>
  );
}
