import { Boba } from "@/types/boba";
import { create } from "zustand";

interface BobaStore {
  initialBobas: Boba[];
  bobas: Boba[];
  setBobas: (bobas: Boba[]) => void;
}

export const useBobaStore = create<BobaStore>((set) => ({
  initialBobas: [],
  bobas: [],
  setBobas: (bobas: Boba[]) => set({ bobas }),
}));
