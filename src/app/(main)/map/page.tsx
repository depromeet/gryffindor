"use client";

import { useState } from "react";
import { STORE_INFO_DATA } from "@/entities/storeList/model/storeInfoData";
import { Filter } from "@/features/filter/ui";
import { MapFloatingButton, MapRefreshButton } from "@/features/map/ui";
import { NaverMap } from "@/features/map/ui/NaverMap";
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetHandler,
  BottomSheetHeader,
  Icon,
  TransitionLayout,
} from "@/shared/ui";

export type SeatTypes = "FOR_ONE" | "FOR_TWO" | "FOR_FOUR" | "CUBICLE" | "BAR_TABLE";

export const SEAT_TYPES_MAP: Record<SeatTypes, string> = {
  FOR_ONE: "1인석",
  FOR_TWO: "2인석",
  FOR_FOUR: "4인석",
  CUBICLE: "칸막이",
  BAR_TABLE: "바 좌석",
};

export interface StoreInfoProps {
  id: number;
  name: string;
  thumbnailUrl: string;
  signatureMenu: { name: string; price: number };
  coordinate: { lat: number; lon: number };
  distance: number;
  walkingMinutes: number;
  seats: SeatTypes[];
  honbobLevel: number;
}

interface FilterData {
  price: { min: number; max: number };
  level: number | null;
  seatTypes: string[];
  categories: string[];
}

export default function MapPage() {
  // TODO: API 연동 후, 목 데이터 제거
  const [storeList] = useState<StoreInfoProps[]>(STORE_INFO_DATA);
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

  return (
    <TransitionLayout>
      <NaverMap
        storeList={storeList}
        selectedStoreId={selectedStoreId}
        onStoreSelect={(id) => setSelectedStoreId(id)}
      />

      <MapRefreshButton onClick={() => {}} />
      <MapFloatingButton
        iconName="filter"
        position={{ top: 85, right: 19 }}
        onClick={() => setIsFilterOpen(true)}
      />
      <MapFloatingButton
        iconName="target"
        position={{ bottom: 242, right: 19 }}
        onClick={() => {}}
      />

      {/* 식당 리스트 바텀시트 */}
      <BottomSheet isFixed={false} isOpen={true} initialHeight={226} expandedOffset={88}>
        <BottomSheetHeader>
          <BottomSheetHandler />
        </BottomSheetHeader>
        <BottomSheetContent className="px-5 pb-9">{/* store list content */}</BottomSheetContent>
      </BottomSheet>

      {/* 필터 바텀시트 */}
      {isFilterOpen && (
        <BottomSheet
          isFixed={true}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          expandedOffset={88}
        >
          <BottomSheetHeader>
            <div className="flex items-center justify-between p-5">
              <div className="justify-start text-subtitle1">필터 옵션</div>
              <button type="button" onClick={() => setIsFilterOpen(false)}>
                <Icon size={24} name="close" className="cursor-pointer text-gray400" />
              </button>
            </div>
          </BottomSheetHeader>
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
