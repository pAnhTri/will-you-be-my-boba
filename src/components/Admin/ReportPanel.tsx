"use client";

import {
  Alert,
  Center,
  Group,
  Loader,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import ActiveReportPanelTabs from "./ReportPanel/ActiveReportPanelTabs";
import { useAdminStore } from "@/lib/zustand/stores/admin";
import { useInitiateReports } from "@/lib/utils/hooks/reports";
import { useMemo } from "react";
import ReportCard from "./ReportPanel/ReportCard";

const ReportPanel = () => {
  const activeReportTab = useAdminStore((state) => state.activeReportTab);
  const reports = useAdminStore((state) => state.reports);

  const reportsByTab = useMemo(() => {
    if (!reports) return [];
    if (activeReportTab === "all") return reports;

    switch (activeReportTab) {
      case "flavors":
        return reports.filter((report) => report.type === "Flavor");
      case "shops":
        return reports.filter((report) => report.type === "Shop");
      case "bobas":
        return reports.filter((report) => report.type === "Name");
      case "others":
        return reports.filter((report) => report.type === "Other");
      case "solved":
        return reports.filter((report) => report.type === "Solved");
    }
  }, [reports, activeReportTab]);

  const { isLoading, error } = useInitiateReports();

  if (error) {
    return (
      <Alert title="Error" color="red">
        {error}
      </Alert>
    );
  }

  if (isLoading || !reports) {
    return (
      <Group className="remaining-space justify-center items-center gap-2">
        <Loader />
        <Text>Loading reports...</Text>
      </Group>
    );
  }

  return (
    <>
      <Center>
        <ActiveReportPanelTabs />
      </Center>
      <ScrollArea
        classNames={{ root: "grow-1 min-h-0 p-2 overflow-hidden" }}
        offsetScrollbars
      >
        <Stack gap="xs">
          {reportsByTab.length === 0 ? (
            <Center>
              <Text>No reports found</Text>
            </Center>
          ) : (
            reportsByTab.map((report) => (
              <ReportCard key={report._id.toString()} report={report} />
            ))
          )}
        </Stack>
      </ScrollArea>
    </>
  );
};

export default ReportPanel;
