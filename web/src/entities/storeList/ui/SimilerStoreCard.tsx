import Image from "next/image";
import type { SeatTypes, SimilerStoreRes } from "@/entities/storeList/api";
import { Tag } from "@/shared/ui";

export const SEAT_TYPES_MAP: Record<SeatTypes, string> = {
  FOR_ONE: "1인석",
  FOR_TWO: "2인석",
  FOR_FOUR: "4인석",
  CUBICLE: "칸막이",
  BAR_TABLE: "바 좌석",
};

export function SimilerStoreCard({
  name,
  thumbnailUrl,
  honbobLevel,
  primaryCategory,
  distanceInMeters,
  seatTypes,
}: SimilerStoreRes) {
  const parsedSeatTypes = seatTypes
    ? (JSON.parse(seatTypes) as SeatTypes[])
    : (["FOR_ONE", "FOR_TWO"] as SeatTypes[]);
  return (
    <article className="flex flex-col justify-center gap-3">
      <div className="relative h-[156px] w-[156px] flex-shrink-0">
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
          <Tag label={`레벨 ${honbobLevel}`} color="gray" size="small" iconName="crown" />
          <h3 className="text-body1-semibold text-gray900">{name}</h3>
          <div className="flex items-center gap-x-[4px] text-body3-regular text-gray700">
            <span>{primaryCategory}</span>
            <span>·</span>
            <span>{distanceInMeters}m</span>
          </div>
        </div>
        <ul className="flex flex-nowrap items-center gap-x-[5px]">
          {parsedSeatTypes?.map((seatType) => (
            <li key={seatType}>
              <Tag label={SEAT_TYPES_MAP[seatType]} color="blue" size="small" />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
