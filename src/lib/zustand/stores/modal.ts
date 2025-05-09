import { create } from "zustand";

interface ModalStore {
  isAddBobaModalOpen: boolean;
  isAddShopModalOpen: boolean;
  isAiModalOpen: boolean;
  setIsAddBobaModalOpen: (isOpen: boolean) => void;
  setIsAddShopModalOpen: (isOpen: boolean) => void;
  setIsAiModalOpen: (isOpen: boolean) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isAddBobaModalOpen: false,
  isAddShopModalOpen: false,
  isAiModalOpen: false,
  setIsAddBobaModalOpen: (isOpen) => set({ isAddBobaModalOpen: isOpen }),
  setIsAddShopModalOpen: (isOpen) => set({ isAddShopModalOpen: isOpen }),
  setIsAiModalOpen: (isOpen) => set({ isAiModalOpen: isOpen }),
}));
