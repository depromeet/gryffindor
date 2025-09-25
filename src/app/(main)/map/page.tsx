"use client";

import { useState } from "react";
import type { StoreSearchResponse } from "@/entities/storeList/api";
import { STORE_LIST_MOCK_DATA } from "@/entities/storeList/model";
import { SelectedStorePreviewCard, StorePreviewList } from "@/entities/storeList/ui";
import { Filter } from "@/features/filter/ui";
import { FetchStoreListButton, MapActionButton } from "@/features/map/ui";
import { NaverMap } from "@/features/map/ui/NaverMap";
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetHandler,
  BottomSheetHeader,
  TransitionLayout,
} from "@/shared/ui";

interface FilterData {
  price: { min: number; max: number };
  level: number | null;
  seatTypes: string[];
  categories: string[];
}

export default function MapPage() {
  // TODO: API 연동 후, 목 데이터 제거
  const [storeList] = useState<StoreSearchResponse[]>(STORE_LIST_MOCK_DATA);
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterData>({
    price: { min: 0, max: 20000 },
    level: null,
    seatTypes: [],
    categories: [],
  });

  const handleApplyFilters = (newFilters: FilterData) => {
    setFilters(newFilters);
  };

  const selectedStoreInfo = storeList.find((store) => store.id === selectedStoreId);

  return (
    <TransitionLayout>
      <NaverMap
        storeList={storeList}
        selectedStoreId={selectedStoreId}
        onStoreSelect={(id) => setSelectedStoreId(id)}
      />

      <FetchStoreListButton onClick={() => {}} />
      <MapActionButton type="filter" onClick={() => setIsFilterOpen(true)} />
      <MapActionButton type="location" onClick={() => {}} />

      {/* 식당 리스트 바텀시트 */}
      {selectedStoreInfo ? (
        <SelectedStorePreviewCard {...selectedStoreInfo} />
      ) : (
        <BottomSheet isFixed={false} isOpen={true} initialHeight={226} expandedOffset={88}>
          <BottomSheetHeader>
            <BottomSheetHandler />
          </BottomSheetHeader>
          <BottomSheetContent className="px-5 pb-9">
            <StorePreviewList storeList={storeList} />
          </BottomSheetContent>
        </BottomSheet>
      )}

      {/* 필터 바텀시트 */}
      {isFilterOpen && (
        <BottomSheet
          isFixed={true}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          expandedOffset={88}
        >
          <BottomSheetContent className="pb-7">
            <Filter
              initialFilters={filters}
              onApply={handleApplyFilters}
              onClose={() => setIsFilterOpen(false)}
            />
          </BottomSheetContent>
        </BottomSheet>
      )}
    </TransitionLayout>
  );
}
