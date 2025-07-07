import { create } from "zustand";

interface AdminStore {
  activeTab: "reports" | "shops" | "boba";
  currentReportType: "all" | "flavor" | "shop" | "boba" | "other" | "solved";
  setActiveTab: (tab: "reports" | "shops" | "boba") => void;
  setCurrentReportType: (
    type: "all" | "flavor" | "shop" | "boba" | "other" | "solved"
  ) => void;
}

export const useAdminStore = create<AdminStore>((set) => ({
  activeTab: "reports",
  currentReportType: "all",
  setActiveTab: (tab) => set({ activeTab: tab }),
  setCurrentReportType: (type) => set({ currentReportType: type }),
}));
