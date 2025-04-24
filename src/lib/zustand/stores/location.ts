import { create } from "zustand";

interface LocationStore {
  isLocationEnabled: boolean;
  storeLocationMap: Map<string, number>;
  userLocation: {
    latitude: number;
    longitude: number;
  } | null;
  setIsLocationEnabled: (isLocationEnabled: boolean) => void;
  setStoreLocationMap: (storeLocationMap: Map<string, number>) => void;
  setUserLocation: (
    userLocation: {
      latitude: number;
      longitude: number;
    } | null
  ) => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  isLocationEnabled: false,
  storeLocationMap: new Map(),
  userLocation: null,
  setIsLocationEnabled: (isLocationEnabled) => set({ isLocationEnabled }),
  setStoreLocationMap: (storeLocationMap) => set({ storeLocationMap }),
  setUserLocation: (userLocation) => set({ userLocation }),
}));
