import Image from "next/image";
import { Tag } from "@/shared/ui";

const SEATING_TYPES_MAP = {
  BAR: "바",
  FOR_ONE: "1인석",
  FOR_TWO: "2인석",
} as const;

export type SeatingType = keyof typeof SEATING_TYPES_MAP;

interface StoreCardProps {
  thumbnailUrls?: string;
  level: string;
  name: string;
  distance: string;
  signatureMenu: string;
  seatingTypes: SeatingType[];
}

export function StoreCard({
  thumbnailUrls,
  level,
  name,
  signatureMenu,
  distance,
  seatingTypes,
}: StoreCardProps) {
  return (
    <div className="flex items-center gap-x-[10px] rounded-[16px] py-[16px]">
      <div className="flex items-center gap-x-[16px]">
        {thumbnailUrls && (
          <Image
            src={thumbnailUrls}
            alt={`${name}-thumbnailUrls`}
            width={120}
            height={120}
            className="h-full w-full flex-shrink-0 rounded-[16px] object-cover"
          />
        )}
        {!thumbnailUrls && (
          <div className="h-[120px] w-[120px] flex-shrink-0 rounded-[16px] bg-gray200" />
        )}
        <div className="flex flex-col gap-y-[8px]">
          <div className="flex flex-col gap-y-[4px]">
            <Tag label={`레벨 ${level}`} color="red" size="small" iconName="crown" />
            <span className="text-body1-semibold text-gray900">{name}</span>
            <div className="flex items-center gap-x-[4px] text-body3-regular text-gray600">
              <span>대표메뉴</span>
              <span>·</span>
              <span>{signatureMenu}</span>
            </div>
            <div className="flex items-center gap-x-[4px] text-body3-regular text-gray600">
              <span>{distance}</span>
              <span>·</span>
              <span>{distance}</span>
            </div>
          </div>
          <div className="flex flex-nowrap items-center gap-x-[5px]">
            {seatingTypes.map((seatingType) => (
              <Tag
                key={seatingType}
                label={SEATING_TYPES_MAP[seatingType]}
                color="blue"
                size="small"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
