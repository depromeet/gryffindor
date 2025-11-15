"use client";

import type { SearchHistoryResponse } from "@/features/search";
import { RecentSearchItem } from "./RecentSearchItem";

interface RecentSearchListProps {
  searchHistory: SearchHistoryResponse[];
  isLoading?: boolean;
  onSearch: (query: string) => void;
  onRemove: (id: number) => void;
}

export function RecentSearchList({
  searchHistory,
  isLoading,
  onSearch,
  onRemove,
}: RecentSearchListProps) {
  if (isLoading) {
    return <div className="px-5 py-4 text-center text-body2-regular text-gray600">로딩 중...</div>;
  }

  if (searchHistory.length === 0) {
    return (
      <div className="px-5 py-3 text-body1-regular text-gray800">최근 검색 내역이 없습니다</div>
    );
  }

  return (
    <ul className="flex flex-col">
      {searchHistory.map((search) => (
        <li key={search.id}>
          <RecentSearchItem search={search} onSearch={onSearch} onRemove={onRemove} />
        </li>
      ))}
    </ul>
  );
}
