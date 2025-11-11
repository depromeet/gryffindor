import { create } from "zustand";
import type { FilterData } from "@/features/filter/model/types";

interface FilterState {
  isFilterOpen: boolean;
  filters: FilterData;
  openFilter: () => void;
  closeFilter: () => void;
  setFilters: (filters: FilterData) => void;
  resetFilters: () => void;
  initializeFilters: (userHonbobLevel: number) => void;
}

const createDefaultFilters = (userHonbobLevel: number): FilterData => ({
  price: { min: 0, max: 20000 },
  honbobLevels: [userHonbobLevel],
  seatTypes: [],
  categories: [],
});

export const useFilterStore = create<FilterState>((set) => ({
  isFilterOpen: false,
  filters: createDefaultFilters(1),

  openFilter: () => set({ isFilterOpen: true }),

  closeFilter: () => set({ isFilterOpen: false }),

  setFilters: (filters) => set({ filters }),

  resetFilters: () => set((state) => ({
    filters: createDefaultFilters(state.filters.honbobLevels[0] || 1),
  })),

  initializeFilters: (userHonbobLevel) => set({
    filters: createDefaultFilters(userHonbobLevel),
  }),
}));
