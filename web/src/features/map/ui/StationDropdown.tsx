"use client";

import { STATIONS } from "@/shared/model";
import { useLocationStore } from "@/shared/store";
import { RoundedSelectBox } from "@/shared/ui";

export function StationDropdown({ onStationChange }: { onStationChange: () => void }) {
  const { selectedStation, setSelectedStation } = useLocationStore();

  const handleChange = (value: string) => {
    setSelectedStation(value);
    // 지도 이동 완료 대기
    setTimeout(() => {
      onStationChange();
    }, 800);
  };

  return (
    <RoundedSelectBox
      value={selectedStation}
      onChange={handleChange}
      options={[...STATIONS]}
      placeholder="역을 선택하세요"
      contentClassName="left-0"
    />
  );
}
