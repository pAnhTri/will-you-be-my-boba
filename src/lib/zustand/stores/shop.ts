import { Shop } from "@/types/shop";
import { create } from "zustand";

interface ShopStore {
  isShowingReviews: boolean;
  shops: Shop[];
  selectedShop: Shop | null;
  setIsShowingReviews: (isShowingReviews: boolean) => void;
  setShops: (shop: Shop[]) => void;
  setSelectedShop: (shop: Shop | null) => void;
}

export const useShopStore = create<ShopStore>((set) => ({
  isShowingReviews: false,
  shops: [],
  selectedShop: null,
  setIsShowingReviews: (isShowingReviews: boolean) => set({ isShowingReviews }),
  setShops: (shops: Shop[]) => set({ shops }),
  setSelectedShop: (shop: Shop | null) => set({ selectedShop: shop }),
}));
