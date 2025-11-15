"use client";

import Link from "next/link";
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
import { useFilterStore } from "@/shared/store";
import { TransitionLayout } from "@/shared/ui";

export default function MapPage() {
  const { map, mapContainerRef, initializeMap } = useMapInitialize();
  const { bounds, center, updateCoordinate } = useMapCoordinate();
  const { requestLocation } = useLocation(map);
  const { isDragging, resetDragging } = useMapDrag(map);

  const { storeList, isFetching } = useStoreListData({ bounds, center });
  const { isFilterOpen, filters, openFilter, closeFilter, setFilters } = useFilterStore();

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
      <CurrentLocationButton onClick={requestLocation} />
      <StoreBottomSheet
        storeList={storeList || []}
        isCollapsed={isDragging}
        onStationChange={() => updateCoordinate(map)}
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
