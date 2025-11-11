"use client";

import { useFilterStore } from "@/shared/store";

export const useMapFilters = () => {
  const { isFilterOpen, filters, openFilter, closeFilter, setFilters } = useFilterStore();

  const applyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return {
    isFilterOpen,
    filters,
    openFilter,
    closeFilter,
    applyFilters,
  };
};
