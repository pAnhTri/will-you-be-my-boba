import { SearchResult, Shop } from "@/types";
import { create } from "zustand";

interface ShopStore {
  isShowingReviews: boolean;
  shops: Shop[];
  selectedShop: Shop | null;
  selectedResult: SearchResult | null;
  setIsShowingReviews: (isShowingReviews: boolean) => void;
  setShops: (shop: Shop[]) => void;
  setSelectedShop: (shop: Shop | null) => void;
  setSelectedResult: (result: SearchResult | null) => void;
}

export const useShopStore = create<ShopStore>((set) => ({
  isShowingReviews: false,
  shops: [],
  selectedShop: null,
  selectedResult: null,
  setIsShowingReviews: (isShowingReviews: boolean) => set({ isShowingReviews }),
  setShops: (shops: Shop[]) => set({ shops }),
  setSelectedShop: (shop: Shop | null) => set({ selectedShop: shop }),
  setSelectedResult: (result: SearchResult | null) =>
    set({ selectedResult: result }),
}));
