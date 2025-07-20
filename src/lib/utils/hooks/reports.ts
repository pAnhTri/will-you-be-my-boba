"use client";

import { useCallback, useEffect, useState } from "react";
import { getReports } from "../actions/report";
import { useAdminStore } from "@/lib/zustand/stores/admin";

export const useInitiateReports = () => {
  const setReports = useAdminStore((state) => state.setReports);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initializeReports = useCallback(
    async () => {
      setIsLoading(true);
      setError(null);

      try {
        const reports = await getReports();

        setReports(reports);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to initialize reports"
        );
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Immediately initialize reports upon mount
  useEffect(
    () => {
      initializeReports();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { isLoading, error, initializeReports };
};
