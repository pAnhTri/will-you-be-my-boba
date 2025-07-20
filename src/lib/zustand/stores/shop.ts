import { ShopDocument } from "@/lib/mongodb/models/Shop";
import { SearchResult, Shop } from "@/types";
import { create } from "zustand";

interface ShopStore {
  isShowingReviews: boolean;
  displayShops: Shop[];
  shops: Shop[];
  shopDocuments: ShopDocument[];
  placesDetailMap: Map<string, { rating: number; userRatingCount: number }>;
  selectedShop: Shop | null;
  selectedResult: SearchResult | null;
  isShopsLoading: boolean;
  setIsShopsLoading: (isShopsLoading: boolean) => void;
  setIsShowingReviews: (isShowingReviews: boolean) => void;
  setDisplayShops: (shop: Shop[]) => void;
  setShops: (shop: Shop[]) => void;
  setShopDocuments: (shopDocuments: ShopDocument[]) => void;
  setPlacesDetailMap: (
    placesDetailMap: Map<string, { rating: number; userRatingCount: number }>
  ) => void;
  setSelectedShop: (shop: Shop | null) => void;
  setSelectedResult: (result: SearchResult | null) => void;
}

export const useShopStore = create<ShopStore>((set) => ({
  isShowingReviews: false,
  displayShops: [],
  shops: [],
  shopDocuments: [],
  placesDetailMap: new Map(),
  selectedShop: null,
  selectedResult: null,
  isShopsLoading: true,
  setIsShopsLoading: (isShopsLoading: boolean) => set({ isShopsLoading }),
  setIsShowingReviews: (isShowingReviews: boolean) => set({ isShowingReviews }),
  setDisplayShops: (shops: Shop[]) => set({ displayShops: shops }),
  setShops: (shops: Shop[]) => set({ shops }),
  setShopDocuments: (shopDocuments: ShopDocument[]) => set({ shopDocuments }),
  setSelectedShop: (shop: Shop | null) => set({ selectedShop: shop }),
  setSelectedResult: (result: SearchResult | null) =>
    set({ selectedResult: result }),
  setPlacesDetailMap: (
    placesDetailMap: Map<string, { rating: number; userRatingCount: number }>
  ) => set({ placesDetailMap }),
}));
