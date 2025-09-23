import Image from "next/image";
import type { SeatImage } from "@/entities/store/model/types";
import { Tag } from "@/shared/ui";

interface SeatImageGalleryProps {
  storeName: string;
  level: number;
  userName: string;
  images: SeatImage[];
}

export function SeatImageGallery({ images, storeName, level, userName }: SeatImageGalleryProps) {
  const seatTypeMap = {
    CUBICLE: "칸막이",
    BAR_TABLE: "바 좌석",
    FOR_ONE: "1인석",
    FOR_TWO: "2인석",
    FOR_FOUR: "4인석",
  } as const;

  const seatLabels = images
    .map((img) => seatTypeMap[img.seatType as keyof typeof seatTypeMap])
    .filter(Boolean);
  return (
    <article className="mt-8 flex w-full flex-col gap-3 px-5">
      <section className="flex w-full flex-col gap-3">
        <span className="text-[#000] text-subtitle1">좌석 이미지</span>
        <div className="scrollbar-hide -mx-5 flex items-center gap-3 overflow-x-auto px-5">
          {images.length > 0 &&
            images.map((img) => (
              <div
                key={img.seatType}
                className="relative h-[180px] w-[180px] shrink-0 overflow-hidden rounded-[16px]"
              >
                {img.imageUrl ? (
                  <Image
                    src={img.imageUrl}
                    alt={img.seatType}
                    width={180}
                    height={180}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200" />
                )}
                <span className="absolute top-3 left-3">
                  <Tag
                    label={seatTypeMap[img.seatType as keyof typeof seatTypeMap]}
                    color="outline"
                    size="small"
                  />
                </span>
              </div>
            ))}
        </div>
      </section>
      <section className="flex w-full flex-col justify-center gap-1 rounded-[12px] border-[1.2px] border-[rgb(20,20,20,0.2)] bg-gray50 p-4">
        <span className="text-body2-semibold text-primary500">좌석 사진</span>
        <span className="text-[rgba(20,20,20,0.8)] text-body2-regular">
          {storeName}은 {seatLabels.join(", ")}이 있어서 혼밥 레벨 {level || 1}
          에게 안성맞춤이에요! {userName || "밥잇"}님, 오늘은 {seatLabels[0]}
          에서 맛있는 혼밥 어떠세요?
        </span>
      </section>
    </article>
  );
}
