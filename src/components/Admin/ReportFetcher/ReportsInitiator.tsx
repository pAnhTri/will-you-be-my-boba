"use client";

import { useReports } from "@/lib/utils/hooks/reports";
import { useAdminStore } from "@/lib/zustand/stores";
import { Alert } from "@mantine/core";
import { useEffect } from "react";

interface ReportsInitiatorProps {
  error: Error | null;
}

const ReportsInitiator = ({ error }: ReportsInitiatorProps) => {
  const setReportsError = useAdminStore((state) => state.setReportsError);
  const setReports = useAdminStore((state) => state.setReports);
  const setIsReportsLoading = useAdminStore(
    (state) => state.setIsReportsLoading
  );
  const { reports } = useReports();

  useEffect(
    () => {
      if (reports) {
        setReports(reports);
      }

      if (error) {
        setReportsError(error.message);
      }

      setIsReportsLoading(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reports, error]
  );

  if (error) {
    return (
      <Alert color="red" title="Error">
        {error.message}
      </Alert>
    );
  }

  return null;
};

export default ReportsInitiator;
