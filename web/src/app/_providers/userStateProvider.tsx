"use client";

import { useSession } from "next-auth/react";
import type React from "react";
import { useEffect, useMemo } from "react";
import { UserStateContext } from "@/entities/user/model/context";
import { deriveUserState } from "@/shared/lib/utils/deriveUserState";
import { useFilterStore } from "@/shared/store";

interface UserStateProviderProps {
  children: React.ReactNode;
}

export function UserStateProvider({ children }: UserStateProviderProps) {
  const { data: session, status } = useSession();
  const { initializeFilters, hasInitialized } = useFilterStore();

  const userState = useMemo(() => {
    // status가 loading일 때는 이전 상태를 유지하고, unauthenticated일 때는 null로 처리
    if (status === "loading") {
      return deriveUserState(session);
    }
    if (status === "unauthenticated") {
      return deriveUserState(null);
    }
    return deriveUserState(session);
  }, [session, status]);

  const isLoading = status === "loading";

  // 로그인한 유저의 honbobLevel로 필터 초기화
  useEffect(() => {
    if (!isLoading && userState.isLoggedIn && !hasInitialized) {
      initializeFilters(userState.honbobLevel);
    }
  }, [isLoading, userState.isLoggedIn, userState.honbobLevel, hasInitialized, initializeFilters]);

  return (
    <UserStateContext.Provider value={{ userState, isLoading }}>
      {children}
    </UserStateContext.Provider>
  );
}
