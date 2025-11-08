"use client";

import * as Toast from "@radix-ui/react-toast";
import { type ToastContent, useToastStore } from "@/shared/store/toastStore";

interface ToastItemProps {
  toast: ToastContent;
  onOpenChange: (open: boolean) => void;
}

function ToastItem({ toast, onOpenChange }: ToastItemProps) {
  return (
    <Toast.Root
      open
      onOpenChange={onOpenChange}
      duration={toast.duration}
      className="flex min-w-[320px] items-center rounded-lg bg-gray800 px-4 py-3"
    >
      <Toast.Description className="flex-1 text-body2-regular text-white">
        {toast.message}
      </Toast.Description>
    </Toast.Root>
  );
}

export function ToastContainer() {
  const { toasts, hideToast } = useToastStore();

  return (
    <Toast.Provider swipeDirection="up">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onOpenChange={(open) => {
            if (!open) hideToast(toast.id);
          }}
        />
      ))}
      <Toast.Viewport className="fixed bottom-20 left-1/2 z-999 flex -translate-x-1/2 flex-col items-center gap-2 p-0" />
    </Toast.Provider>
  );
}
