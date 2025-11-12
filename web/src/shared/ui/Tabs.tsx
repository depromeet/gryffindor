"use client";

import React, {
  type ButtonHTMLAttributes,
  createContext,
  type HTMLAttributes,
  // useState는 여기(Tabs)서 사용하지 않습니다.
  type ReactNode,
  useContext,
  useMemo,
} from "react";
import { cn } from "@/shared/lib";

// --- 1. Context 생성 ---
interface TabsContextProps {
  /** 부모로부터 받은 현재 활성 탭의 value */
  activeValue: string;
  /** 부모의 상태를 변경시킬 함수 */
  setActiveValue: (value: string) => void;
  getTriggerId: (value: string) => string;
  getContentId: (value: string) => string;
}

const TabsContext = createContext<TabsContextProps | null>(null);

/**
 * Context를 사용하기 위한 커스텀 훅
 */
const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs.* 컴포넌트들은 반드시 <Tabs> 컴포넌트의 자식으로 사용되어야 합니다.");
  }
  return context;
};

// --- 2. 컴포넌트 Props 타입 정의 ---

// <Tabs> (루트)
interface TabsProps {
  /** 부모가 관리하는 현재 활성 탭의 value (필수) */
  value: string;
  /** 탭 변경 시 부모의 상태를 업데이트할 콜백 함수 (필수) */
  onValueChange: (value: string) => void;
  children: ReactNode;
}

// <Tabs.TriggerList>
interface TriggerListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

// <Tabs.Trigger>
interface TriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  children: ReactNode;
}

// <Tabs.Content>
interface ContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children: ReactNode;
}

// --- 3. 컴포넌트 구현 ---

/**
 * Tabs 컴포넌트의 루트.
 * 상태를 직접 관리하지 않고, 부모로부터 value와 onValueChange를 받아
 * Context를 통해 자식들에게 전달하는 역할만 합니다.
 */
export const Tabs = ({ children, value, onValueChange }: TabsProps) => {
  const contextValue = useMemo(
    () => ({
      // 부모로부터 받은 value와 onValueChange를 그대로 사용
      activeValue: value,
      setActiveValue: onValueChange,
      getTriggerId: (value: string) => `headless-tab-trigger-${value}`,
      getContentId: (value: string) => `headless-tab-content-${value}`,
    }),
    [value, onValueChange],
  ); // value나 onValueChange가 바뀌면 Context 값도 갱신

  // Provider를 통해 하위 컴포넌트들에게 상태와 함수들을 전달
  return <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>;
};

/**
 * 탭 트리거(버튼)들을 감싸는 컨테이너입니다.
 */
const TriggerList = ({ children, ...props }: TriggerListProps) => {
  return (
    <div role="tablist" {...props}>
      {children}
    </div>
  );
};

/**
 * 탭을 활성화하는 클릭 가능한 버튼입니다.
 */
const Trigger = ({ children, value, disabled, className, ...props }: TriggerProps) => {
  // Context에서 부모의 상태(activeValue)와 변경 함수(setActiveValue)를 가져옵니다.
  const { activeValue, setActiveValue, getTriggerId, getContentId } = useTabsContext();
  const isActive = activeValue === value;

  // 클릭 시 Context의 함수(=부모의 onValueChange)를 호출합니다.
  const handleClick = () => {
    if (disabled) return;
    setActiveValue(value);
  };

  return (
    <button
      type="button"
      role="tab"
      id={getTriggerId(value)}
      aria-selected={isActive}
      aria-controls={getContentId(value)}
      data-state={isActive ? "active" : "inactive"}
      data-active={isActive}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={handleClick}
      className={cn("group", className)}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * 탭의 실제 내용을 담는 컨테이너입니다.
 */
const Content = ({ children, value, ...props }: ContentProps) => {
  const { activeValue, getTriggerId, getContentId } = useTabsContext();
  const isActive = activeValue === value;

  return (
    <div
      role="tabpanel"
      id={getContentId(value)}
      aria-labelledby={getTriggerId(value)}
      hidden={!isActive}
      {...props}
    >
      {children}
    </div>
  );
};

// --- 4. 합성 컴포넌트 완성 ---
Tabs.TriggerList = TriggerList;
Tabs.Trigger = Trigger;
Tabs.Content = Content;

// export default Tabs;
