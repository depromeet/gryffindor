"use client";

import { useEffect, useState } from "react";
import { PriceRange } from "@/entities/filter/ui";
import type { SeatTypes } from "@/entities/storeList/api";
import { CTA, FilterSection, Icon } from "@/shared/ui";
import type { FilterData, SectionConfig } from "../model/types";
import { areFiltersEqual } from "../utils/filter";

const ALL_CATEGORIES = [
  "한식",
  "일식",
  "중식",
  "양식",
  "패스트푸드",
  "분식",
  "아시아음식",
  "카페",
  "기타",
];

const SEAT_TYPE_MAP: Record<SeatTypes, string> = {
  CUBICLE: "칸막이",
  BAR_TABLE: "바 좌석",
  FOR_ONE: "1인석",
  FOR_TWO: "2인석",
  FOR_FOUR: "4인석",
};

const FILTER_SECTIONS: SectionConfig[] = [
  {
    key: "seatTypes",
    label: "좌석 형태",
    options: ["칸막이", "바 좌석", "1인석", "2인석", "4인석"],
    isMultiple: true,
    getSelected: (draft) => draft.seatTypes.map((type) => SEAT_TYPE_MAP[type]),
    onChange: (setDraft) => (selectedLabels) =>
      setDraft((prev) => ({
        ...prev,
        seatTypes: selectedLabels.map(
          (label) => Object.entries(SEAT_TYPE_MAP).find(([, v]) => v === label)?.[0] as SeatTypes,
        ),
      })),
  },
  {
    key: "categories",
    label: "메뉴 카테고리",
    options: ALL_CATEGORIES,
    isMultiple: true,
    withCheckbox: true,
    getSelected: (draft) => draft.categories,
    onChange: (setDraft) => (selected) => setDraft((prev) => ({ ...prev, categories: selected })),
    getChecked: (draft) => draft.categories.length === ALL_CATEGORIES.length,
    onCheckChange: (setDraft) => (checked) =>
      setDraft((prev) => ({
        ...prev,
        categories: checked ? ALL_CATEGORIES : [],
      })),
  },
];

interface FilterProps {
  initialFilters: FilterData;
  onApply: (filters: FilterData) => void;
  onClose: () => void;
  isOpen?: boolean;
}

export function Filter({ initialFilters, onApply, onClose, isOpen }: FilterProps) {
  const [draftFilters, setDraftFilters] = useState<FilterData>(initialFilters);

  // 바텀시트가 열릴 때마다 store의 실제 필터 값으로 초기화
  useEffect(() => {
    if (isOpen) {
      setDraftFilters(initialFilters);
    }
  }, [isOpen, initialFilters]);

  const isDirty = !areFiltersEqual(initialFilters, draftFilters);

  const handlePriceChange = (range: [number, number]) => {
    setDraftFilters((prev) => ({
      ...prev,
      price: { min: range[0], max: range[1] },
    }));
  };

  const handleReset = () => {
    setDraftFilters({
      price: { min: 0, max: 20000 },
      honbobLevel: initialFilters.honbobLevel,
      seatTypes: [],
      categories: [],
      sortBy: "RECOMMENDED",
    });
  };

  const handleApply = () => {
    onApply(draftFilters);
    onClose();
  };

  return (
    <article className="flex flex-col">
      {/* <div className="mt-[65px] h-[1px] w-full bg-gray100" /> */}

      {FILTER_SECTIONS.map((section) => {
        const sectionProps = {
          label: section.label,
          options: section.options,
          isMultiple: section.isMultiple,
          showCheckbox: section.withCheckbox,
          selectedItems: section.getSelected(draftFilters),
          onChange: section.onChange(setDraftFilters),
          checked: section.getChecked?.(draftFilters),
          onCheckChange: section.onCheckChange?.(setDraftFilters),
        };
        return <FilterSection key={section.key} {...sectionProps} />;
      })}

      <PriceRange
        label="가격 범위"
        values={[draftFilters.price.min, draftFilters.price.max]}
        onChange={handlePriceChange}
      />
      <div className="mt-[51px]"></div>
      <div className="fixed right-0 bottom-0 left-0 z-50 mx-auto">
        <CTA
          secondaryLabel="초기화"
          primaryLabel="완료"
          onSecondary={handleReset}
          onPrimary={handleApply}
          primaryDisabled={!isDirty}
        />
      </div>
    </article>
  );
}
