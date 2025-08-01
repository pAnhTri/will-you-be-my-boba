"use client";

import useSWR from "swr";
import { getReports } from "../actions";
import { ReportDocument } from "@/lib/mongodb/models/Report";
import { useCallback, useState } from "react";
import {
  updateReport as updateReportAction,
  updateManyReports,
} from "../actions";

export const useReports = () => {
  const {
    data: reports,
    isLoading,
    isValidating,
    error,
    mutate,
  } = useSWR<ReportDocument[]>("reports", getReports, {
    revalidateOnMount: false,
  });

  return {
    reports,
    isLoading,
    isValidating,
    error,
    mutate,
  };
};

export const useReportUpdater = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { mutate } = useReports();

  const updateReport = useCallback(
    async (
      reportId: string | null = null,
      payload: Partial<ReportDocument>,
      isUpdatingName: boolean = false,
      oldName: string | null = null
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        if (reportId) {
          await updateReportAction({ _id: reportId }, payload);
        }

        if (isUpdatingName) {
          await updateManyReports({ boba: oldName }, { boba: payload.boba });
        }

        mutate();
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    },
    [mutate]
  );

  return {
    isLoading,
    error,
    updateReport,
  };
};
