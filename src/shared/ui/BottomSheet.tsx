/**
 * 바텀 시트 컴포넌트
 *
 * @param {boolean} isFixed - 바텀시트 고정 여부
 * @param {boolean} isOpen - 바텀시트 열림/닫힘 상태
 * @param {() => void} onClose - 바텀시트 닫기 콜백 함수
 * @param {number} initialHeight - 초기 바텀시트의 높이
 * @param {number} expandedOffset - 확장된 바텀시트에 화면 상단으로부터의 거리
 *
 * @example
 * <BottomSheet
 *   isFixed={true}
 *   isOpen={true}
 *   onClose={() => setIsOpen(false)}
 *   initialHeight={226}
 *   expandedOffset={88}
 * >
 *   <BottomSheetHeader>
 *     <BottomSheetHandler />
 *   </BottomSheetHeader>
 *   <BottomSheetContent>
 *     내용
 *   </BottomSheetContent>
 * </BottomSheet>
 */

"use client";

import type { PropsWithChildren } from "react";
import { BottomSheetProvider, useBottomSheetContext } from "@/app/_providers";
import { cn } from "@/shared/lib";
import { useBottomSheet } from "../lib/hooks";

interface BottomSheetProps {
  isFixed: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  initialHeight?: number;
  expandedOffset: number;
}

function BottomSheet({
  isFixed,
  isOpen,
  onClose,
  initialHeight,
  expandedOffset,
  children,
}: PropsWithChildren<BottomSheetProps>) {
  const defaultHeight = initialHeight ? initialHeight : window.innerHeight - expandedOffset;
  const { sheetRef, contentRef } = useBottomSheet({
    initialHeight: defaultHeight,
    expandedOffset,
  });

  if (!isOpen) return;

  return (
    <BottomSheetProvider contentRef={isFixed ? null : contentRef}>
      {onClose && <BottomSheetOverlay onClose={onClose} />}
      <dialog
        ref={isFixed ? null : sheetRef}
        className={cn(
          "fixed right-0 left-0 mx-auto flex w-full w-full flex-col gap-[8px] rounded-t-[24px] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)]",
          onClose ? "z-51" : "z-49",
        )}
        style={{
          top: `calc(100% - ${defaultHeight}px)`,
          height: `calc(100% - ${expandedOffset}px)`,
          maxHeight: `calc(100% - ${expandedOffset}px)`,
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          touchAction: "none",
        }}
      >
        {children}
      </dialog>
    </BottomSheetProvider>
  );
}

function BottomSheetHeader({ className, children }: PropsWithChildren<{ className?: string }>) {
  return <div className={cn("relative flex min-h-9 flex-col", className)}>{children}</div>;
}

function BottomSheetContent({ className, children }: PropsWithChildren<{ className?: string }>) {
  const { contentRef } = useBottomSheetContext();

  return (
    <div
      ref={contentRef}
      className={cn(
        "flex h-full w-full flex-1 flex-col items-center justify-between overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}

function BottomSheetOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      aria-hidden="true"
      className="fixed inset-0 z-51 cursor-pointer bg-[#00000066]"
    />
  );
}

function BottomSheetHandler() {
  return (
    <div className="-translate-x-1/2 absolute top-3 left-1/2 h-[4px] w-[45px] rounded-[10px] bg-gray-300" />
  );
}

export { BottomSheet, BottomSheetHeader, BottomSheetContent, BottomSheetHandler };
