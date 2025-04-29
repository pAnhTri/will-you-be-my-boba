import { UserType } from "@/lib/mongodb/models/User";
import { create } from "zustand";

interface ProfileStore {
  userProfile: UserType | null;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  setUserProfile: (profile: UserType) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  currentTab: "reviews",
  userProfile: null,
  setCurrentTab: (tab) => set({ currentTab: tab }),
  setUserProfile: (profile) => set({ userProfile: profile }),
}));
