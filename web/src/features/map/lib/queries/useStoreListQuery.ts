import { useInfiniteQuery } from "@tanstack/react-query";
import { storeListApi } from "@/entities/storeList/api";
import type { FilterData } from "@/features/filter/model/types";
import { queryKeys } from "@/shared/api";
import type { Coordinates } from "../../model";

export function useStoreListQuery(filters: FilterData, coordinates: Coordinates) {
  const { data, ...query } = useInfiniteQuery({
    queryKey: queryKeys.STORE_LIST_BY_BOUNDS(filters, coordinates),
    queryFn: ({ pageParam }: { pageParam: string | null }) =>
      storeListApi.getStoreByPost({
        requestBody: {
          bbox: coordinates.bounds,
          center: coordinates.center,
          filters: {
            price: filters.price,
            honbobLevel: filters.honbobLevel,
            seatTypes: filters.seatTypes,
            categories: filters.categories,
          },
          paging: { limit: 30, lastKnown: pageParam ?? undefined },
        },
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.response.hasNext ? lastPage.response.nextCursor : undefined,
  });

  const storeList = data?.pages.flatMap((page) => page.response.data) || [];

  return { storeList, ...query };
}
