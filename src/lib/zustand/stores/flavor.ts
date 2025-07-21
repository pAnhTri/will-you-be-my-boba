import { create } from "zustand";

interface FlavorStore {
  flavors: string[];
  setFlavors: (flavors: string[]) => void;
  selectedFlavors: string[];
  setSelectedFlavors: (flavors: string[]) => void;
  displayFlavors: string[];
  setDisplayFlavors: (flavors: string[]) => void;
  isFlavorsLoading: boolean;
  setIsFlavorsLoading: (isLoading: boolean) => void;
  flavorsError: string | null;
  setFlavorsError: (error: string | null) => void;
}

export const useFlavorStore = create<FlavorStore>((set) => ({
  flavors: [],
  setFlavors: (flavors) => set({ flavors }),
  selectedFlavors: [],
  setSelectedFlavors: (flavors) => set({ selectedFlavors: flavors }),
  displayFlavors: [],
  setDisplayFlavors: (flavors) => set({ displayFlavors: flavors }),
  isFlavorsLoading: true,
  setIsFlavorsLoading: (isLoading) => set({ isFlavorsLoading: isLoading }),
  flavorsError: null,
  setFlavorsError: (error) => set({ flavorsError: error }),
}));
