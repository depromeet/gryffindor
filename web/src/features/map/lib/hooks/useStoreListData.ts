"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { type Bounds, type Center, useStoreListQuery } from "@/features/map/lib";
import { useStoreSearch } from "@/features/search";
import { useFilterStore } from "@/shared/store";

interface UseStoreListDataParams {
  bounds: Bounds;
  center: Center;
}

/**
 * 지도에 표시할 가게 리스트 데이터 관리
 * 검색 모드와 일반 모드 통합 관리
 */
export function useStoreListData({ bounds, center }: UseStoreListDataParams) {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const { filters } = useFilterStore();

  // 일반 모드: 지도 기반 스토어 목록
  const { storeList: baseStoreList, isFetching: isBaseFetching } = useStoreListQuery({
    filters,
    center,
    bounds,
    limit: 30,
    enabled: !query,
  });

  // 검색 모드: 검색어 기반 스토어 목록
  const { searchStoreList, isPending, searchStores } = useStoreSearch();

  useEffect(() => {
    if (query) {
      searchStores({ query });
    }
  }, [query]);

  const isSearchMode = !!query;

  return {
    storeList: isSearchMode ? searchStoreList : baseStoreList,
    isFetching: isSearchMode ? isPending : isBaseFetching,
    isSearchMode,
  };
}
