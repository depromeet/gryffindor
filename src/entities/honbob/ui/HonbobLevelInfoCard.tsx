import { SAMPLE_LEVEL_INFO } from "@/entities/honbob";

export function HonbobLevelInfoCard() {
  const userLevel = 2;
  const honbobLevelInfo = SAMPLE_LEVEL_INFO[userLevel];

  const { level, description, recommendedMenu, recommendedStore } = honbobLevelInfo;

  return (
    <div className="mx-[24px] flex flex-col gap-y-[16px] rounded-[16px] border border-gray100 p-[20px]">
      <div className="flex flex-col gap-y-[4px]">
        <span className="text-primary400 text-subtitle1">{level}</span>
        <span className="text-body2-medium text-gray700">{description}</span>
      </div>
      <hr className="w-full border-gray100 border-b" />
      <div className="flex flex-col gap-y-[12px]">
        <div className="flex flex-col gap-y-[2px]">
          <span className="text-body3-semibold text-gray600">추천 메뉴</span>
          <span className="text-body3-regular text-gray900">{recommendedMenu}</span>
        </div>
        <div className="flex flex-col gap-y-[2px]">
          <span className="text-body3-semibold text-gray600">추천 식당</span>
          <span className="text-body3-regular text-gray900">{recommendedStore}</span>
        </div>
      </div>
    </div>
  );
}
