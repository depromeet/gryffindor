import Image from "next/image";
import { Tag } from "@/shared/ui";
import type { SeatTypes, StoreSearchResponse } from "../api";

export interface StoreCardProps extends Omit<StoreSearchResponse, "id" | "coordinate"> {}

export const SEAT_TYPES_MAP: Record<SeatTypes, string> = {
  FOR_ONE: "1인석",
  FOR_TWO: "2인석",
  FOR_FOUR: "4인석",
  CUBICLE: "칸막이",
  BAR_TABLE: "바 좌석",
};

export function StoreCard({
  name,
  thumbnailUrl,
  signatureMenu,
  distance,
  walkingMinutes,
  seats,
  honbobLevel,
}: StoreCardProps) {
  return (
    <article className="flex items-center gap-4 rounded-[16px]">
      <div className="relative h-[120px] w-[120px] flex-shrink-0">
        <Image
          src={thumbnailUrl}
          alt={`${name}-thumbnail`}
          fill
          sizes="120px"
          className="rounded-[12px] object-cover"
        />
      </div>

      <div className="flex flex-col gap-y-[8px]">
        <div className="flex flex-col gap-y-[4px]">
          <Tag label={`레벨 ${honbobLevel}`} color="red" size="small" iconName="crown" />
          <h3 className="text-body1-semibold text-gray900">{name}</h3>
          <div className="flex items-center gap-x-[4px] text-body3-regular text-gray900">
            <span>대표메뉴</span>
            <span>·</span>
            <span className="flex-1 truncate">{signatureMenu.name}</span>
          </div>
          {/* NOTE: 일단 피그마에 기재된 색상(#575757) 사용 */}
          <div className="flex items-center gap-x-[4px] text-[#575757] text-body3-regular">
            <span>{distance}m</span>
            <span>·</span>
            <span>내 위치에서 약 {walkingMinutes}분</span>
          </div>
        </div>
        <ul className="flex flex-nowrap items-center gap-x-[5px]">
          {seats.map((seat) => (
            <li key={seat}>
              <Tag label={SEAT_TYPES_MAP[seat]} color="blue" size="small" />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
