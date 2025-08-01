import { Center, ScrollArea } from "@mantine/core";
import dynamic from "next/dynamic";
import { Skeleton } from "@mantine/core";

const ActiveReportPanelTabs = dynamic(
  () => import("./ReportPanel/ActiveReportPanelTabs"),
  {
    loading: () => <Skeleton height={100} width="100%" maw={500} />,
  }
);

const ReportCardWrapper = dynamic(
  () => import("./ReportPanel/ReportCardWrapper"),
  {
    loading: () => <Skeleton height="100%" width="100%" />,
  }
);

const ReportPanel = () => {
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
        <ReportCardWrapper />
      </ScrollArea>
    </>
  );
};

export default ReportPanel;
