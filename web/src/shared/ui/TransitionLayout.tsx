"use client";

import { SsgoiTransition } from "@ssgoi/react";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

import { getRouteConfig, getRoutePattern } from "@/shared/config/routeConfig";
import { useMobile } from "@/shared/lib";
import { StackHeader } from "./StackHeader";

type TransitionType = "fade" | "drill" | "auto";

interface TransitionLayoutProps extends PropsWithChildren {
  /**
   * 수동으로 지정할 transition ID (기본값: 현재 pathname)
   */
  id?: string;
  /**
   * 애니메이션 타입
   * - "fade": 페이드 인/아웃
   * - "drill": 드릴 인/아웃 (모바일 전용)
   * - "auto": 디바이스와 라우트 그룹에 따라 자동 선택
   */
  transition?: TransitionType;
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  /**
   * 디바이스 타입 강제 지정 (기본값: useMobile 훅 사용)
   */
  forceMobile?: boolean;
  dynamicTitle?: string;
}

/**
 * 라우트 그룹을 감지하여 적절한 transition 타입을 결정
 */
function getAutoTransition(pathname: string, isMobile: boolean): TransitionType {
  // PC에서는 모든 페이지가 fade
  if (!isMobile) {
    return "fade";
  }

  return getRouteConfig(pathname).transition;
}

/**
 * 스마트한 페이지 전환 레이아웃 컴포넌트
 * - 자동 pathname 감지
 * - 디바이스별 애니메이션 적용 (useMobile 훅 사용)
 * - 라우트 그룹별 전환 타입 자동 선택
 */
export function TransitionLayout({
  children,
  id,
  transition = "auto",
  className = "min-h-full min-w-full",
  forceMobile,
  dynamicTitle,
}: TransitionLayoutProps) {
  const pathname = usePathname();
  const detectedMobile = useMobile();
  const isMobile = forceMobile !== undefined ? forceMobile : detectedMobile;

  // ID는 수동 지정이 우선, 없으면 route pattern 사용
  // 예: /store/123 → /store/*, /store/123/review → /store/*/review
  const transitionId = id || getRoutePattern(pathname);

  // 애니메이션 타입 결정
  const actualTransition =
    transition === "auto" ? getAutoTransition(pathname, isMobile) : transition;

  // PC에서 drill이 지정되면 fade로 대체
  const finalTransition = !isMobile && actualTransition === "drill" ? "fade" : actualTransition;

  // 라우트 설정 가져오기
  const routeConfig = getRouteConfig(pathname);

  // 헤더가 필요한지 확인
  const needsHeader = routeConfig.header && isMobile;

  return (
    <>
      {/* 헤더는 transition 컨테이너 밖에 배치하여 fixed가 정상 작동하도록 함 */}
      {needsHeader && routeConfig.header && (
        <StackHeader config={routeConfig.header} title={dynamicTitle} />
      )}

      <SsgoiTransition
        id={transitionId}
        className={className}
        data-transition={finalTransition}
        data-device={isMobile ? "mobile" : "desktop"}
      >
        {/* 페이지 콘텐츠 - 헤더가 있으면 상단 여백 추가 */}
        {needsHeader ? <div className="h-full pt-[60px]">{children}</div> : children}
      </SsgoiTransition>
    </>
  );
}
