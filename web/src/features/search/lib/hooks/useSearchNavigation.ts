import { useRouter } from "next/navigation";
import { useSearchHistoryAdapter } from "@/features/search";

export function useSearchNavigation() {
  const router = useRouter();
  const { addHistory } = useSearchHistoryAdapter();

  const executeSearch = (query: string) => {
    if (!query) return;

    // 검색 기록에 추가
    addHistory?.(query);

    // 지도 페이지로 이동
    router.push(`/map?query=${encodeURIComponent(query)}`);
  };

  return { executeSearch };
}
