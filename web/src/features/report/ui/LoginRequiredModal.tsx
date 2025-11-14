import Image from "next/image";
import { useRouter } from "next/navigation";
import Character from "@/shared/lib/assets/png/character/basic.png";
import { Icon, Modal } from "@/shared/ui";

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  setIsLoginModalOpen: (isOpen: boolean) => void;
}

export function LoginRequiredModal({
  isOpen,
  onClose,
  text,
  setIsLoginModalOpen,
}: LoginRequiredModalProps) {
  const router = useRouter();

  const handleConfirm = () => {
    setIsLoginModalOpen?.(false);
    router.push("/login");
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
            {`${text}는\n로그인 후 가능해요`}
          </span>
          <span className="whitespace-pre-line text-center text-gray700 text-body2-regular">
            로그인을 먼저 해주세요
          </span>
        </div>
        <button
          type="button"
          onClick={handleConfirm}
          className="flex h-[51px] w-full items-center justify-center rounded-[8px] bg-primary400 py-[14px]"
        >
          <span className="text-body1-semibold text-gray0">로그인 하러 가기</span>
        </button>
      </div>
    </Modal>
  );
}
