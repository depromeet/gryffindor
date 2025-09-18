"use client";

import { useState } from "react";
import { Filter } from "@/features/filter/ui";
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetHandler,
  BottomSheetHeader,
  Icon,
  TransitionLayout,
} from "@/shared/ui";

interface FilterData {
  price: { min: number; max: number };
  level: number | null;
  seatTypes: string[];
  categories: string[];
}

export default function MapPage() {
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
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-orange-100 p-6">
        <div className="relative w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
          <button type="button" onClick={() => setIsFilterOpen(true)}>
            Open Filters
          </button>
        </div>
      </div>

      {/* 스토어 리스트 바텀시트 */}
      <BottomSheet isFixed={false} isOpen={false} initialHeight={226} expandedOffset={88}>
        <BottomSheetHeader>
          <BottomSheetHandler />
        </BottomSheetHeader>
        <BottomSheetContent className="gap-[15px]">{/* store list content */}</BottomSheetContent>
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
