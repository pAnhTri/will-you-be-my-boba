"use server";

import { ReportDocument } from "@/lib/mongodb/models/Report";
import { use } from "react";
import { SWRConfig, unstable_serialize } from "swr";
import ReportsInitiator from "./ReportFetcher/ReportsInitiator";

interface ReportsFetcherProps {
  reportsPromise: Promise<ReportDocument[]>;
}

const ReportsFetcher = ({ reportsPromise }: ReportsFetcherProps) => {
  const {
    reports,
    error,
  }: {
    reports: ReportDocument[] | null;
    error: Error | null;
  } = use(
    reportsPromise
      .then((reports) => {
        return {
          reports: reports,
          error: null,
        };
      })
      .catch((err) => {
        return {
          reports: null,
          error: err as Error,
        };
      })
  );

  const key = unstable_serialize("boba-reports");

  const fallback = {
    [key]: reports,
  };

  return (
    <SWRConfig value={{ fallback }}>
      <ReportsInitiator error={error} />
    </SWRConfig>
  );
};

export default ReportsFetcher;
