import { create } from "zustand";

interface ModalStore {
  isAddBobaModalOpen: boolean;
  setIsAddBobaModalOpen: (isOpen: boolean) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isAddBobaModalOpen: false,
  setIsAddBobaModalOpen: (isOpen) => set({ isAddBobaModalOpen: isOpen }),
}));
