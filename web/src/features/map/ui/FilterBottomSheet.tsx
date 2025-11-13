"use client";

import { useEffect, useState } from "react";
import { honbobLevelCardList } from "@/entities/honbob";
import { HonbobLevelFilterCard } from "@/entities/honbob/ui/HonbobLevelFilterCard";
import type { FilterData } from "@/features/filter/model/types";
import { Filter } from "@/features/filter/ui";
import { BottomSheet, BottomSheetContent, CTA, FilterButton, Icon, Tabs } from "@/shared/ui";

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
            <article className="flex flex-col">
              <div className="w-full flex flex-col p-5 gap-y-[16px]">
                <div className="flex w-full gap-x-[12px]">
                  {[1, 2, 3, 4].map((level) => (
                    <FilterButton
                      key={level}
                      label={`레벨${level}`}
                      variant="outline"
                      selected={selectedLevels.includes(level)}
                      onClick={() => handleLevelToggle(level)}
                      className="flex-1 min-w-0"
                    />
                  ))}
                </div>
                {honbobLevelCardInfo && (
                  <div>
                    <HonbobLevelFilterCard
                      honbobLevel={honbobLevelCardInfo.honbobLevel}
                      honbobLevelTitle={honbobLevelCardInfo.honbobLevelTitle}
                      honbobLevelDescription={honbobLevelCardInfo.honbobLevelDescription}
                      recommendedMenu={honbobLevelCardInfo.recommendedMenu}
                      recommendedStore={honbobLevelCardInfo.recommendedStore}
                    />
                  </div>
                )}
              </div>
              <div className="mt-[51px]"></div>
              <div className="fixed right-0 bottom-0 left-0 z-50 mx-auto">
                <CTA
                  secondaryLabel="초기화"
                  primaryLabel="완료"
                  onSecondary={handleLevelReset}
                  onPrimary={handleLevelFilterApply}
                  primaryDisabled={!isLevelFilterDirty}
                />
              </div>
            </article>
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
