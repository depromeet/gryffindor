"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { searchHistoryApi } from "@/features/search";

/**
 * 서버 검색 기록 관리
 * 로그인 사용자 전용
 */
export function useServerSearchHistory({ enabled }: { enabled: boolean }) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["searchHistory"],
    queryFn: async () => {
      return await searchHistoryApi.getHistory({ limit: 20 });
    },
    enabled,
  });

  const removeHistoryMutation = useMutation({
    mutationFn: async (id: number) => {
      await searchHistoryApi.deleteHistory(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["searchHistory"] });
    },
  });

  const clearHistoryMutation = useMutation({
    mutationFn: async () => {
      await searchHistoryApi.deleteAllHistory();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["searchHistory"] });
    },
  });

  return {
    searchHistory: data || [],
    isLoading,
    removeHistory: removeHistoryMutation.mutate,
    clearHistory: clearHistoryMutation.mutate,
  };
}
