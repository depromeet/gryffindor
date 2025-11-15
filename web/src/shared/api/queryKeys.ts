import type { FilterData, SortBy } from "@/features/filter/model/types";
import type { Coordinates } from "@/features/map/model/types";

export const queryKeys = {
  STORE_DETAIL: (storeId: string) => ["store", storeId],
  SIMILAR_STORES: (storeId: number) => ["store", "similar", storeId],
  USER_PROFILE: () => ["user", "profile"],
  USER_NICKNAME: () => ["user", "nickname"],
  STORE_LIST: (station: string, filters: FilterData, sortBy?: SortBy) => [
    "store",
    "list",
    station,
    filters,
    sortBy,
  ],
  STORE_LIST_BY_BOUNDS: (filters: FilterData, coordinates: Coordinates) => [
    "store",
    "list",
    "bounds",
    filters,
    coordinates,
  ],
} as const;
