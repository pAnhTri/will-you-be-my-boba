import { ReportDocument } from "@/lib/mongodb/models/Report";
import { create } from "zustand";

interface AdminStore {
  activeReportTab: "all" | "flavors" | "shops" | "bobas" | "others" | "solved";
  currentReport: ReportDocument | null;
  isFormDataLoading: boolean;
  isReportsLoading: boolean;
  reports: ReportDocument[] | null;
  reportsError: string | null;
  version: number;
  setActiveReportTab: (
    tab: "all" | "flavors" | "shops" | "bobas" | "others" | "solved"
  ) => void;
  setCurrentReport: (report: ReportDocument | null) => void;
  setIsFormDataLoading: (isLoading: boolean) => void;
  setIsReportsLoading: (isLoading: boolean) => void;
  setReports: (reports: ReportDocument[] | null) => void;
  setReportsError: (error: string | null) => void;
  toggleCurrentReport: (report: ReportDocument | null) => void;
  setVersion: (version: number) => void;
  incrementVersion: () => void;
}

export const useAdminStore = create<AdminStore>((set, get) => ({
  activeReportTab: "all",
  currentReport: null,
  isFormDataLoading: false,
  isReportsLoading: false,
  reports: null,
  reportsError: null,
  version: 0,
  setActiveReportTab: (tab) => set({ activeReportTab: tab }),
  setCurrentReport: (currentReport) => set({ currentReport: currentReport }),
  setIsFormDataLoading: (isLoading) => set({ isFormDataLoading: isLoading }),
  setIsReportsLoading: (isLoading) => set({ isReportsLoading: isLoading }),
  setReports: (reports) => set({ reports }),
  setReportsError: (error) => set({ reportsError: error }),
  toggleCurrentReport: (report) => {
    const currentReport = get().currentReport;
    if (currentReport?._id.toString() === report?._id.toString()) {
      set({ currentReport: null });
    } else {
      set({ currentReport: report });
    }
  },
  setVersion: (version) => set({ version }),
  incrementVersion: () => set((state) => ({ version: state.version + 1 })),
}));
