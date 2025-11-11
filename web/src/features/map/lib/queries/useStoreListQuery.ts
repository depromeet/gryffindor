import { useInfiniteQuery } from "@tanstack/react-query";
import { storeListApi } from "@/entities/storeList/api";
import type { FilterData } from "@/features/filter/model/types";
import { queryKeys } from "@/shared/api";

interface UseStoreListQueryParams {
  filters: FilterData;
  center: { lat: number; lon: number };
  bounds?: {
    nw: { lat: number; lon: number };
    se: { lat: number; lon: number };
  };
  limit?: number;
  station?: string;
}

export function useStoreListQuery({
  filters,
  center,
  bounds,
  limit = 30,
  station,
}: UseStoreListQueryParams) {
  const hasGeoBounds = !!bounds;

  const generateQueryKey = () => {
    if (hasGeoBounds && bounds) {
      return queryKeys.STORE_LIST_BY_BOUNDS(filters, { bounds, center });
    }
    return queryKeys.STORE_LIST(station || "default", filters);
  };

  const { data, ...query } = useInfiniteQuery({
    queryKey: generateQueryKey(),
    queryFn: ({ pageParam }: { pageParam: string | null }) =>
      storeListApi.getStoreByPost({
        requestBody: {
          ...(hasGeoBounds && bounds ? { bbox: bounds } : {}),
          center,
          filters: {
            ...(filters.price && { price: filters.price }),
            ...(filters.honbobLevels.length > 0 && { honbobLevels: filters.honbobLevels }),
            ...(filters.seatTypes.length > 0 && { seatTypes: filters.seatTypes }),
            ...(filters.categories.length > 0 && { categories: filters.categories }),
          },
          paging: { limit, lastKnown: pageParam ?? undefined },
        },
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.response.hasNext ? lastPage.response.nextCursor : undefined,
  });

  const storeList = data?.pages.flatMap((page) => page.response.data) || [];

  return { storeList, ...query };
}
