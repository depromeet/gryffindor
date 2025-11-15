"use client";

import { useMutation } from "@tanstack/react-query";
import type { StoreListResponseData } from "@/entities/storeList/api/types";
import { searchHistoryApi } from "@/features/search";
import { useToast } from "@/shared/lib/hooks";

export function useStoreSearch({ lat, lon }: { lat: number; lon: number }) {
  const { showToast } = useToast();

  const mutation = useMutation<StoreListResponseData[], Error, { query: string; limit?: number }>({
    mutationFn: async ({ query, limit = 20 }) => {
      return await searchHistoryApi.searchStore({
        query,
        paging: { limit },
        lat,
        lon,
      });
    },
    onSuccess: (data) => {
      if (data.length === 0) showToast({ message: "아쉽게도 일치하는 결과가 없어요." });
    },
    onError: (error) => {
      console.error("❌ [useStoreSearch] 검색 실패:", error);
    },
  });

  return {
    searchStoreList: mutation.data || [],
    isPending: mutation.isPending,
    searchStores: mutation.mutate,
  };
}
