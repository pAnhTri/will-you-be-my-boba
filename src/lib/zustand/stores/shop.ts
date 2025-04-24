import { Shop } from "@/types/shop";
import { create } from "zustand";

interface ShopStore {
  shops: Shop[];
  setShops: (shop: Shop[]) => void;
}

export const useShopStore = create<ShopStore>((set) => ({
  shops: [],
  setShops: (shops: Shop[]) => set({ shops }),
}));
