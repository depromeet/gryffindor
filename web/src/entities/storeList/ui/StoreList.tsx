"use client";

import Link from "next/link";
import { useEffect } from "react";
import { getDefaultStationCenter } from "@/entities/storeList/lib";
import { useUserState } from "@/entities/user";
import { useStoreListQuery } from "@/features/map/lib";
import { FilterBottomSheet, LevelFilterButton } from "@/features/map/ui";
import { useInfiniteScroll } from "@/shared/lib";
import { useFilterStore, useLocationStore } from "@/shared/store";
import { Icon } from "@/shared/ui";
import { StoreCard } from "./StoreCard";
import { StoreLevelList } from "./StoreLevelList";

export function StoreList() {
  const { userState } = useUserState();
  const { selectedStation } = useLocationStore();
  const { isFilterOpen, filters, openFilter, closeFilter, setFilters, initializeFilters } =
    useFilterStore();

  // 필터가 기본값(레벨 1)일 때만 유저 레벨로 초기화
  useEffect(() => {
    if (
      filters.honbobLevels.length === 1 &&
      filters.honbobLevels[0] === 1 &&
      userState.honbobLevel !== 1
    ) {
      initializeFilters(userState.honbobLevel);
    }
  }, [userState.honbobLevel, filters.honbobLevels, initializeFilters]);

  const handleApplyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
    closeFilter();
  };

  const centerLatLonInfo = getDefaultStationCenter(selectedStation);

  const { storeList, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useStoreListQuery({
      filters,
      center: {
        lat: centerLatLonInfo.lat,
        lon: centerLatLonInfo.lon,
      },
      limit: 10,
      station: selectedStation,
    });

  const loadMoreTriggerRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    enabled: !isLoading && !error,
  });

  const levelDisplayValue =
    filters.honbobLevels.length > 1 ? "커스텀" : `레벨${filters.honbobLevels[0] || 1}`;

  return (
    <div className="flex flex-col bg-gray0 pb-[20px]">
      <FilterBottomSheet
        isOpen={isFilterOpen}
        onClose={closeFilter}
        initialFilters={filters}
        onApply={handleApplyFilters}
        defaultTab="levelFilter"
      />

      <div className="flex p-[20px]">
        {/* <button
          type="button"
          onClick={openFilter}
          className="w-fit flex items-center gap-1 pl-3 pr-4 py-1.5 cursor-pointer rounded-[20px] bg-primary400 shadow-fab"
        >
          <Icon name="filter" size={24} color="gray0" />
          <span className="text-body2-medium text-gray0">레벨{"1"}</span>
        </button> */}
        <LevelFilterButton honbobLevel={levelDisplayValue} onClick={openFilter} />
      </div>
      {/* <StoreLevelList userLevel={selectedLevel} onLevelChange={handleLevelChange} /> */}
      {/* <StoreFilter/> */}
      {isLoading && (
        <div className="flex h-full min-h-[calc(100vh-380px)] flex-col items-center justify-center bg-gray0 px-[20px]">
          <span className="text-body2 text-gray500">로딩 중...</span>
        </div>
      )}
      {error && (
        <div className="flex h-full min-h-[calc(100vh-380px)] flex-col items-center justify-center bg-gray0 px-[20px]">
          <span className="text-body2 text-red500">데이터를 불러오는데 실패했습니다.</span>
        </div>
      )}
      <ul className="flex flex-col gap-y-[15px] px-[20px]">
        {storeList?.map((store) => (
          <li key={store.id}>
            <Link href={`/store/${store.id}`}>
              <StoreCard {...store} />
            </Link>
          </li>
        ))}
      </ul>
      {hasNextPage && (
        <div ref={loadMoreTriggerRef} className="flex items-center justify-center py-4">
          {isFetchingNextPage && (
            <div className="text-body2 text-gray500">더 많은 매장을 불러오는 중...</div>
          )}
        </div>
      )}
    </div>
  );
}
