"use client";

import {
  Alert,
  Center,
  Group,
  Loader,
  LoadingOverlay,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import ActiveReportPanelTabs from "./ReportPanel/ActiveReportPanelTabs";
import { useAdminStore } from "@/lib/zustand/stores/admin";
import { useMemo } from "react";
import ReportCard from "./ReportPanel/ReportCard";
import { useReports } from "@/lib/utils/hooks";

const ReportPanel = () => {
  const { reports, isValidating } = useReports();
  const activeReportTab = useAdminStore((state) => state.activeReportTab);
  const isReportsLoading = useAdminStore((state) => state.isReportsLoading);
  const reportsError = useAdminStore((state) => state.reportsError);

  const reportsByTab = useMemo(() => {
    if (!reports) return [];
    if (activeReportTab === "all")
      return reports.filter((report) => report.type !== "Solved");

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

  if (reportsError) {
    return (
      <Alert title="Error" color="red">
        {reportsError}
      </Alert>
    );
  }

  if (isReportsLoading || !reports) {
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
        pos="relative"
      >
        <LoadingOverlay
          visible={isValidating}
          overlayProps={{
            blur: 2,
          }}
        />
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
