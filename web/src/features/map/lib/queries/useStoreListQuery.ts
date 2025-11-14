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
  enabled?: boolean;
}

export function useStoreListQuery({
  filters,
  center,
  bounds,
  limit = 30,
  station,
  enabled,
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
            price: filters.price,
            honbobLevel: filters.honbobLevel,
            seatTypes: filters.seatTypes,
            categories: filters.categories,
            sortBy: filters.sortBy,
          },
          paging: { limit, lastKnown: pageParam ?? undefined },
        },
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.response.hasNext ? lastPage.response.nextCursor : undefined,
    enabled,
  });

  const storeList = data?.pages.flatMap((page) => page.response.data) || [];

  return { storeList, ...query };
}
