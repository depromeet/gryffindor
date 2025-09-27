"use client";

import { useEffect, useRef } from "react";

interface BottomSheetMetrics {
  start: { sheetY: number; touchY: number }; // 드래그 시작 시 시트 위치와 터치 위치
  direction: "none" | "up" | "down"; // 드래그 방향
  isDraggingOnContent: boolean; // 컨텐츠 영역에서 드래그 중인지 여부
}

interface UseBottomSheetProps {
  initialHeight: number; // 초기 바텀 시트의 높이
  expandedOffset: number; // 화면 상단으로부터 바텀시트 확장 위치
}

export function useBottomSheet({ initialHeight, expandedOffset }: UseBottomSheetProps) {
  const sheetRef = useRef<HTMLDialogElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const metrics = useRef<BottomSheetMetrics>({
    start: { sheetY: 0, touchY: 0 },
    direction: "none",
    isDraggingOnContent: false,
  });

  const collapsedYRef = useRef(0); // 초기 바텀 시트 Y 좌표

  useEffect(() => {
    collapsedYRef.current = window.innerHeight - initialHeight;
  }, [initialHeight]);

  useEffect(() => {
    const [sheet, content] = [sheetRef.current, contentRef.current];
    if (!sheet || !content) return;

    // Y 좌표를 collapsedY ~ expandedY 사이로 제한
    const clamp = (value: number) =>
      Math.min(Math.max(value, expandedOffset), collapsedYRef.current);

    // 바텀시트를 움직일 수 있는 상황인지 확인
    const isSheetMovable = () => {
      const { direction, isDraggingOnContent } = metrics.current;

      // 컨텐츠 영역에서 드래그 중이 아니거나 바텀시트가 확장되지 않은 경우는 이동 가능
      if (!isDraggingOnContent) return true;
      if (sheet.getBoundingClientRect().y !== expandedOffset) return true;

      const atTop = content.scrollTop <= 0;
      const atBottom = content.scrollTop + content.clientHeight >= content.scrollHeight;

      // 드래그 방향에 따라 이동 가능 여부 결정
      return direction === "down" ? atTop : atBottom;
    };

    // 드래그 중 바텀시트 위치 업데이트
    const handlePointerMove = (e: PointerEvent) => {
      const { start } = metrics.current;
      const deltaY = e.clientY - start.touchY;
      if (deltaY === 0) return;

      metrics.current.direction = deltaY > 0 ? "down" : "up";

      if (isSheetMovable()) {
        e.preventDefault();

        const nextY = clamp(start.sheetY + deltaY);
        sheet.style.transform = `translate3d(0, ${nextY - collapsedYRef.current}px, 0)`;
      }
    };

    // 드래그 종료 시 스냅 위치로 이동
    const handlePointerUp = () => {
      const currentY = sheet.getBoundingClientRect().y;
      const snapTo =
        Math.abs(currentY - expandedOffset) < Math.abs(currentY - collapsedYRef.current)
          ? expandedOffset
          : collapsedYRef.current;

      sheet.style.transform = `translate3d(0, ${snapTo - collapsedYRef.current}px, 0)`;
      sheet.style.transition = "transform 0.3s cubic-bezier(0.4,0,0.2,1)";

      setTimeout(() => {
        sheet.style.transition = "";
      }, 250);

      metrics.current.start = { sheetY: 0, touchY: 0 };
      metrics.current.direction = "none";

      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    };

    // 드래그 시작 시 초기 위치 저장
    const handlePointerDown = (e: PointerEvent) => {
      metrics.current.start.sheetY = sheet.getBoundingClientRect().y;
      metrics.current.start.touchY = e.clientY;

      document.addEventListener("pointermove", handlePointerMove, { passive: false });
      document.addEventListener("pointerup", handlePointerUp);
    };

    sheet.addEventListener("pointerdown", handlePointerDown);

    return () => {
      sheet.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [expandedOffset]);

  // 컨텐츠 영역에서 드래그 중임을 체크
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const handleContentPointer = () => {
      metrics.current.isDraggingOnContent = true;
    };

    content.addEventListener("pointerdown", handleContentPointer);
    return () => content.removeEventListener("pointerdown", handleContentPointer);
  }, []);

  return { sheetRef, contentRef };
}
