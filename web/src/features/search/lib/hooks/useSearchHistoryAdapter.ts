"use client";

import { useUserState } from "@/entities/user";
import type { SearchHistoryResponse } from "@/features/search";
import { useServerSearchHistory } from "../queries/useServerSearchHistory";
import { useLocalSearchHistory } from "./useLocalSearchHistory";

export interface UseSearchHistoryReturn {
  searchHistory: SearchHistoryResponse[];
  isLoading?: boolean;
  addHistory?: (query: string) => void;
  removeHistory: (id: number) => void;
  clearHistory: () => void;
}

/**
 * 검색 히스토리 관리 Adapter 훅
 *
 * 로그인/비로그인 상태에 따라 적절한 검색 히스토리 관리 방식을 자동으로 선택
 * - 로그인: 서버 API를 통한 검색 히스토리 관리
 * - 비로그인: localStorage를 통한 로컬 검색 히스토리 관리
 */
export function useSearchHistoryAdapter(): UseSearchHistoryReturn {
  const { userState } = useUserState();

  const serverHistory = useServerSearchHistory({ enabled: userState.isLoggedIn });
  const localHistory = useLocalSearchHistory({ enabled: !userState.isLoggedIn });

  return userState.isLoggedIn ? serverHistory : localHistory;
}
