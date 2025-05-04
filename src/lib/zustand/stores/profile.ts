import { create } from "zustand";
import { PopulatedUserType } from "@/types/user";

interface ProfileStore {
  userProfile: PopulatedUserType | null;
  currentTab: "reviews" | "favoriteShops";
  setCurrentTab: (tab: "reviews" | "favoriteShops") => void;
  setUserProfile: (profile: PopulatedUserType) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  currentTab: "reviews",
  userProfile: null,
  setCurrentTab: (tab) => set({ currentTab: tab }),
  setUserProfile: (profile) => set({ userProfile: profile }),
}));
