"use client";

import type { Dispatch, SetStateAction } from "react";
import { ALL_CATEGORIES, SEAT_TYPE_MAP } from "@/entities/store/model/constants";
import type { SeatTypes } from "@/entities/storeList/api";
import { Button, FilterSection, Input, InputReview } from "@/shared/ui";

interface ReportFormProps {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  recommendedMenu: string;
  setRecommendedMenu: Dispatch<SetStateAction<string>>;
  reason: string;
  setReason: Dispatch<SetStateAction<string>>;
  seatTypes: SeatTypes[];
  setSeatTypes: Dispatch<SetStateAction<SeatTypes[]>>;
  handleSubmit: () => void;
}

export const ReportForm = ({
  location,
  setLocation,
  name,
  setName,
  category,
  setCategory,
  recommendedMenu,
  setRecommendedMenu,
  reason,
  setReason,
  seatTypes,
  setSeatTypes,
  handleSubmit,
}: ReportFormProps) => {
  const handleSeatTypesChange = (selectedLabels: string[]) => {
    const newSeatTypes = selectedLabels.map(
      (label) => Object.entries(SEAT_TYPE_MAP).find(([, v]) => v === label)?.[0] as SeatTypes,
    );
    setSeatTypes(newSeatTypes);
  };

  const handleCategoryChange = (selectedLabels: string[]) => {
    setCategory(selectedLabels[0] || "");
  };

  return (
    <div className="flex min-h-screen flex-col gap-y-[36px] bg-white pt-[20px] pb-[40px]">
      <div className="flex flex-col gap-y-[8px] px-[20px]">
        <span className="text-subtitle1">가게 위치</span>
        <Input
          label=""
          placeholder="어느 지역에 있나요? ex) 강남역"
          value={location}
          onChange={setLocation}
        />
      </div>
      <div className="flex flex-col gap-y-[8px] px-[20px]">
        <span className="text-subtitle1">가게 정보</span>
        <Input label="" placeholder="가게 이름이 무엇인가요?" value={name} onChange={setName} />
      </div>
      <div className="flex flex-col gap-y-[8px] px-[20px]">
        <span className="text-subtitle1">추천 메뉴</span>
        <Input
          label=""
          placeholder="추천 메뉴를 적어주세요."
          value={recommendedMenu}
          onChange={setRecommendedMenu}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-subtitle1 ml-[20px]">메뉴 카테고리</span>
        <FilterSection
          label=""
          isMultiple={false}
          options={ALL_CATEGORIES as unknown as string[]}
          selectedItems={[category]}
          onChange={handleCategoryChange}
        />
      </div>
      <div className="flex flex-col gap-y-[8px] px-[20px]">
        <span className="text-subtitle1">식당 추천 이유</span>
        <InputReview
          label=""
          placeholder="추천 이유를 적어주세요."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </div>
      <div className="flex flex-col w-full">
        <span className="text-subtitle1 ml-[20px]">좌석 형태</span>
        <FilterSection
          label=""
          isMultiple={true}
          options={Object.values(SEAT_TYPE_MAP)}
          selectedItems={seatTypes.map((type) => SEAT_TYPE_MAP[type])}
          onChange={handleSeatTypesChange}
        />
      </div>
      <div className="flex w-full justify-center">
        <Button
          label="제보하기"
          size="large"
          onClick={handleSubmit}
          disabled={
            !location ||
            !name ||
            !recommendedMenu ||
            !category ||
            reason.length < 5 ||
            seatTypes.length === 0
          }
        />
      </div>
    </div>
  );
};
