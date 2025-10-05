import React from "react";

interface SelectPopoverProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function SelectPopover({ onEdit, onDelete }: SelectPopoverProps) {
  return (
    <div className="absolute z-10 flex w-[109px] flex-col items-start rounded-[10px] border border-gray-100 bg-gray-0 shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-opacity duration-300">
      <button
        type="button"
        onClick={onEdit}
        className="flex w-full items-center justify-start gap-2 rounded-t-[10px] bg-gray0 px-5 py-3.5"
      >
        <span className="text-body2-semibold">수정</span>
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="flex w-full items-center justify-start gap-2 rounded-t-[10px] bg-gray0 px-5 py-3.5"
      >
        <span className="text-body2-semibold">삭제</span>
      </button>
    </div>
  );
}

export default SelectPopover;
