import type { FilterData } from "@/features/filter/model/types";
import type { Coordinates } from "@/features/map/model/types";

export const queryKeys = {
  STORE_DETAIL: (storeId: string) => ["store", storeId],
  SIMILAR_STORES: (storeId: number) => ["store", "similar", storeId],
  USER_PROFILE: () => ["user", "profile"],
  USER_NICKNAME: () => ["user", "nickname"],
  STORE_LIST: (station: string, level: number) => ["store", "list", station, level],
  STORE_LIST_MAP: (filters: FilterData, coordinates: Coordinates) => [
    "store",
    "list",
    filters,
    coordinates,
  ],
} as const;
