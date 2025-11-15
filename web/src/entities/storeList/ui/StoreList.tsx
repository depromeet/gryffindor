"use client";

import Link from "next/link";
import { getDefaultStationCenter, getLevelFilterDisplayValue } from "@/entities/storeList/lib";
import { useStoreListQuery } from "@/features/map/lib";
import { FilterBottomSheet, LevelFilterButton } from "@/features/map/ui";
import { GA4_RECOMMENDED_EVENTS, useGAClick, useInfiniteScroll } from "@/shared/lib";
import { useFilterStore, useLocationStore } from "@/shared/store";
import { RoundedSelectBox } from "@/shared/ui";
import { StoreCard } from "./StoreCard";

const sortOptions = [
  { value: "RECOMMENDED", label: "추천순" },
  { value: "DISTANCE", label: "거리순" },
];

export function StoreList() {
  const { selectedStation } = useLocationStore();
  const { isFilterOpen, filters, sortBy, openFilter, closeFilter, setFilters, setSortBy } =
    useFilterStore();

  const handleApplyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
    closeFilter();
  };

  const centerLatLonInfo = getDefaultStationCenter(selectedStation);
  const levelFilterDisplayValue = getLevelFilterDisplayValue(filters.honbobLevel);

  const { storeList, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useStoreListQuery({
      filters,
      sortBy,
      center: {
        lat: centerLatLonInfo.lat,
        lon: centerLatLonInfo.lon,
      },
      limit: 30,
      station: selectedStation,
    });

  const loadMoreTriggerRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    enabled: !isLoading && !error,
  });

  const trackStoreCardClick = useGAClick(GA4_RECOMMENDED_EVENTS.SELECT_CONTENT, {
    select_content_type: "click_store_card",
  });

  return (
    <div className="flex flex-col bg-gray0 pb-[20px]">
      <FilterBottomSheet
        isOpen={isFilterOpen}
        onClose={closeFilter}
        initialFilters={filters}
        onApply={handleApplyFilters}
        defaultTab="levelFilter"
      />

      <div className="flex gap-2 p-[20px] justify-between">
        <LevelFilterButton
          honbobLevel={levelFilterDisplayValue}
          onClick={openFilter}
          isShadowed={false}
        />
        <RoundedSelectBox
          value={sortBy}
          onChange={(value) => setSortBy(value as "DISTANCE" | "RECOMMENDED")}
          options={sortOptions}
          placeholder="정렬"
        />
      </div>
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
            <Link
              href={`/store/${store.id}`}
              onClick={() => trackStoreCardClick({ store_id: store.id, store_name: store.name })}
            >
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
