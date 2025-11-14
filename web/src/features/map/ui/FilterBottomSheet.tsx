"use client";

import { useEffect, useState } from "react";
import { honbobLevelCardList } from "@/entities/honbob";

import type { FilterData } from "@/features/filter/model/types";
import { Filter } from "@/features/filter/ui";
import { BottomSheet, BottomSheetContent, Icon, Tabs } from "@/shared/ui";
import { LevelFilterTab } from "./LevelFilterTab";

interface FilterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  initialFilters: FilterData;
  onApply: (filters: FilterData) => void;
  defaultTab?: "levelFilter" | "customFilter";
}

export function FilterBottomSheet({
  isOpen,
  onClose,
  initialFilters,
  onApply,
  defaultTab = "customFilter",
}: FilterBottomSheetProps) {
  const [selectedTab, setSelectedTab] = useState(defaultTab);
  const [selectedLevels, setSelectedLevels] = useState<number[]>(initialFilters.honbobLevel);

  const findHonbobLevelCard = (level: number) =>
    honbobLevelCardList.find((card) => card.honbobLevel === `Lv.${level}`);

  // 마지막에 클릭한 레벨 (배열의 마지막 요소)
  const lastSelectedLevel = selectedLevels[selectedLevels.length - 1] || 1;
  const honbobLevelCardInfo = findHonbobLevelCard(lastSelectedLevel);

  // 바텀시트가 열릴 때마다 현재 필터 상태로 로컬 상태 초기화
  useEffect(() => {
    if (isOpen) {
      setSelectedLevels(initialFilters.honbobLevel);
    }
  }, [isOpen, initialFilters.honbobLevel]);

  const handleLevelToggle = (level: number) => {
    setSelectedLevels((prev) => {
      if (prev.includes(level)) {
        // 이미 선택되어 있으면 제거
        return prev.filter((l) => l !== level);
      } else {
        // 선택되어 있지 않으면 추가 (클릭 순서 유지)
        return [...prev, level];
      }
    });
  };

  const handleLevelReset = () => {
    setSelectedLevels(initialFilters.honbobLevel);
  };

  const handleLevelFilterApply = () => {
    const levels = selectedLevels.length === 0 ? initialFilters.honbobLevel : selectedLevels;
    onApply({ ...initialFilters, honbobLevel: levels });
    onClose();
  };

  const isLevelFilterDirty =
    selectedLevels.length !== initialFilters.honbobLevel.length ||
    !selectedLevels.every((level) => initialFilters.honbobLevel.includes(level));

  // 탭에 따라 다른 offset 설정
  const expandedOffset = selectedTab === "levelFilter" ? 280 : 88;

  return (
    <BottomSheet isFixed={true} isOpen={isOpen} onClose={onClose} expandedOffset={expandedOffset}>
      <BottomSheetContent className="pb-7">
        <header className="sticky top-0 z-10 flex w-full items-center rounded-t-[24px] bg-gray0 p-5">
          <button type="button" onClick={onClose} className="ml-auto">
            <Icon size={24} name="close" className="cursor-pointer text-gray400" />
          </button>
        </header>
        <Tabs
          value={selectedTab}
          onValueChange={(value) => setSelectedTab(value as "levelFilter" | "customFilter")}
        >
          <Tabs.TriggerList className="sticky top-[64px]  z-10 flex w-full items-center bg-gray0 px-5 gap-x-[64px] justify-center">
            <Tabs.Trigger value="levelFilter">
              <div className="text-body1-semibold bg-gray0 flex w-[100px] items-center justify-center pb-[20px] border-b-2 border-transparent group-data-[active=true]:border-gray700 transition-all duration-300">
                <span>레벨별 필터</span>
              </div>
            </Tabs.Trigger>
            <Tabs.Trigger value="customFilter">
              <div className="text-body1-semibold bg-gray0 flex  w-[100px] items-center justify-center pb-[20px] border-b-2 border-transparent group-data-[active=true]:border-gray700 transition-all duration-300">
                <span>커스텀 필터</span>
              </div>
            </Tabs.Trigger>
          </Tabs.TriggerList>
          <Tabs.Content value="levelFilter">
            <LevelFilterTab
              selectedLevels={selectedLevels}
              handleLevelToggle={handleLevelToggle}
              honbobLevelCardInfo={honbobLevelCardInfo}
              handleLevelReset={handleLevelReset}
              handleLevelFilterApply={handleLevelFilterApply}
              isLevelFilterDirty={isLevelFilterDirty}
            />
          </Tabs.Content>
          <Tabs.Content value="customFilter">
            <Filter
              initialFilters={initialFilters}
              onApply={onApply}
              onClose={onClose}
              isOpen={isOpen}
            />
          </Tabs.Content>
        </Tabs>
      </BottomSheetContent>
    </BottomSheet>
  );
}
