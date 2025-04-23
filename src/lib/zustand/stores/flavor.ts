import { create } from "zustand";

interface FlavorStore {
  selectedFlavors: string[];
  setSelectedFlavors: (flavors: string[]) => void;
  displayFlavors: string[];
  setDisplayFlavors: (flavors: string[]) => void;
}

export const useFlavorStore = create<FlavorStore>((set) => ({
  selectedFlavors: [],
  setSelectedFlavors: (flavors) => set({ selectedFlavors: flavors }),
  displayFlavors: [],
  setDisplayFlavors: (flavors) => set({ displayFlavors: flavors }),
}));
