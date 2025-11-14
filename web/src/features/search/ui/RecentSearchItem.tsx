"use client";

import { formatToMonthDay, type SearchHistoryResponse } from "@/features/search";
import { Icon } from "@/shared/ui";

interface RecentSearchItemProps {
  search: SearchHistoryResponse;
  onRemove: (id: number) => void;
}

export function RecentSearchItem({ search, onRemove }: RecentSearchItemProps) {
  const formattedDate = formatToMonthDay(search.updateAt);

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();

    onRemove(search.id);
  };

  return (
    <div className="flex items-center w-full py-3 px-5">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <Icon name="clock" size={24} color="gray500" className="shrink-0" />
        <span className="text-body1-regular text-gray800 truncate">{search.query}</span>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-body2-regular text-gray600">{formattedDate}</span>
        <button
          type="button"
          onClick={handleRemove}
          className="flex items-center justify-center"
          aria-label="검색어 삭제"
        >
          <Icon name="close" size={20} color="gray600" />
        </button>
      </div>
    </div>
  );
}
