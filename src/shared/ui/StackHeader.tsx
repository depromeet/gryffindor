"use client";

import { useRouter } from "next/navigation";

import type { HeaderConfig } from "@/shared/config";
import { cn } from "@/shared/lib";

interface StackHeaderProps {
  /**
   * 헤더 설정 객체
   */
  config: HeaderConfig;
  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

/**
 * 스택 네비게이션용 공통 헤더 컴포넌트
 * - 모바일에서 드릴다운 페이지에 사용
 * - 설정 객체 기반 또는 개별 props로 커스터마이징 가능
 */
export function StackHeader({ config, className }: StackHeaderProps) {
  const router = useRouter();

  // config에서 값 추출
  const { title, backButton, rightActions, style } = config;

  const handleBack = () => {
    if (backButton?.action) {
      if (typeof backButton.action === "string") {
        // biome-ignore lint/suspicious/noExplicitAny: Next.js router typing issue
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
        "border-b",
        "h-14 px-4 py-3",
        "sticky top-0 z-40",
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
          {backButton?.icon || (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-700"
            >
              <title>뒤로가기</title>
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
          )}
        </button>
      )}

      {/* 뒤로가기 버튼이 숨겨진 경우 빈 공간 */}
      {backButton?.hidden && <div className="h-10 w-10" />}

      {/* 제목 */}
      <h1 className="flex-1 truncate px-4 text-center font-semibold text-lg">{title}</h1>

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
