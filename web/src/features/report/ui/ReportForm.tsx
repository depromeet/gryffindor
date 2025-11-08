"use client";

import type { Dispatch, SetStateAction } from "react";
import type { SeatTypes } from "@/entities/storeList/api";
import { FilterSection, Input, InputReview } from "@/shared/ui";

const SEAT_TYPE_MAP: Record<SeatTypes, string> = {
  CUBICLE: "칸막이",
  BAR_TABLE: "바 좌석",
  FOR_ONE: "1인석",
  FOR_TWO: "2인석",
  FOR_FOUR: "4인석",
};

interface ReportFormProps {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  recommendedMenu: string;
  setRecommendedMenu: Dispatch<SetStateAction<string>>;
  reason: string;
  setReason: Dispatch<SetStateAction<string>>;
  seatTypes: SeatTypes[];
  setSeatTypes: Dispatch<SetStateAction<SeatTypes[]>>;
}

export const ReportForm = ({
  location,
  setLocation,
  name,
  setName,
  recommendedMenu,
  setRecommendedMenu,
  reason,
  setReason,
  seatTypes,
  setSeatTypes,
}: ReportFormProps) => {
  const handleSeatTypesChange = (selectedLabels: string[]) => {
    const newSeatTypes = selectedLabels.map(
      (label) => Object.entries(SEAT_TYPE_MAP).find(([, v]) => v === label)?.[0] as SeatTypes,
    );
    setSeatTypes(newSeatTypes);
  };

  return (
    <div className="flex min-h-screen flex-col gap-y-[36px] bg-white p-[20px] pb-[100px]">
      <div className="flex flex-col gap-y-[8px]">
        <span className="text-subtitle1">가게 위치</span>
        <Input
          label=""
          placeholder="어느 지역에 있나요? ex) 강남역"
          value={location}
          onChange={setLocation}
        />
      </div>
      <div className="flex flex-col gap-y-[8px]">
        <span className="text-subtitle1">가게 정보</span>
        <Input label="" placeholder="가게 이름이 무엇인가요?" value={name} onChange={setName} />
      </div>
      <div className="flex flex-col gap-y-[8px]">
        <span className="text-subtitle1">추천 메뉴</span>
        <Input
          label=""
          placeholder="추천 메뉴를 적어주세요."
          value={recommendedMenu}
          onChange={setRecommendedMenu}
        />
      </div>
      <div className="flex flex-col gap-y-[8px]">
        <span className="text-subtitle1">식당 추천 이유</span>
        <InputReview
          label=""
          placeholder="추천 이유를 적어주세요."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-y-[8px]">
        <span className="text-subtitle1">좌석 형태</span>
        <FilterSection
          label=""
          isMultiple={true}
          options={Object.values(SEAT_TYPE_MAP)}
          selectedItems={seatTypes.map((type) => SEAT_TYPE_MAP[type])}
          onChange={handleSeatTypesChange}
        />
      </div>
    </div>
  );
};
