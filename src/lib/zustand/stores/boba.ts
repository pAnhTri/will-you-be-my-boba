import { Boba } from "@/types/boba";
import { create } from "zustand";

interface BobaStore {
  bobas: Boba[];
  displayBobas: Boba[];
  selectedBoba: Boba | null;
  setBobas: (bobas: Boba[]) => void;
  setDisplayBobas: (bobas: Boba[]) => void;
  setSelectedBoba: (boba: Boba | null) => void;
}

export const useBobaStore = create<BobaStore>((set) => ({
  bobas: [],
  displayBobas: [],
  selectedBoba: null,
  setBobas: (bobas: Boba[]) => set({ bobas }),
  setDisplayBobas: (bobas: Boba[]) => set({ displayBobas: bobas }),
  setSelectedBoba: (boba: Boba | null) => set({ selectedBoba: boba }),
}));
