import { create } from "zustand";

interface ReportStore {
  isReportModalOpen: boolean;
  selectedBobaToReport: string | null;
  successMessage: string | null;
  setIsReportModalOpen: (isReportModalOpen: boolean) => void;
  setSelectedBobaToReport: (boba: string | null) => void;
  setSuccessMessage: (message: string | null) => void;
}

export const useReportStore = create<ReportStore>((set) => ({
  isReportModalOpen: false,
  selectedBobaToReport: null,
  successMessage: null,
  setIsReportModalOpen: (isReportModalOpen) => set({ isReportModalOpen }),
  setSelectedBobaToReport: (selectedBobaToReport) =>
    set({ selectedBobaToReport: selectedBobaToReport }),
  setSuccessMessage: (successMessage) => set({ successMessage }),
}));
