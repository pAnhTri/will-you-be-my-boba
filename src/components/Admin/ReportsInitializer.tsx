"use server";

import { getReports } from "@/lib/utils/actions";
import { Alert } from "@mantine/core";
import ReportsHydrater from "./ReportsHydrater";

const ReportsInitializer = async () => {
  try {
    const reports = await getReports();

    return <ReportsHydrater reports={reports} />;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch reports";
    return <Alert title={errorMessage} color="red" />;
  }
};

export default ReportsInitializer;
