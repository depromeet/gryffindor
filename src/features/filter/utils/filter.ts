import type { FilterData } from "@/features/filter/model/types";

export function areFiltersEqual(oldFilter: FilterData, newFilter: FilterData): boolean {
  return (
    oldFilter.price.min === newFilter.price.min &&
    oldFilter.price.max === newFilter.price.max &&
    oldFilter.honbobLevel === newFilter.honbobLevel &&
    oldFilter.seatTypes.length === newFilter.seatTypes.length &&
    oldFilter.seatTypes.every((v, i) => v === newFilter.seatTypes[i]) &&
    oldFilter.categories.length === newFilter.categories.length &&
    oldFilter.categories.every((v, i) => v === newFilter.categories[i])
  );
}
