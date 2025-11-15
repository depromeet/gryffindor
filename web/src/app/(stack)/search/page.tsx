"use client";

import {
  RecentSearchHeader,
  RecentSearchList,
  SEARCH_BAR_HEIGHT,
  SearchBar,
  useSearchHistoryAdapter,
  useSearchNavigation,
} from "@/features/search";
import { TransitionLayout } from "@/shared/ui";

export default function SearchPage() {
  const { searchHistory, isLoading, removeHistory, clearHistory } = useSearchHistoryAdapter();
  const { executeSearch } = useSearchNavigation();

  const hasSearchHistory = searchHistory.length > 0;

  return (
    <TransitionLayout>
      <SearchBar onSubmit={executeSearch} />
      <div
        className="flex flex-col gap-3"
        style={{ paddingTop: `calc(${SEARCH_BAR_HEIGHT}px + env(safe-area-inset-top) + 16px)` }}
      >
        <RecentSearchHeader hasSearchHistory={hasSearchHistory} onDelete={clearHistory} />
        <RecentSearchList
          searchHistory={searchHistory}
          isLoading={isLoading}
          onSearch={executeSearch}
          onRemove={removeHistory}
        />
      </div>
    </TransitionLayout>
  );
}
