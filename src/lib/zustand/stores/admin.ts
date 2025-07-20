import { ReportDocument } from "@/lib/mongodb/models/Report";
import { create } from "zustand";

interface AdminStore {
  activeReportTab: "all" | "flavors" | "shops" | "bobas" | "others" | "solved";
  currentReport: ReportDocument | null;
  isFormDataLoading: boolean;
  reports: ReportDocument[] | null;
  setActiveReportTab: (
    tab: "all" | "flavors" | "shops" | "bobas" | "others" | "solved"
  ) => void;
  setCurrentReport: (report: ReportDocument | null) => void;
  setIsFormDataLoading: (isLoading: boolean) => void;
  setReports: (reports: ReportDocument[] | null) => void;
  toggleCurrentReport: (report: ReportDocument | null) => void;
}

export const useAdminStore = create<AdminStore>((set, get) => ({
  activeReportTab: "all",
  currentReport: null,
  isFormDataLoading: false,
  reports: null,
  setActiveReportTab: (tab) => set({ activeReportTab: tab }),
  setCurrentReport: (currentReport) => set({ currentReport: currentReport }),
  setIsFormDataLoading: (isLoading) => set({ isFormDataLoading: isLoading }),
  setReports: (reports) => set({ reports }),
  toggleCurrentReport: (report) => {
    const currentReport = get().currentReport;
    if (currentReport?._id.toString() === report?._id.toString()) {
      set({ currentReport: null });
    } else {
      set({ currentReport: report });
    }
  },
}));
