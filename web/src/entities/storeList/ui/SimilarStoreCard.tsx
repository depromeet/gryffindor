import { useRouter } from "next/navigation";
import type { SeatTypes, SimilarStoreRes } from "@/entities/storeList/api";
import { formatDistance, GA4_RECOMMENDED_EVENTS, useGAClick } from "@/shared/lib";
import { DynamicColorLevelTag, ImageWithFallback, Tag } from "@/shared/ui";

export const SEAT_TYPES_MAP: Record<SeatTypes, string> = {
  FOR_ONE: "1인석",
  FOR_TWO: "2인석",
  FOR_FOUR: "4인석",
  CUBICLE: "칸막이",
  BAR_TABLE: "바 좌석",
};

export function SimilarStoreCard({
  id,
  name,
  thumbnailUrl,
  honbobLevel,
  primaryCategory,
  distanceInMeters,
  seatTypes,
}: SimilarStoreRes) {
  const router = useRouter();
  const parsedSeatTypes = Array.isArray(seatTypes)
    ? seatTypes
    : typeof seatTypes === "string"
      ? (seatTypes.split(",") as SeatTypes[])
      : (["FOR_ONE", "FOR_TWO"] as SeatTypes[]);

  const formattedDistance = formatDistance(distanceInMeters);

  const trackSimilarStoreClick = useGAClick(GA4_RECOMMENDED_EVENTS.SELECT_CONTENT, {
    select_content_type: "click_move_to_similar_store",
    store_id: id,
    store_name: name,
    store_level: honbobLevel,
    store_primary_category: primaryCategory,
    store_distance_in_meters: distanceInMeters,
    store_seat_types: parsedSeatTypes.join(","),
  });

  return (
    <button
      type="button"
      className="flex flex-col gap-3"
      onClick={() => {
        trackSimilarStoreClick();
        router.push(`/store/${id}`);
      }}
    >
      <div className="relative h-[156px] w-[156px] flex-shrink-0 bg-gray-100 rounded-[12px]">
        <ImageWithFallback
          src={thumbnailUrl}
          alt={`${name}-thumbnail`}
          fill
          sizes="156px"
          fallbackIconSize={80}
          className="rounded-[12px] object-cover"
        />
      </div>

      <div className="flex flex-col gap-y-[8px]">
        <div className="flex flex-col gap-y-[4px]">
          <DynamicColorLevelTag level={honbobLevel} size="small" />
          <span className="text-body1-semibold text-gray900 text-start">{name}</span>
          <div className="flex items-center gap-x-[4px] text-body3-regular text-gray700">
            <span>{primaryCategory}</span>
            <span>·</span>
            <span>{formattedDistance}</span>
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
    </button>
  );
}
