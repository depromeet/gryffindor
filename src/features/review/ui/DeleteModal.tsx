import Image from "next/image";
import Character from "@/shared/lib/assets/png/character/basic.png";
import { Icon, Modal } from "@/shared/ui";

interface DeleteModalProps {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (open: boolean) => void;
}

export function DeleteModal({ isDeleteModalOpen, setIsDeleteModalOpen }: DeleteModalProps) {
  return (
    <Modal
      isOpen={isDeleteModalOpen}
      onOpenChange={setIsDeleteModalOpen}
      title="리뷰 삭제"
      description="리뷰를 삭제하시겠습니까?"
    >
      <div className="flex min-w-[260px] flex-col items-center justify-center gap-6 rounded-lg bg-white p-4">
        <button
          type="button"
          className="mb-[-24px] flex h-5 w-full justify-end"
          onClick={() => setIsDeleteModalOpen(false)}
        >
          <Icon name="close" size={24} className="cursor-pointer text-gray400" />
        </button>
        <Image src={Character} alt="character" width={120} height={120} />
        <span className="text-center text-gray900 text-subtitle1">정말 삭제하시겠어요?</span>
        <button
          type="button"
          onClick={() => setIsDeleteModalOpen(false)}
          className="flex h-[51px] w-full items-center justify-center rounded-[8px] bg-primary400 py-[14px]"
        >
          <span className="text-body1-semibold text-gray0">확인</span>
        </button>
      </div>
    </Modal>
  );
}
