import Image, { type StaticImageData } from "next/image";
import { Tag } from "@/shared/ui";

interface HonbobLevelCardProps {
  honbobLevel: string;
  honbobLevelTitle: string;
  honbobLevelDescription: string;
  honbobLevelIcon: StaticImageData;
  recommendedMenu: string;
  recommendedStore: string;
}

export function HonbobLevelCard({
  honbobLevel,
  honbobLevelTitle,
  honbobLevelDescription,
  honbobLevelIcon,
  recommendedMenu,
  recommendedStore,
}: HonbobLevelCardProps) {
  return (
    <div className="flex items-center justify-between gap-x-[10px] rounded-[16px] bg-gray0 px-[20px] py-[16px]">
      <div className="flex flex-col gap-y-[4px]">
        <div className="flex items-center gap-x-[8px]">
          <Tag label={honbobLevel} color="red" size="small" />
          <span className="justify-start text-body1-semibold text-gray900">{honbobLevelTitle}</span>
        </div>
        <span className="justify-start text-body3-semibold text-primary400">
          {honbobLevelDescription}
        </span>
        <div className="flex flex-col gap-y-[2px]">
          <div className="flex gap-x-[4px] text-body3-regular text-gray900">
            <span>추천 메뉴</span>
            <span>:</span>
            <span>{recommendedMenu}</span>
          </div>
          <div className="flex gap-x-[4px] text-body3-regular text-gray900">
            <span>추천 식당</span>
            <span>:</span>
            <span>{recommendedStore}</span>
          </div>
        </div>
      </div>
      <Image
        src={honbobLevelIcon}
        alt="honbobLevelIcon"
        width={70}
        height={70}
        className="rounded-full"
      />
    </div>
  );
}
