"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/shared/lib";

interface OverlayProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;

  // 접근성
  title?: string;
  description?: string;

  // 스타일 커스터마이징
  overlayClassName?: string;
  // contentClassName?: string;

  // z-index 제어
  overlayZIndex?: number;

  // 동작 제어
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;

  // Portal 제어
  container?: HTMLElement;
}

export function Overlay({
  isOpen,
  onOpenChange,
  children,
  title = "오버레이",
  description = "오버레이 컨텐츠",
  overlayClassName,
  overlayZIndex = 60,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  container,
}: OverlayProps) {
  const overlayStyle = { zIndex: overlayZIndex };

  return (
    <Dialog.Root open={isOpen} onOpenChange={closeOnOverlayClick ? onOpenChange : undefined}>
      <Dialog.Portal container={container}>
        <Dialog.Overlay
          className={cn("fixed inset-0", overlayClassName || "bg-black/30")}
          style={overlayStyle}
          onClick={closeOnOverlayClick ? () => onOpenChange(false) : undefined}
        />
        <Dialog.Title className="sr-only">{title}</Dialog.Title>
        <Dialog.Description className="sr-only">{description}</Dialog.Description>
        <Dialog.Content onEscapeKeyDown={closeOnEscape ? () => onOpenChange(false) : undefined}>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
