import { create } from "zustand";

interface MapState {
  selectedStoreId: number | null;
  selectStore: (id: number) => void;
  clearStore: () => void;
}

export const useMapStore = create<MapState>((set) => ({
  selectedStoreId: null,
  selectStore: (id) => set({ selectedStoreId: id }),
  clearStore: () => set({ selectedStoreId: null }),
}));
