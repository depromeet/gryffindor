"use client";

import {
  RecentSearchHeader,
  RecentSearchItem,
  SEARCH_BAR_HEIGHT,
  SearchBar,
} from "@/features/search";
import { TransitionLayout } from "@/shared/ui";

const SEARCH_LIST_MOCK_DATA = [
  {
    id: "1",
    query: "햄버거",
    updateAt: "2025-11-13T14:51:06.812Z",
  },
  {
    id: "2",
    query: "피자",
    updateAt: "2025-11-13T14:51:06.812Z",
  },
];

export default function SearchPage() {
  return (
    <TransitionLayout>
      <SearchBar />
      <div
        className="flex flex-col gap-3"
        style={{ paddingTop: `calc(${SEARCH_BAR_HEIGHT}px + 17px)` }}
      >
        <RecentSearchHeader onDeleteAll={() => {}} />
        <ul className="flex flex-col">
          {SEARCH_LIST_MOCK_DATA.map((search) => (
            <li key={search.id}>
              <RecentSearchItem search={search} onRemove={() => {}} />
            </li>
          ))}
        </ul>
      </div>
    </TransitionLayout>
  );
}
