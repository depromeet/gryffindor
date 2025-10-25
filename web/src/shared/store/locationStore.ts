import { create } from "zustand";

interface LocationState {
  selectedStation: string;
  setSelectedStation: (station: string) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  selectedStation: "강남역",
  setSelectedStation: (station) => set({ selectedStation: station }),
}));
