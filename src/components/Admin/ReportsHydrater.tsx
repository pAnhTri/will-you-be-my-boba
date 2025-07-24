"use client";

import { ReportDocument } from "@/lib/mongodb/models/Report";
import { useReports } from "@/lib/utils/hooks";
import { useEffect } from "react";

interface ReportsHydraterProps {
  reports: ReportDocument[];
}

const ReportsHydrater = ({ reports }: ReportsHydraterProps) => {
  const { mutate } = useReports();

  useEffect(
    () => {
      mutate(reports, { revalidate: false });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return null;
};

export default ReportsHydrater;
