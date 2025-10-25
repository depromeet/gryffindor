"use client";

import {
  useLocation,
  useMapCoordinate,
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

  const { isFilterOpen, filters, openFilter, closeFilter, applyFilters } = useMapFilters();
  const { storeList, isFetching } = useStoreListQuery(filters, {
    bounds,
    center,
  });

  return (
    <TransitionLayout>
      <MapView mapRef={mapContainerRef} initializeMap={initializeMap} />
      <MapMarkers map={map} storeList={storeList} />
      <FetchStoreListButton onClick={() => updateCoordinate(map)} isFetching={isFetching} />
      <MapActionButton type="filter" onClick={openFilter} />
      <MapActionButton type="location" onClick={requestLocation} />
      <StoreBottomSheet storeList={storeList} />
      <FilterBottomSheet
        isOpen={isFilterOpen}
        onClose={closeFilter}
        initialFilters={filters}
        onApply={applyFilters}
      />
    </TransitionLayout>
  );
}
