"use client";

import { useEffect, useRef } from "react";

interface BottomSheetMetrics {
  start: { sheetY: number; touchY: number }; // 드래그 시작 시 시트 위치와 터치 위치
  direction: "none" | "up" | "down"; // 드래그 방향
  isDraggingOnContent: boolean; // 컨텐츠 영역에서 드래그
  isSheetMovable: boolean; // 바텀시트 확장/축소 가능
}

interface UseBottomSheetProps {
  initialHeight: number; // 초기 바텀 시트의 높이
  expandedOffset: number; // 확장된 바텀시트에 화면 상단으로부터의 거리
}

export function useBottomSheet({ initialHeight, expandedOffset }: UseBottomSheetProps) {
  const sheetRef = useRef<HTMLDialogElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const metrics = useRef<BottomSheetMetrics>({
    start: { sheetY: 0, touchY: 0 },
    direction: "none",
    isDraggingOnContent: false,
    isSheetMovable: true,
  });

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    content.style.overflowY = "hidden";
    content.style.touchAction = "none";
  }, []);

  useEffect(() => {
    const sheet = sheetRef.current;
    const content = contentRef.current;
    if (!sheet || !content) return;

    const initialSheetY = window.innerHeight - initialHeight;

    const expandSheet = () => {
      sheet.style.transform = `translate3d(0, ${expandedOffset - initialSheetY}px, 0)`;
      sheet.style.transition = "transform 0.3s cubic-bezier(0.4,0,0.2,1)";
      content.style.overflowY = "auto";
      content.style.touchAction = "pan-y";
    };

    const collapseSheet = () => {
      sheet.style.transform = "translate3d(0, 0px, 0)";
      sheet.style.transition = "transform 0.3s cubic-bezier(0.4,0,0.2,1)";
      content.style.overflowY = "hidden";
      content.style.touchAction = "none";
    };

    const handlePointerDown = (e: PointerEvent) => {
      sheet.setPointerCapture(e.pointerId);

      const sheetY = sheet.getBoundingClientRect().y;
      const isExpanded = sheetY === expandedOffset;

      metrics.current.start.sheetY = sheetY;
      metrics.current.start.touchY = e.clientY;

      if (metrics.current.isDraggingOnContent && isExpanded && content.scrollTop > 0) {
        metrics.current.isSheetMovable = false;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const { start, isSheetMovable } = metrics.current;

      if (!isSheetMovable) return;

      const deltaY = e.clientY - start.touchY;
      metrics.current.direction = deltaY > 0 ? "down" : "up";

      const newY = Math.min(Math.max(start.sheetY + deltaY, expandedOffset), initialSheetY);
      sheet.style.transform = `translate3d(0, ${newY - initialSheetY}px, 0)`;
    };

    const handlePointerUp = (e: PointerEvent) => {
      sheet.releasePointerCapture(e.pointerId);

      const { direction, isSheetMovable } = metrics.current;

      if (isSheetMovable) {
        if (direction === "up") expandSheet();
        if (direction === "down") collapseSheet();

        setTimeout(() => {
          sheet.style.transition = "";
        }, 300);
      }

      // metrics 초기화
      metrics.current.start = { sheetY: 0, touchY: 0 };
      metrics.current.direction = "none";
      metrics.current.isDraggingOnContent = false;
      metrics.current.isSheetMovable = true;
    };

    const handleLostPointerCapture = () => {
      handlePointerUp(new PointerEvent("pointerup"));
    };

    sheet.addEventListener("pointerdown", handlePointerDown);
    sheet.addEventListener("pointermove", handlePointerMove, { passive: false });
    sheet.addEventListener("pointerup", handlePointerUp);
    sheet.addEventListener("lostpointercapture", handleLostPointerCapture);

    return () => {
      sheet.removeEventListener("pointerdown", handlePointerDown);
      sheet.removeEventListener("pointermove", handlePointerMove);
      sheet.removeEventListener("pointerup", handlePointerUp);
      sheet.removeEventListener("lostpointercapture", handleLostPointerCapture);
    };
  }, [initialHeight, expandedOffset]);

  useEffect(() => {
    const handlePointerDown = () => {
      metrics.current.isDraggingOnContent = true;
    };

    contentRef.current?.addEventListener("pointerdown", handlePointerDown);
    return () => contentRef.current?.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return { sheetRef, contentRef };
}
