import { useInfiniteQuery } from "@tanstack/react-query";
import { storeListApi } from "@/entities/storeList/api";
import type { FilterData } from "@/features/filter/model/types";
import { queryKeys } from "@/shared/api";

export function useStoreListQuery(filters: FilterData) {
  const { data, ...query } = useInfiniteQuery({
    queryKey: queryKeys.STORE_LIST_MAP(filters),
    queryFn: ({ pageParam }: { pageParam: string | null }) =>
      storeListApi.getStoreByPost({
        requestBody: {
          // 임시로 강남역 인근으로 위치 설정
          bbox: {
            nw: { lat: 37.514, lon: 127.016 },
            se: { lat: 37.478, lon: 127.042 },
          },
          center: { lat: 37.497981, lon: 127.027619 },
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
