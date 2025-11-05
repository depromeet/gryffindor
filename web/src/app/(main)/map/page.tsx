"use client";

import {
  useLocation,
  useMapCoordinate,
  useMapDrag,
  useMapFilters,
  useMapInitialize,
  useStoreListQuery,
} from "@/features/map/lib";
import {
  FetchStoreListButton,
  FilterBottomSheet,
  MapActionButton,
  MapMarkers,
  MapView,
  StoreBottomSheet,
} from "@/features/map/ui";

import { TransitionLayout } from "@/shared/ui";

export default function MapPage() {
  const { map, mapContainerRef, initializeMap } = useMapInitialize();
  const { bounds, center, updateCoordinate } = useMapCoordinate();
  const { requestLocation } = useLocation(map);
  const { isDragging, resetDragging } = useMapDrag(map);

  const { isFilterOpen, filters, openFilter, closeFilter, applyFilters } = useMapFilters();
  const { storeList, isFetching } = useStoreListQuery(filters, {
    bounds,
    center,
  });

  const handleStoreListFetch = () => {
    updateCoordinate(map);
    resetDragging();
  };

  return (
    <TransitionLayout>
      <MapView mapRef={mapContainerRef} initializeMap={initializeMap} />
      <MapMarkers map={map} storeList={storeList} />
      <FetchStoreListButton onClick={handleStoreListFetch} isFetching={isFetching} />
      <MapActionButton type="filter" onClick={openFilter} />
      <MapActionButton type="location" onClick={requestLocation} />
      <StoreBottomSheet storeList={storeList} isCollapsed={isDragging} />
      <FilterBottomSheet
        isOpen={isFilterOpen}
        onClose={closeFilter}
        initialFilters={filters}
        onApply={applyFilters}
      />
    </TransitionLayout>
  );
}
