import type { FilterData } from "@/features/filter/model/types";

export function areFiltersEqual(a: FilterData, b: FilterData): boolean {
  return (
    a.price.min === b.price.min &&
    a.price.max === b.price.max &&
    a.level === b.level &&
    a.seatTypes.length === b.seatTypes.length &&
    a.seatTypes.every((v, i) => v === b.seatTypes[i]) &&
    a.categories.length === b.categories.length &&
    a.categories.every((v, i) => v === b.categories[i])
  );
}
