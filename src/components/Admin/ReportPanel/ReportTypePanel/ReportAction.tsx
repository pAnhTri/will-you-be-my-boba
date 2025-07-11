import { ReportDocument } from "@/lib/mongodb/models/Report";
import { useReportInformationGetter } from "@/lib/utils/hooks";
import { Alert, Divider, LoadingOverlay, Paper } from "@mantine/core";
import { LuCircleAlert } from "react-icons/lu";
import ReportForm from "./ReportAction/ReportForm";

interface ReportActionProps {
  report: ReportDocument;
}

const ReportAction = ({ report }: ReportActionProps) => {
  const { currentBoba, availableShops, availableFlavors, isLoading, error } =
    useReportInformationGetter(report.boba);

  return (
    <>
      <Divider
        my="xs"
        label="Report Actions"
        labelPosition="center"
        color="black"
        classNames={{ label: "text-black" }}
      />

      <Paper p="xs" pos="relative" onClick={(e) => e.stopPropagation()}>
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ blur: 2 }}
        />

        {error && (
          <Alert
            color="red"
            title="Error"
            variant="outline"
            icon={<LuCircleAlert size={16} />}
          >
            {error}
          </Alert>
        )}

        <ReportForm
          availableFlavors={availableFlavors ?? []}
          availableShops={availableShops ?? []}
          currentBoba={currentBoba!}
          reportId={report._id.toString()}
          reportType={report.type}
        />
      </Paper>
    </>
  );
};

export default ReportAction;
