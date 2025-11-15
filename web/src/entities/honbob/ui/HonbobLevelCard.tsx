import Image from "next/image";
import { getHonbobLevelImageSet } from "@/shared/lib";
import { Tag } from "@/shared/ui";

interface HonbobLevelCardProps {
  honbobLevel: string;
  honbobLevelTitle: string;
  honbobLevelDescription: string;
  recommendedMenu: string;
  recommendedStore: string;
  characteristics: string;
}

export function HonbobLevelCard({
  honbobLevel,
  honbobLevelTitle,
  honbobLevelDescription,
  recommendedMenu,
  recommendedStore,
  characteristics,
}: HonbobLevelCardProps) {
  const { infoCharacterImage } = getHonbobLevelImageSet(honbobLevel);

  return (
    <div className="flex flex-col">
      <div
        className="
    h-[128px] py-[18px]
    flex justify-center items-center
    rounded-t-[16px]
    bg-[linear-gradient(217deg,#FF4B22_9.14%,#FF9D9D_125.37%)]
  "
      >
        <Image
          src={infoCharacterImage}
          alt={`${honbobLevel}LevelImage`}
          className="h-full object-contain"
        />
      </div>
      <div className="rounded-b-2xl w-full p-[24px] bg-white inline-flex flex-col justify-start items-start gap-y-[20px] ">
        <div className="flex flex-col  gap-x-[8px]">
          <Tag label={honbobLevel} color="red" size="medium" iconName="crown" />
          <div className="flex flex-col gap-y-[4px]">
            <p className="text-title1 text-gray900">{honbobLevelTitle}</p>
            <p className="text-body1-semibold text-primary400">{honbobLevelDescription}</p>
          </div>
        </div>
        <hr className="w-full border-gray50 border-b" />
        <div className="flex flex-col gap-y-[16px]">
          <div className="flex flex-col gap-y-[4px]">
            <span className="text-body2-semibold text-gray900">레벨 특징</span>
            <span className="text-body2-regular text-gray700">{characteristics}</span>
          </div>
          <div className="flex flex-col gap-y-[4px]">
            <span className="text-body2-semibold text-gray900">추천 메뉴</span>
            <span className="text-body2-regular text-gray700">{recommendedMenu}</span>
          </div>
          <div className="flex flex-col gap-y-[4px]">
            <span className="text-body2-semibold text-gray900">추천 좌석</span>
            <span className="text-body2-regular text-gray700">{recommendedStore}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
