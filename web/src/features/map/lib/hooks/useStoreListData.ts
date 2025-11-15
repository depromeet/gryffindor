"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { type Bounds, type Center, useStoreListQuery } from "@/features/map/lib";
import { useStoreSearch } from "@/features/search";
import { useToast } from "@/shared/lib/hooks";
import { useFilterStore } from "@/shared/store";

interface UseStoreListDataParams {
  bounds: Bounds;
  center: Center;
}

/**
 * 지도에 표시할 가게 리스트 데이터 관리
 *
 * 두 가지 모드 지원:
 * 1. 기본 모드: 지도 영역 기반 가게 목록 조회
 * 2. 검색 모드: 검색어 기반 가게 목록 조회
 */
export function useStoreListData({ bounds, center }: UseStoreListDataParams) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query");
  const isSearchMode = !!searchQuery;

  const { filters } = useFilterStore();

  const { showToast } = useToast();

  // 기본 모드: 지도 기반 스토어 목록
  const { storeList: mapStoreList, isFetching: isMapFetching } = useStoreListQuery({
    filters,
    center,
    bounds,
    limit: 30,
    enabled: !isSearchMode,
  });

  // 검색 모드: 검색어 기반 스토어 목록
  const { searchStoreList, isPending, searchStores } = useStoreSearch({
    lat: center.lat,
    lon: center.lon,
  });

  useEffect(() => {
    if (isSearchMode) {
      searchStores({ query: searchQuery });
    }
  }, [isSearchMode, searchQuery, searchStores]);

  useEffect(() => {
    if (!isSearchMode && !isMapFetching && mapStoreList.length === 0) {
      showToast({ message: "아직 이 지역은 준비 중이에요." });
    }
  }, [isSearchMode, isMapFetching, mapStoreList.length, showToast]);

  return {
    storeList: isSearchMode ? searchStoreList : mapStoreList,
    isFetching: isSearchMode ? isPending : isMapFetching,
    isSearchMode,
  };
}
