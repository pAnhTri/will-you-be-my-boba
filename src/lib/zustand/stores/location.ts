import { create } from "zustand";

interface LocationStore {
  isLocationEnabled: boolean;
  storeLocationMap: Map<string, number>;
  setIsLocationEnabled: (isLocationEnabled: boolean) => void;
  setStoreLocationMap: (storeLocationMap: Map<string, number>) => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  isLocationEnabled: false,
  storeLocationMap: new Map(),
  setIsLocationEnabled: (isLocationEnabled) => set({ isLocationEnabled }),
  setStoreLocationMap: (storeLocationMap) => set({ storeLocationMap }),
}));
