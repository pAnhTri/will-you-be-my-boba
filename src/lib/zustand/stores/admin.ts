import { ReportDocument } from "@/lib/mongodb/models/Report";
import { PopulatedBoba } from "@/types";
import { create } from "zustand";

interface AdminStore {
  activeReportTab: "all" | "flavors" | "shops" | "bobas" | "others" | "solved";
  currentReport: ReportDocument | null;
  currentBoba: PopulatedBoba | null;
  isFormDataLoading: boolean;
  isReportsLoading: boolean;
  isBobaModalOpen: boolean;
  reports: ReportDocument[] | null;
  reportsError: string | null;
  searchParams: {
    q: string;
    limit: number;
    sort: string;
    sortOrder: "asc" | "desc";
    flavors: string;
  };
  version: number;
  setActiveReportTab: (
    tab: "all" | "flavors" | "shops" | "bobas" | "others" | "solved"
  ) => void;
  setCurrentReport: (report: ReportDocument | null) => void;
  setCurrentBoba: (boba: PopulatedBoba | null) => void;
  setIsBobaModalOpen: (isOpen: boolean) => void;
  setIsFormDataLoading: (isLoading: boolean) => void;
  setIsReportsLoading: (isLoading: boolean) => void;
  setReports: (reports: ReportDocument[] | null) => void;
  setReportsError: (error: string | null) => void;
  setSearchParams: (params: {
    q: string;
    limit: number;
    sort: string;
    sortOrder: "asc" | "desc";
    flavors: string;
  }) => void;
  toggleCurrentReport: (report: ReportDocument | null) => void;
  setVersion: (version: number) => void;
  incrementVersion: () => void;
}

export const useAdminStore = create<AdminStore>((set, get) => ({
  activeReportTab: "all",
  currentReport: null,
  currentBoba: null,
  isBobaModalOpen: false,
  isFormDataLoading: false,
  isReportsLoading: false,
  reports: null,
  reportsError: null,
  searchParams: {
    q: "",
    limit: 20,
    sort: "name",
    sortOrder: "asc",
    flavors: "",
  },
  version: 0,
  setActiveReportTab: (tab) => set({ activeReportTab: tab }),
  setCurrentReport: (currentReport) => set({ currentReport: currentReport }),
  setCurrentBoba: (currentBoba) => set({ currentBoba: currentBoba }),
  setIsBobaModalOpen: (isOpen) => set({ isBobaModalOpen: isOpen }),
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
  setSearchParams: (params) => set({ searchParams: params }),
  setVersion: (version) => set({ version }),
  incrementVersion: () => set((state) => ({ version: state.version + 1 })),
}));
