"use client";

import { useState } from "react";
import { STATIONS } from "@/shared/model";
import { useLocationStore } from "@/shared/store";
import { Icon, Overlay, Select } from "@/shared/ui";

export function StationOverlaySelect() {
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
      closeOnOutsideClick={false}
    >
      <Select.Trigger className="flex items-center gap-[2px]">
        <Select.Value
          placeholder="역을 선택하세요"
          className="font-semibold text-Gray-gray900 text-xl leading-relaxed"
        />
        <Select.Icon className="size-[24px]">
          <Icon name="downArrow" disableCurrentColor />
        </Select.Icon>
      </Select.Trigger>
      <Overlay
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="역 선택"
        description="원하는 역을 선택해주세요"
        overlayZIndex={60}
      >
        <Select.Content className="fixed top-[52px] left-[20px] z-70 max-h-[60vh] w-[180px] overflow-y-auto rounded-[10px] bg-white">
          {STATIONS.map((station) => (
            <Select.Item
              key={station.value}
              value={station.value}
              className="box-border flex w-full cursor-pointer text-body2-semibold"
            >
              <span
                className={`mx-[20px] flex w-full border-gray100 border-b py-[14px] ${
                  selectedStation === station.value ? "text-gray900" : "text-gray400"
                }`}
              >
                {station.label}
              </span>
            </Select.Item>
          ))}
        </Select.Content>
      </Overlay>
    </Select>
  );
}
