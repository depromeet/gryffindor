"use client";

import { Button, Modal } from "@/shared/ui";

interface SuggestionModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
}

export function SuggestionModal({
  isOpen,
  onOpenChange,
  title,
  description,
  onConfirm,
}: SuggestionModalProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} title={title} description={description}>
      <div className="w-[280px] bg-white rounded-lg p-5 flex flex-col items-center">
        <h3 className="text-body1-semibold">{title}</h3>
        <p className="text-body2-regular text-gray-600 mt-2 mb-4">{description}</p>
        <Button label="확인" variant="primary" size="medium" onClick={onConfirm} />
      </div>
    </Modal>
  );
}
