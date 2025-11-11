"use client";

import { useEffect } from "react";
import {
  useLocation,
  useMapCoordinate,
  useMapDrag,
  useMapFilters,
  useMapInitialize,
  useStoreListQuery,
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
import { useToast } from "@/shared/lib/hooks";
import { TransitionLayout } from "@/shared/ui";

export default function MapPage() {
  const { map, mapContainerRef, initializeMap } = useMapInitialize();
  const { bounds, center, updateCoordinate } = useMapCoordinate();
  const { requestLocation } = useLocation(map);
  const { isDragging, resetDragging } = useMapDrag(map);

  const { isFilterOpen, filters, openFilter, closeFilter, applyFilters } = useMapFilters();
  const { storeList, isFetching } = useStoreListQuery({
    filters,
    center,
    bounds,
    limit: 30,
  });

  const { showToast } = useToast();

  // 다중 선택시 "커스텀" 표시
  const levelDisplayValue =
    filters.honbobLevels.length > 1 ? "커스텀" : `레벨${filters.honbobLevels[0] || 1}`;

  const handleStoreListFetch = () => {
    updateCoordinate(map);
    resetDragging();
  };

  useEffect(() => {
    if (!isFetching && storeList.length === 0) {
      showToast({ message: "아직 이 지역의 식당 데이터가 없어요." });
    }
  }, [isFetching, storeList.length, showToast]);

  return (
    <TransitionLayout>
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
      <CurrentLocationButton onClick={requestLocation} />
      <StoreBottomSheet
        storeList={storeList}
        isCollapsed={isDragging}
        onStationChange={() => updateCoordinate(map)}
      />
      <FilterBottomSheet
        isOpen={isFilterOpen}
        onClose={closeFilter}
        initialFilters={filters}
        onApply={applyFilters}
      />
    </TransitionLayout>
  );
}
