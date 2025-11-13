import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { FilterData } from "@/features/filter/model/types";

interface FilterState {
  isFilterOpen: boolean;
  filters: FilterData;
  hasInitialized: boolean;
  openFilter: () => void;
  closeFilter: () => void;
  setFilters: (filters: FilterData) => void;
  resetFilters: () => void;
  initializeFilters: (userHonbobLevel: number) => void;
}

//todo:partialize native환경에서 확인 필요

const createDefaultFilters = (userHonbobLevel: number): FilterData => ({
  price: { min: 0, max: 20000 },
  honbobLevel: [userHonbobLevel],
  seatTypes: [],
  categories: [],
  sortBy: "RECOMMENDED",
});

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      isFilterOpen: false,
      filters: createDefaultFilters(1),
      hasInitialized: false,

      openFilter: () => set({ isFilterOpen: true }),

      closeFilter: () => set({ isFilterOpen: false }),

      setFilters: (filters) => set({ filters }),

      resetFilters: () =>
        set((state) => ({
          filters: createDefaultFilters(state.filters.honbobLevel[0] || 1),
        })),

      initializeFilters: (userHonbobLevel) =>
        set({
          filters: createDefaultFilters(userHonbobLevel),
          hasInitialized: true,
        }),
    }),
    {
      name: "filter-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        filters: state.filters,
        hasInitialized: state.hasInitialized,
      }),
    },
  ),
);
