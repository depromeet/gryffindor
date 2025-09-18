"use client";

import { Overlay } from "./Overlay";

interface ModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, title, description, onOpenChange, children }: ModalProps) {
  return (
    <Overlay
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      overlayZIndex={60}
    >
      <div className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 z-70">
        {children}
      </div>
    </Overlay>
  );
}
