import Image from "next/image";
import { Tag } from "@/shared/ui";
import type { StoreListResponse } from "../api";
import { SEAT_TYPES_MAP } from "./StoreCard";

export interface SelectedStoreCardProps extends Omit<StoreListResponse, "id" | "coordinate"> {}

export function SelectedStoreCard({
  name,
  thumbnailUrl,
  signatureMenu,
  distance,
  walkingMinutes,
  seats,
  honbobLevel,
}: SelectedStoreCardProps) {
  return (
    <article
      className={`flex w-[335px] justify-between gap-4 rounded-xl bg-gray0 px-4 py-3 shadow-[-4px_0_20px_0_rgba(0,0,0,0.08)]`}
    >
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-col gap-y-1">
          <Tag label={`레벨 ${honbobLevel}`} color="red" size="small" iconName="crown" />
          <h3 className="text-body1-semibold text-gray900">{name}</h3>
          <div className="flex items-center gap-x-1 text-body3-regular text-gray900">
            <span>대표메뉴</span>
            <span>·</span>
            <span className="flex-1 truncate">{signatureMenu.name}</span>
          </div>
          {/* NOTE: 일단 피그마에 기재된 색상(#575757) 사용 */}
          <div className="flex items-center gap-x-1 text-[#575757] text-body3-regular">
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
      <div className="relative h-[96px] w-[96px] flex-shrink-0">
        <Image
          src={thumbnailUrl}
          alt={`${name}-thumbnail`}
          fill
          sizes="96px"
          className="rounded-xl object-cover"
        />
      </div>
    </article>
  );
}
