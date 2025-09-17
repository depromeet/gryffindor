"use client";

import type { PropsWithChildren, RefObject } from "react";
import { createContext, useContext } from "react";

interface BottomSheetContextProps {
  contentRef: RefObject<HTMLDivElement | null>;
}

const BottomSheetContext = createContext<BottomSheetContextProps | null>(null);

export function useBottomSheetContext() {
  const context = useContext(BottomSheetContext);

  if (!context) throw new Error("useBottomSheetContext must be used within BottomSheetProvider");
  return context;
}

interface BottomSheetProviderProps {
  contentRef: RefObject<HTMLDivElement | null>;
}

export function BottomSheetProvider({
  contentRef,
  children,
}: PropsWithChildren<BottomSheetProviderProps>) {
  return (
    <BottomSheetContext.Provider value={{ contentRef }}>{children}</BottomSheetContext.Provider>
  );
}
