"use client";

import {
  RecentSearchHeader,
  RecentSearchList,
  SEARCH_BAR_HEIGHT,
  SearchBar,
  useSearchHistoryAdapter,
} from "@/features/search";
import { TransitionLayout } from "@/shared/ui";

export default function SearchPage() {
  const { searchHistory, isLoading, removeHistory, clearHistory } = useSearchHistoryAdapter();

  return (
    <TransitionLayout>
      <SearchBar />
      <div
        className="flex flex-col gap-3"
        style={{ paddingTop: `calc(${SEARCH_BAR_HEIGHT}px + 17px)` }}
      >
        <RecentSearchHeader searchHistory={searchHistory} onDelete={clearHistory} />
        <RecentSearchList
          searchHistory={searchHistory}
          isLoading={isLoading}
          onRemove={removeHistory}
        />
      </div>
    </TransitionLayout>
  );
}
