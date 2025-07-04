import { cn } from "@/lib/utils";
import { useReportStore } from "@/lib/zustand/stores";
import { Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { HTMLAttributes } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const ReportButton = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const setReportModalOpen = useReportStore(
    (state) => state.setIsReportModalOpen
  );

  const setSelectedBobaToReport = useReportStore(
    (state) => state.setSelectedBobaToReport
  );

  const matches = useMediaQuery("(min-width: 62em)");

  const handleReportClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const boba =
      e.currentTarget.parentElement?.parentElement?.innerText.split("\n")[0] ||
      null;

    if (!boba) {
      return;
    }

    setSelectedBobaToReport(boba);
    setReportModalOpen(true);
  };

  return (
    <div className={cn("flex justify-end", className)} {...props}>
      <Button
        color="red"
        variant="subtle"
        size="xs"
        title="Report this boba"
        leftSection={
          matches ? <FaExclamationTriangle className="size-4" /> : null
        }
        onClick={handleReportClick}
      >
        {matches ? (
          <span className="text-sm hidden sm:inline-block">Report</span>
        ) : (
          <FaExclamationTriangle className="size-4" />
        )}
      </Button>
    </div>
  );
};

export default ReportButton;
