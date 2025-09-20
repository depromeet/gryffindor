"use client";

import { useState } from "react";
import { PriceRange } from "@/entities/filter/ui";
import { CTA, FilterSection } from "@/shared/ui";
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

const FILTER_SECTIONS: SectionConfig[] = [
  {
    key: "level",
    label: "혼밥 단계",
    options: ["1단계", "2단계", "3단계", "4단계"],
    isMultiple: false,
    getSelected: (draft) => (draft.level !== null ? [`${draft.level}단계`] : []),
    onChange: (setDraft) => (selected) =>
      setDraft((prev) => ({
        ...prev,
        level: selected.length > 0 ? parseInt(selected[0], 10) : null,
      })),
  },
  {
    key: "seatTypes",
    label: "좌석 형태",
    options: ["칸막이", "바 좌석", "1인석", "2인석", "4인석"],
    isMultiple: true,
    getSelected: (draft) => draft.seatTypes,
    onChange: (setDraft) => (selected) => setDraft((prev) => ({ ...prev, seatTypes: selected })),
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
}

export function Filter({ initialFilters, onApply, onClose }: FilterProps) {
  const [draftFilters, setDraftFilters] = useState<FilterData>(initialFilters);

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
      level: null,
      seatTypes: [],
      categories: [],
    });
  };

  const handleApply = () => {
    onApply(draftFilters);
    onClose();
  };

  return (
    <article className="flex flex-col">
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
      <div className="fixed right-0 bottom-0 left-0 z-50 mx-auto max-w-[375px]">
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
