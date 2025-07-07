import { ReportDocument } from "@/lib/mongodb/models/Report";
import { Loader, Tabs } from "@mantine/core";
import ReportCard from "./ReportTypePanel/ReportCard";

interface ReportTypePanelProps {
  areReportsLoading: boolean;
  reports: ReportDocument[];
  reportType: string;
}

const ReportTypePanel = ({
  areReportsLoading,
  reports,
  reportType,
}: ReportTypePanelProps) => {
  if (areReportsLoading) {
    return (
      <Tabs.Panel
        value={reportType}
        className="flex flex-col grow justify-center items-center"
      >
        <Loader />
      </Tabs.Panel>
    );
  }

  if (reports && reports.length === 0) {
    return (
      <Tabs.Panel
        value={reportType}
        className="flex flex-col grow justify-center items-center"
      >
        <div>No reports found</div>
      </Tabs.Panel>
    );
  }

  return (
    <Tabs.Panel value={reportType}>
      <div className="flex flex-col gap-2 p-2">
        {reports.map((report) => (
          <ReportCard key={report._id.toString()} report={report} />
        ))}
      </div>
    </Tabs.Panel>
  );
};

export default ReportTypePanel;
