"use client";

import { Center, LoadingOverlay, Skeleton, Stack, Text } from "@mantine/core";
import { memo, useMemo } from "react";
import { useAdminStore } from "@/lib/zustand/stores/admin";
import { useReports } from "@/lib/utils/hooks";
import dynamic from "next/dynamic";

const ReportCard = dynamic(() => import("./ReportCard"), {
  loading: () => <Skeleton height={200} width="100%" />,
});

const ReportCardWrapper = () => {
  const { reports, isValidating } = useReports();
  const activeReportTab = useAdminStore((state) => state.activeReportTab);

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

  return (
    <>
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
    </>
  );
};

export default memo(ReportCardWrapper);
