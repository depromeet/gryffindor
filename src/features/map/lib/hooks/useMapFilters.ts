import { useState } from "react";
import type { FilterData } from "@/features/filter/model/types";

export const useMapFilters = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterData>({
    price: { min: 0, max: 20000 },
    honbobLevel: 2,
    seatTypes: [],
    categories: [],
  });

  const openFilter = () => setIsFilterOpen(true);
  const closeFilter = () => setIsFilterOpen(false);
  const applyFilters = (newFilters: FilterData) => setFilters(newFilters);

  return {
    isFilterOpen,
    filters,
    openFilter,
    closeFilter,
    applyFilters,
  };
};
