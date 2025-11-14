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
 *    <span>컨텐츠 영역</span>
 *   </BottomSheetContent>
 * </BottomSheet>
 */

"use client";

import {
  createContext,
  type PropsWithChildren,
  type RefObject,
  useContext,
  useEffect,
  useState,
} from "react";
import { cn } from "@/shared/lib";
import { useBottomSheet } from "../lib/hooks";

interface BottomSheetContextProps {
  contentRef?: RefObject<HTMLDivElement | null> | null;
}

const BottomSheetContext = createContext<BottomSheetContextProps | null>(null);

export function useBottomSheetContext() {
  const context = useContext(BottomSheetContext);

  if (!context) throw new Error("useBottomSheetContext must be used within BottomSheetProvider");
  return context;
}

interface BottomSheetProps {
  isFixed: boolean;
  isOpen: boolean;
  onClose?: () => void;
  initialHeight?: number;
  expandedOffset?: number;
}

function BottomSheet({
  isFixed,
  isOpen,
  onClose,
  initialHeight,
  expandedOffset = 88,
  children,
}: PropsWithChildren<BottomSheetProps>) {
  const [clientHeight, setClientHeight] = useState(0);

  useEffect(() => {
    setClientHeight(window.innerHeight);
  }, []);

  const height = initialHeight ?? clientHeight - expandedOffset;
  const { sheetRef, contentRef } = useBottomSheet({ initialHeight: height, expandedOffset });

  return (
    <BottomSheetContext.Provider value={{ contentRef: isFixed ? null : contentRef }}>
      {isFixed && isOpen && <BottomSheetOverlay onClose={onClose || (() => {})} />}
      <dialog
        ref={isFixed ? null : sheetRef}
        className={cn(
          "fixed right-0 left-0 mx-auto flex w-full flex-col rounded-t-[24px] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)]",
          "transition-all duration-300 ease-out",
          isFixed ? "z-51" : "z-49",
        )}
        style={{
          top: `calc(100% - ${height}px)`,
          height: `calc(100% - ${expandedOffset}px)`,
          paddingBottom: "var(--safe-area-inset-bottom)",
          transform: isOpen ? "translate3d(0, 0, 0)" : "translate3d(0, 100%, 0)",
        }}
      >
        {children}
      </dialog>
    </BottomSheetContext.Provider>
  );
}

function BottomSheetHeader({ className, children }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("relative flex min-h-9 touch-none flex-col", className)}>{children}</div>
  );
}

function BottomSheetContent({ className, children }: PropsWithChildren<{ className?: string }>) {
  const { contentRef } = useBottomSheetContext();

  return (
    <div
      ref={contentRef}
      className={cn("scrollbar-hide h-full w-full", className)}
      style={{ overflowY: "scroll", touchAction: "pan-y" }}
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
    <div className="-translate-x-1/2 absolute top-3 left-1/2 h-[4px] w-[45px] rounded-[10px] bg-[#DFDFDF]" />
  );
}

export { BottomSheet, BottomSheetHeader, BottomSheetContent, BottomSheetHandler };
