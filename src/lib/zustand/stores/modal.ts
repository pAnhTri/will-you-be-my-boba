import { create } from "zustand";

interface ModalStore {
  isAddBobaModalOpen: boolean;
  isAddShopModalOpen: boolean;
  setIsAddBobaModalOpen: (isOpen: boolean) => void;
  setIsAddShopModalOpen: (isOpen: boolean) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isAddBobaModalOpen: false,
  isAddShopModalOpen: false,
  setIsAddBobaModalOpen: (isOpen) => set({ isAddBobaModalOpen: isOpen }),
  setIsAddShopModalOpen: (isOpen) => set({ isAddShopModalOpen: isOpen }),
}));
