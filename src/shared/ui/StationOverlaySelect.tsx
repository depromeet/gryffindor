"use client";

import { useState } from "react";
import { Icon, Overlay, Select } from "@/shared/ui";

const stations = [
  { value: "강남역", label: "강남역" },
  { value: "역삼역", label: "역삼역" },
];

const DEFAULT_STATION_VALUE = "강남역";

export function StationOverlaySelect() {
  const [value, setValue] = useState(DEFAULT_STATION_VALUE);
  const [isOpen, setIsOpen] = useState(false);

  const handleValueChange = (value: string) => {
    setValue(value);
    setIsOpen(false);
  };

  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Select
      value={value}
      isOpen={isOpen}
      onValueChange={handleValueChange}
      onOpenChange={setIsOpen}
      closeOnOutsideClick={true}
    >
      <Select.Trigger className="flex items-center gap-[2px]" onClick={toggleIsOpen}>
        <Select.Value
          placeholder="역을 선택하세요"
          className="font-semibold text-Gray-gray900 text-xl leading-relaxed"
        />
        <Select.Icon>
          <Icon name="downArrow" />
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
          {stations.map((station) => (
            <Select.Item
              key={station.value}
              value={station.value}
              className="box-border flex w-full cursor-pointer text-body2-semibold"
            >
              <span
                className={`mx-[20px] flex w-full border-gray100 border-b py-[14px] ${
                  value === station.value ? "text-gray900" : "text-gray400"
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
