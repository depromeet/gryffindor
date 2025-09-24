"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useRef } from "react";
import { cn, useOnClickOutside } from "@/shared/lib";

interface SelectContextValue {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  value?: string;
  onValueChange?: (value: string) => void;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
  contentRef?: React.RefObject<HTMLDivElement | null>;
  closeOnOutsideClick?: boolean;
}

const SelectContext = createContext<SelectContextValue | null>(null);

function useSelectContext() {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used within Select.Root");
  }
  return context;
}

// Root 컴포넌트 - controlled
interface SelectRootProps {
  children: ReactNode;
  value: string;
  onValueChange: (value: string) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  closeOnOutsideClick?: boolean;
}

function SelectRoot({
  children,
  value,
  onValueChange,
  isOpen,
  onOpenChange,
  closeOnOutsideClick,
}: SelectRootProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleValueChange = (newValue: string) => {
    onValueChange(newValue);
    onOpenChange(false);
  };

  useOnClickOutside({
    refs: [triggerRef, contentRef],
    handler: () => onOpenChange(false),
    enabled: isOpen && !!closeOnOutsideClick,
  });

  return (
    <SelectContext.Provider
      value={{
        value,
        onValueChange: handleValueChange,
        isOpen,
        onOpenChange,
        triggerRef,
        contentRef,
        closeOnOutsideClick,
      }}
    >
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
}

interface SelectTriggerProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

function SelectTrigger({ children, className = "", onClick }: SelectTriggerProps) {
  const { isOpen, onOpenChange, triggerRef } = useSelectContext();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (onClick) {
      onClick();
    }

    onOpenChange(!isOpen);
  };

  return (
    <button
      ref={triggerRef}
      type="button"
      onClick={handleClick}
      className={cn("flex items-center justify-between", className)}
      // 접근성 속성들
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-controls="headless-select-listbox"
      aria-labelledby="headless-select-label"
    >
      {children}
    </button>
  );
}

interface SelectValueProps {
  placeholder?: string;
  className?: string;
}

function SelectValue({ placeholder = "선택하세요", className = "" }: SelectValueProps) {
  const { value } = useSelectContext();

  return (
    <>
      <span id="headless-select-label" className="sr-only">
        선택된 값
      </span>
      <span className={cn(className)}>{value || placeholder}</span>
    </>
  );
}

interface SelectIconProps {
  children?: ReactNode;
  className?: string;
}

function SelectIcon({ children, className = "" }: SelectIconProps) {
  const { isOpen } = useSelectContext();

  return (
    <span className={cn("transition-transform", isOpen ? "rotate-180" : "", className)}>
      {children || "▼"}
    </span>
  );
}

interface SelectContentProps {
  children: ReactNode;
  className?: string;
}

function SelectContent({ children, className = "" }: SelectContentProps) {
  const { isOpen, contentRef } = useSelectContext();

  if (!isOpen) return null;

  return (
    <div
      ref={contentRef}
      id="headless-select-listbox"
      className={cn(className)}
      role="listbox"
      aria-labelledby="headless-select-label"
    >
      {children}
    </div>
  );
}

interface SelectItemProps {
  children: ReactNode;
  value: string;
  className?: string;
  disabled?: boolean;
}

function SelectItem({ children, value, className = "", disabled = false }: SelectItemProps) {
  const { value: selectedValue, onValueChange } = useSelectContext();
  const isSelected = selectedValue === value;

  const handleClick = () => {
    if (!disabled) {
      onValueChange?.(value);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "w-full text-left",
        isSelected ? "selected" : "",
        disabled ? "disabled" : "",
        className,
      )}
      role="option"
      aria-selected={isSelected}
    >
      {children}
    </button>
  );
}

export const Select = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Value: SelectValue,
  Icon: SelectIcon,
  Content: SelectContent,
  Item: SelectItem,
});
