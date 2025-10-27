"use client";

import { useRouter } from "next/navigation";

import type { HeaderConfig } from "@/shared/config";
import { cn } from "@/shared/lib";
import { Icon } from "./Icon";

interface StackHeaderProps {
  /**
   * 헤더 설정 객체
   */
  config: HeaderConfig;
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  title?: string;
}

/**
 * 스택 네비게이션용 공통 헤더 컴포넌트
 * - 모바일에서 드릴다운 페이지에 사용
 * - 설정 객체 기반 또는 개별 props로 커스터마이징 가능
 */
export function StackHeader({ config, className, title: dynamicTitle }: StackHeaderProps) {
  const router = useRouter();

  // config에서 값 추출
  const { title, backButton, rightActions, style } = config;

  const handleBack = () => {
    if (backButton?.action) {
      if (typeof backButton.action === "string") {
        router.push(backButton.action as any);
      } else {
        backButton.action();
      }
    } else {
      router.back();
    }
  };

  // 스타일 적용
  const headerStyle = {
    backgroundColor: style?.backgroundColor || "white",
    color: style?.textColor || "inherit",
    borderBottomColor: style?.borderColor || "#e5e7eb",
  };

  return (
    <header
      className={cn(
        "flex items-center justify-between",
        "border-gray100 border-b",
        "h-[60px] px-[20px] py-[14px]",
        "fixed top-0 z-40 left-0 right-0",
        className,
      )}
      style={headerStyle}
    >
      {/* 뒤로가기 버튼 */}
      {!backButton?.hidden && (
        <button
          type="button"
          onClick={handleBack}
          className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
          aria-label="뒤로가기"
        >
          {backButton?.icon || <Icon size={24} name="leftArrow" disableCurrentColor />}
        </button>
      )}

      {/* 뒤로가기 버튼이 숨겨진 경우 빈 공간 */}
      {backButton?.hidden && <div className="h-10 w-10" />}

      {/* 제목 */}
      <h1 className="flex-1 truncate text-center font-semibold text-base">
        {dynamicTitle || title}
      </h1>

      {/* 우측 액션 영역 */}
      <div className="flex items-center gap-1">
        {rightActions && rightActions.length > 0 ? (
          rightActions.map((action: React.ReactNode, index: number) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: rightActions order is stable
            <div key={index}>{action}</div>
          ))
        ) : (
          <div className="h-10 w-10" /> // 빈 공간으로 중앙 정렬 유지
        )}
      </div>
    </header>
  );
}
