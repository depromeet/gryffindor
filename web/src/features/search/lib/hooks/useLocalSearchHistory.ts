"use client";

import { useCallback, useEffect, useState } from "react";
import { type SearchHistoryResponse, searchHistoryStorage } from "@/features/search";

/**
 * 로컬 스토리지 기반 검색 기록 관리
 * 비로그인 사용자 전용
 */
export function useLocalSearchHistory({ enabled }: { enabled: boolean }) {
  const [searchHistory, setSearchHistory] = useState<SearchHistoryResponse[]>([]);

  useEffect(() => {
    if (enabled) {
      setSearchHistory(searchHistoryStorage.get());
    }
  }, [enabled]);

  const addHistory = useCallback((query: string) => {
    searchHistoryStorage.add(query);
    setSearchHistory(searchHistoryStorage.get());
  }, []);

  const removeHistory = useCallback((id: number) => {
    searchHistoryStorage.remove(id);
    setSearchHistory(searchHistoryStorage.get());
  }, []);

  const clearHistory = useCallback(() => {
    searchHistoryStorage.clear();
    setSearchHistory([]);
  }, []);

  return {
    searchHistory,
    addHistory,
    removeHistory,
    clearHistory,
  };
}
