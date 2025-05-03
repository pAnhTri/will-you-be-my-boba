import { SearchResult, Shop } from "@/types";
import { create } from "zustand";

interface ShopStore {
  isShowingReviews: boolean;
  displayShops: Shop[];
  shops: Shop[];
  selectedShop: Shop | null;
  selectedResult: SearchResult | null;
  setIsShowingReviews: (isShowingReviews: boolean) => void;
  setDisplayShops: (shop: Shop[]) => void;
  setShops: (shop: Shop[]) => void;
  setSelectedShop: (shop: Shop | null) => void;
  setSelectedResult: (result: SearchResult | null) => void;
}

export const useShopStore = create<ShopStore>((set) => ({
  isShowingReviews: false,
  displayShops: [],
  shops: [],
  selectedShop: null,
  selectedResult: null,
  setIsShowingReviews: (isShowingReviews: boolean) => set({ isShowingReviews }),
  setDisplayShops: (shops: Shop[]) => set({ displayShops: shops }),
  setShops: (shops: Shop[]) => set({ shops }),
  setSelectedShop: (shop: Shop | null) => set({ selectedShop: shop }),
  setSelectedResult: (result: SearchResult | null) =>
    set({ selectedResult: result }),
}));
