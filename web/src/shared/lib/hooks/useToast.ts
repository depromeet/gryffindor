import { useCallback } from "react";
import { useToastStore } from "@/shared/store";

export function useToast() {
  const showToastStore = useToastStore((state) => state.showToast);

  const showToast = useCallback(
    ({ message, duration = 3000 }: { message: string; duration?: number }) => {
      showToastStore({ message, duration });
    },
    [showToastStore],
  );

  return { showToast };
}
