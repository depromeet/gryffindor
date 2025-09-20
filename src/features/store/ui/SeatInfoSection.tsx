import type { SeatInfo } from "@/entities/store/model/types";
import { Tag } from "@/shared/ui";

interface SeatInfoSectionProps {
  seatInfo: SeatInfo;
}

export function SeatInfoSection({ seatInfo }: SeatInfoSectionProps) {
  const seats = [
    { key: "cubicle", label: "칸막이", icon: "location" },
    { key: "barTable", label: "바 좌석", icon: "location" },
    { key: "forOne", label: "1인석", icon: "location" },
    { key: "forTwo", label: "2인석", icon: "location" },
    { key: "forFour", label: "4인석", icon: "location" },
  ] as const;

  return (
    <section className="mt-8 flex flex-col gap-3 px-5">
      <span className="text-[#000] text-subtitle1">좌석 정보</span>
      <div className="flex items-center justify-between rounded-[12px] border border-gray100 px-4 py-5">
        {seats.map(({ key, label, icon }) => {
          return (
            <div key={key} className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-gray50">
                {/* 임시 아이콘 */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <title>{icon}</title>
                  <circle cx="15.9998" cy="16.0003" r="13.3333" fill="#D9D9D9" />
                </svg>
                {/* <Icon name={icon} size={32} /> */}
              </div>
              <div className="flex flex-col items-center gap-[6px]">
                <span className="text-[#000] text-caption1-medium">{label}</span>
                <Tag
                  label={seatInfo[key] ? "있음" : "없음"}
                  color={seatInfo[key] ? "red" : "gray"}
                  size="small"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
