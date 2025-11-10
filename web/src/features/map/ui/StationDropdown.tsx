"use client";

import { useState } from "react";
import { useLocationStore } from "@/shared/store";
import { Icon, Select } from "@/shared/ui";

export function StationDropdown() {
  const { selectedStation, setSelectedStation } = useLocationStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleValueChange = (value: string) => {
    setSelectedStation(value);
    setIsOpen(false);
  };

  return (
    <Select
      value={selectedStation}
      isOpen={isOpen}
      onValueChange={handleValueChange}
      onOpenChange={setIsOpen}
      closeOnOutsideClick={true}
    >
      <Select.Trigger className="flex items-center gap-1 rounded-full border border-gray200 pl-3 pr-2 py-1.5">
        <Select.Value placeholder="역을 선택하세요" className="text-body2-medium text-gray700" />
        <Select.Icon>
          <Icon name="downArrow" color="gray400" size={16} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Content className="fixed top-20 w-[180px] z-100 rounded-[10px] border border-gray100 bg-gray0 shadow-navigation">
        <Select.Item value="강남역" className="relative px-5 py-3.5">
          <span
            className={`text-body2-semibold  ${
              selectedStation === "강남역" ? "text-gray900" : "text-gray400"
            }`}
          >
            강남역
          </span>
          <div className="absolute bottom-0 w-[140px] h-px border-b border-gray100" />
        </Select.Item>
        <Select.Item value="역삼역" className="px-5 py-3.5">
          <span
            className={`text-body2-semibold ${
              selectedStation === "역삼역" ? "text-gray900" : "text-gray400"
            }`}
          >
            역삼역
          </span>
        </Select.Item>
      </Select.Content>
    </Select>
  );
}
