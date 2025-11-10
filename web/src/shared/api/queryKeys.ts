import type { FilterData } from "@/features/filter/model/types";
import type { Coordinates } from "@/features/map/model/types";

export const queryKeys = {
  STORE_DETAIL: (storeId: string) => ["store", storeId],
  USER_PROFILE: () => ["user", "profile"],
  USER_NICKNAME: () => ["user", "nickname"],
  STORE_LIST: (station: string, level: number) => ["store", "list", station, level],
  STORE_LIST_BY_BOUNDS: (filters: FilterData, coordinates: Coordinates) => [
    "store",
    "list",
    "bounds",
    filters,
    coordinates,
  ],
} as const;
