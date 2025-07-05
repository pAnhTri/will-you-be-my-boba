import { cn } from "@/lib/utils";
import { useReportStore } from "@/lib/zustand/stores";
import { Button } from "@mantine/core";
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
        onClick={handleReportClick}
      >
        <div className="flex gap-1 items-center">
          <FaExclamationTriangle className="size-4 hidden md:block" />
          <span className="text-sm hidden md:inline-block">Report</span>
          <FaExclamationTriangle className="size-4 block md:hidden" />
        </div>
      </Button>
    </div>
  );
};

export default ReportButton;
