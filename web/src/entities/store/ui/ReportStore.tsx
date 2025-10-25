import Link from "next/link";
import { Icon } from "@/shared/ui";

export function ReportStore() {
  return (
    <div className="flex flex-col gap-[20px] bg-white p-[20px] pb-[0px]">
      <Link href="#">
        <div className="flex w-full items-center justify-between rounded-[8px] bg-[#FFE8E3] p-[10px]">
          <div className="flex items-center gap-x-[6px]">
            <Icon name="colorSpeaker" size={20} disableCurrentColor />
            <span className="text-[#464646] text-body2-medium">
              나만의 혼밥 맛집을 제보해주세요
            </span>
          </div>
          <Icon name="colorRightChevron" disableCurrentColor size={16} />
        </div>
      </Link>
    </div>
  );
}
