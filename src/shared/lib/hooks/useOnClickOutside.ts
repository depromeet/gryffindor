"use client";

import { type RefObject, useEffect } from "react";

type Event = MouseEvent | TouchEvent;

interface UseOnClickOutsideProps {
  refs: RefObject<HTMLElement | null>[];
  handler: (event: Event) => void;
  enabled: boolean;
}

export function useOnClickOutside({ refs, handler, enabled = true }: UseOnClickOutsideProps) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const listener = (event: Event) => {
      const isInside = refs.some((ref) => ref.current?.contains(event.target as Node));

      if (isInside) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [refs, handler, enabled]);
}
