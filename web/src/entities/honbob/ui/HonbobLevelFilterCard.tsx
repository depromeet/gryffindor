import Image from "next/image";
import { getHonbobLevelImageSet } from "@/shared/lib";

interface HonbobLevelFilterCardProps {
  honbobLevel: string;
  honbobLevelTitle: string;
  honbobLevelDescription: string;
  recommendedMenu: string;
  recommendedStore: string;
}

export function HonbobLevelFilterCard({
  honbobLevel,
  honbobLevelTitle,
  honbobLevelDescription,
  recommendedMenu,
  recommendedStore,
}: HonbobLevelFilterCardProps) {
  const { infoCharacterImage } = getHonbobLevelImageSet(honbobLevel);

  return (
    <div className="flex flex-col bg-gray50 rounded-[12px] p-[16px] gap-y-[16px]">
      <div className="flex items-center gap-x-[12px]">
        <Image
          src={infoCharacterImage}
          alt={`${honbobLevel}LevelImage`}
          className=" w-[48px] h-[48px] rounded-full object-contain"
        />
        <div>
          <div className="flex flex-col gap-y-[8px]">
            <div className="w-fit px-[4px]  py-1px rounded-[4px] bg-primary100 text-caption2-medium text-primary500">
              {honbobLevel}
            </div>
            <p className="text-body2-regular text-gray900">{honbobLevelTitle}</p>
          </div>
          <div className="text-body1-semibold text-gray700">{honbobLevelDescription}</div>
        </div>
      </div>
      <div className="self-stretch p-4 bg-white rounded-lg inline-flex flex-col justify-start items-start gap-3">
        <div className="flex flex-col gap-y-[4px]">
          <span className="text-body3-semibold text-gray500">추천 메뉴</span>
          <span className="text-body3-regular text-gray800">{recommendedMenu}</span>
        </div>
        <div className="flex flex-col gap-y-[4px]">
          <span className="text-body3-semibold text-gray500">추천 좌석</span>
          <span className="text-body3-regular text-gray800">{recommendedStore}</span>
        </div>
      </div>
    </div>
  );
}
