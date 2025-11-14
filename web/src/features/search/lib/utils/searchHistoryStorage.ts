import type { SearchHistoryResponse } from "@/features/search";

const STORAGE_KEY = "searchHistory";
const MAX_HISTORY = 10;

export const searchHistoryStorage = {
  get(): SearchHistoryResponse[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },
  add(query: string): void {
    const history = this.get();

    // 중복 제거 (같은 검색어가 이미 있으면 제거)
    const filtered = history.filter((item) => item.query !== query);

    // 최신 검색어를 맨 앞에 추가
    const newHistory: SearchHistoryResponse[] = [
      {
        id: Date.now(),
        query,
        updateAt: new Date().toISOString(),
      },
      ...filtered,
    ].slice(0, MAX_HISTORY);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  },
  remove(id: number): void {
    const history = this.get();
    const filtered = history.filter((item) => item.id !== id);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },
  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  },
};
