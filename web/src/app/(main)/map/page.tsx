"use client";

import Link from "next/link";
import { useState } from "react";
import {
  useLocation,
  useMapCoordinate,
  useMapDrag,
  useMapInitialize,
  useStoreListData,
} from "@/features/map/lib";
import {
  CurrentLocationButton,
  FetchStoreListButton,
  FilterBottomSheet,
  LevelFilterButton,
  MapMarkers,
  MapView,
  StoreBottomSheet,
} from "@/features/map/ui";
import { SearchBar } from "@/features/search";
import { CUSTOM_EVENTS, useGATimeSpent } from "@/shared/lib";
import { useFilterStore } from "@/shared/store";
import { TransitionLayout } from "@/shared/ui";

export default function MapPage() {
  const { map, mapContainerRef, initializeMap } = useMapInitialize();
  const { bounds, center, updateCoordinate } = useMapCoordinate();
  const { requestLocation } = useLocation(map);
  const { isDragging, resetDragging } = useMapDrag(map);

  // 페이지 체류 시간 추적 (최소 3초 이상 머물렀을 때만 전송)
  useGATimeSpent(
    CUSTOM_EVENTS.TIME_ON_PAGE,
    {
      page_name: "map",
    },
    3,
  );

  const { storeList, isFetching } = useStoreListData({ bounds, center });
  const { isFilterOpen, filters, openFilter, closeFilter, setFilters } = useFilterStore();

  // TODO: 임시 구현, 나중에 Observer로 자동 감지 개선 예정
  const [bottomSheetHeight, setBottomSheetHeight] = useState(0);

  const levelDisplayValue =
    filters.honbobLevel.length > 1 ? "커스텀" : `레벨${filters.honbobLevel[0] || 1}`;

  const handleStoreListFetch = () => {
    updateCoordinate(map);
    resetDragging();
  };

  return (
    <TransitionLayout>
      <Link href="/search">
        <SearchBar />
      </Link>
      <MapView mapRef={mapContainerRef} initializeMap={initializeMap} />
      <MapMarkers map={map} storeList={storeList} />
      <FetchStoreListButton onClick={handleStoreListFetch} isFetching={isFetching} />
      <div
        className="fixed right-5 z-40"
        style={{
          top: "calc(84px + env(safe-area-inset-top))",
        }}
      >
        <LevelFilterButton honbobLevel={levelDisplayValue} onClick={openFilter} />
      </div>
      <CurrentLocationButton bottomOffset={bottomSheetHeight} onClick={requestLocation} />
      <StoreBottomSheet
        storeList={storeList || []}
        isCollapsed={isDragging}
        onStationChange={() => updateCoordinate(map)}
        onHeightChange={setBottomSheetHeight}
      />
      <FilterBottomSheet
        isOpen={isFilterOpen}
        onClose={closeFilter}
        initialFilters={filters}
        onApply={setFilters}
      />
    </TransitionLayout>
  );
}
