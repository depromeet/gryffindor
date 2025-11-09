import { RECOMMEND_LIST } from "@/features/search";
import { Icon } from "@/shared/ui";

export function InputShapeCard() {
  return (
    <div className="flex items-center gap-x-[8px] p-[12px] border border-gray200 rounded-[12px] bg-white">
      <Icon name="search" size={24} />
      <p className="text-body2-medium text-gray400">{RECOMMEND_LIST.title}</p>
    </div>
  );
}
