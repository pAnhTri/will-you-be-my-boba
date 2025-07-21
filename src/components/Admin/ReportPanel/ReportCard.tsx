import { ReportDocument } from "@/lib/mongodb/models/Report";
import { cn, getReportBadgeColor, toLocalTime } from "@/lib/utils";
import { useBobaByName } from "@/lib/utils/hooks/bobas";
import { useAdminStore } from "@/lib/zustand/stores";
import {
  Badge,
  Group,
  Paper,
  Text,
  Stack,
  Alert,
  Skeleton,
  Collapse,
  Divider,
} from "@mantine/core";
import React from "react";
import ReportForm from "./ReportCard/ReportForm";
import { useShopNameById } from "@/lib/utils/hooks/shops";

interface ReportCardProps {
  report: ReportDocument;
}

const ReportCard = ({ report }: ReportCardProps) => {
  const currentReport = useAdminStore((state) => state.currentReport);
  const isFormDataLoading = useAdminStore((state) => state.isFormDataLoading);
  const toggleCurrentReport = useAdminStore(
    (state) => state.toggleCurrentReport
  );

  const {
    boba,
    error: bobaError,
    fetchBobaByName,
    resetBoba,
  } = useBobaByName(report.boba);

  const {
    data: shopName,
    isLoading: isShopNameLoading,
    error: shopNameError,
  } = useShopNameById(report.shop?.toString() ?? null);

  if (shopNameError) {
    return (
      <Alert title="Error" color="red">
        {shopNameError}
      </Alert>
    );
  }

  const handleOnClick = () => {
    if (currentReport?._id.toString() === report._id.toString()) {
      resetBoba();
    } else {
      fetchBobaByName();
    }

    toggleCurrentReport(report);
  };

  return (
    <Paper
      className={cn(
        "border border-gray-200 shadow-sm p-3 hover:bg-pink-500/10 cursor-pointer transition-all duration-[100ms] rounded-md",
        currentReport?._id.toString() === report._id.toString() &&
          "bg-pink-500/10 border-pink-500 hover:bg-pink-500/20"
      )}
      onClick={handleOnClick}
    >
      <Stack gap="xs">
        {/* Header: Badge, Boba Name, and Timestamp */}
        <Group justify="space-between" align="flex-start">
          <Group gap="xs" align="center">
            <Badge color={getReportBadgeColor(report.type)} variant="light">
              {report.type}
            </Badge>
            <Text size="sm" fw={500} className="text-gray-900">
              {report.boba}
            </Text>
          </Group>
          <Group>
            <Badge
              color={report.type === "Solved" ? "green" : "red"}
              variant="light"
            >
              {report.type === "Solved" ? "Solved" : "Unsolved"}
            </Badge>
            <Text size="xs" c="dimmed" className="text-right">
              {toLocalTime(report.createdAt).toLocaleString()}
            </Text>
          </Group>
        </Group>

        {/* Shop ID if available */}
        {report.shop &&
          (isShopNameLoading ? (
            <Skeleton height={20} width={500} />
          ) : (
            <Text size="xs" c="dimmed">
              Shop: {shopName ?? "Unknown Shop"}
            </Text>
          ))}

        {/* Comment if available */}
        {report.comment && (
          <Text
            size="sm"
            className="text-gray-700 whitespace-pre-wrap break-words"
          >
            {report.comment}
          </Text>
        )}
      </Stack>

      {/* Collapsable form */}
      <Collapse in={currentReport?._id.toString() === report._id.toString()}>
        <Divider
          color="black"
          my="xs"
          label="Report Actions"
          labelPosition="center"
          classNames={{
            label: "text-gray-700",
          }}
        />
        <Paper p="xs" radius="md">
          {bobaError ? (
            <Alert color="red" title="Error">
              {bobaError}
            </Alert>
          ) : isFormDataLoading ? (
            <Skeleton height={200} width={500} />
          ) : (
            <ReportForm boba={boba ?? null} />
          )}
        </Paper>
      </Collapse>
    </Paper>
  );
};

export default ReportCard;
