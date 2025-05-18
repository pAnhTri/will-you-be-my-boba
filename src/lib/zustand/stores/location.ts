import { create } from "zustand";

interface LocationStore {
  isLocationEnabled: boolean;
  maxDistance: number;
  storeLocationMap: Map<string, number>;
  userLocation: {
    latitude: number;
    longitude: number;
  } | null;
  setIsLocationEnabled: (isLocationEnabled: boolean) => void;
  setMaxDistance: (maxDistance: number) => void;
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
  maxDistance: 100,
  storeLocationMap: new Map(),
  userLocation: null,
  setIsLocationEnabled: (isLocationEnabled) => set({ isLocationEnabled }),
  setMaxDistance: (maxDistance) => set({ maxDistance }),
  setStoreLocationMap: (storeLocationMap) => set({ storeLocationMap }),
  setUserLocation: (userLocation) => set({ userLocation }),
}));
