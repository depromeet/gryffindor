import type { SeatInfo } from "@/entities/store/model/types";
import { Icon, Tag } from "@/shared/ui";

interface SeatInfoSectionProps {
  seatInfo: SeatInfo;
}

export function SeatInfoSection({ seatInfo }: SeatInfoSectionProps) {
  const seatTypes = [
    { key: "cubicle", label: "칸막이", icon: "bulkhead" },
    { key: "barTable", label: "바 좌석", icon: "barSeat" },
    { key: "forOne", label: "1인석", icon: "forOne" },
    { key: "forTwo", label: "2인석", icon: "forTwo" },
    { key: "forFour", label: "4인석", icon: "forFour" },
  ] as const;

  return (
    <section className="mt-5 flex flex-col gap-3 px-5">
      <span className="text-[#000] text-subtitle1">좌석 정보</span>
      <div className="flex items-center justify-between rounded-[12px] border border-gray100 px-4 py-5">
        {seatTypes.map(({ key, label, icon }) => {
          return (
            <div key={key} className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-gray50">
                <Icon name={icon} size={32} />
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
