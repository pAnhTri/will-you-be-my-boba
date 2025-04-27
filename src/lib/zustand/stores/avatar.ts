import { create } from "zustand";

interface AvatarStore {
  avatar: string | null;
  isImageLoading: boolean;
  setAvatar: (avatar: string | null) => void;
  setIsImageLoading: (isImageLoading: boolean) => void;
}

export const useAvatarStore = create<AvatarStore>((set) => ({
  avatar: null,
  isImageLoading: true,
  setAvatar: (avatar) => set({ avatar }),
  setIsImageLoading: (isImageLoading) => set({ isImageLoading }),
}));
