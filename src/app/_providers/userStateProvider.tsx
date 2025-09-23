"use client";

import { useSession } from "next-auth/react";
import type React from "react";
import { useMemo } from "react";
import { UserStateContext } from "@/entities/user/model/context";
import { deriveUserState } from "@/shared/lib/utils/deriveUserState";

interface UserStateProviderProps {
  children: React.ReactNode;
}

export function UserStateProvider({ children }: UserStateProviderProps) {
  const { data: session, status } = useSession();

  const userState = useMemo(() => {
    return deriveUserState(session);
  }, [session]);

  const isLoading = status === "loading";

  return (
    <UserStateContext.Provider value={{ userState, isLoading }}>
      {children}
    </UserStateContext.Provider>
  );
}
