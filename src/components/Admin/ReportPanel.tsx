"use client";

import { getAllReports, getReportByType } from "@/lib/utils/api/report";
import { ReportDocument } from "@/lib/mongodb/models/Report";
import { useEffect, useMemo, useState } from "react";
import { useAdminStore } from "@/lib/zustand/stores";
import { Tabs } from "@mantine/core";
import IndicationCard from "./ReportPanel/IndicationCard";
import { createTabConfigs } from "@/lib/utils";
import { ReportTabConfig } from "@/types";
import ReportTypePanel from "./ReportPanel/ReportTypePanel";
import { CiCircleAlert } from "react-icons/ci";

const ReportPanel = () => {
  const [areReportsLoading, setAreReportsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reports, setReports] = useState<Record<string, ReportDocument[]>>({});

  const currentReportType = useAdminStore((state) => state.currentReportType);
  const setCurrentReportType = useAdminStore(
    (state) => state.setCurrentReportType
  );

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const reports = await getAllReports();
        const flavorReports = await getReportByType("flavor");
        const shopReports = await getReportByType("shop");
        const bobaReports = await getReportByType("name");
        const otherReports = await getReportByType("other");
        const solvedReports = await getReportByType("solved");

        if (
          reports?.length !==
          flavorReports?.length +
            shopReports?.length +
            bobaReports?.length +
            otherReports?.length +
            solvedReports?.length
        ) {
          throw new Error(
            "Number of reports does not match the sum of the number of reports by type"
          );
        }

        setReports({
          all: reports,
          flavor: flavorReports,
          shop: shopReports,
          boba: bobaReports,
          other: otherReports,
          solved: solvedReports,
        });
      } catch (error) {
        if (error instanceof Error) {
          setError(`Failed to fetch reports: ${error.message}`);
        } else {
          setError("Failed to fetch reports");
        }
      } finally {
        setAreReportsLoading(false);
      }
    };

    fetchReports();
  }, []);

  const reportTabConfigs: ReportTabConfig[] = useMemo(
    () => createTabConfigs(reports),
    [reports]
  );

  return (
    <>
      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-start gap-2 text-sm">
          <CiCircleAlert className="size-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <Tabs
        value={currentReportType}
        onChange={(value) =>
          setCurrentReportType(
            value as "all" | "flavor" | "shop" | "boba" | "other" | "solved"
          )
        }
        variant="default"
        classNames={{
          root: "flex flex-col grow",
        }}
      >
        <Tabs.List
          justify="space-between"
          className="px-2 sticky top-0 bg-white"
        >
          {reportTabConfigs.map((tab) => (
            <Tabs.Tab
              key={tab.value}
              value={tab.value}
              disabled={tab.count === 0}
              className="p-2"
            >
              <IndicationCard
                title={tab.label}
                value={tab.count}
                icon={tab.icon}
                color={tab.color}
              />
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {reportTabConfigs.map((tab) => (
          <ReportTypePanel
            key={tab.value}
            areReportsLoading={areReportsLoading}
            reports={reports[tab.value]}
            reportType={tab.value}
          />
        ))}
      </Tabs>
    </>
  );
};

export default ReportPanel;
