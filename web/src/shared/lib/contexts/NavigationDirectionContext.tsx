"use client";

import type { PropsWithChildren } from "react";
import { createContext, useContext } from "react";
import { type NavigationDirection, useNavigationDirection } from "../hooks/useNavigationDirection";

const NavigationDirectionContext = createContext<NavigationDirection>("forward");

export function NavigationDirectionProvider({ children }: PropsWithChildren) {
  const direction = useNavigationDirection();

  return (
    <NavigationDirectionContext.Provider value={direction}>
      {children}
    </NavigationDirectionContext.Provider>
  );
}

export function useNavigationDirectionContext(): NavigationDirection {
  return useContext(NavigationDirectionContext);
}
