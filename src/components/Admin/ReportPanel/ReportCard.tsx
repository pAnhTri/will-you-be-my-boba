import { ReportDocument } from "@/lib/mongodb/models/Report";
import { cn, getReportBadgeColor, toLocalTime } from "@/lib/utils";
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
  Loader,
} from "@mantine/core";
import React from "react";
import ReportForm from "./ReportCard/ReportForm";
import { useShopNameById } from "@/lib/utils/hooks/shops";

interface ReportCardProps {
  report: ReportDocument;
}

const ReportCard = ({ report }: ReportCardProps) => {
  const currentReport = useAdminStore((state) => state.currentReport);
  const toggleCurrentReport = useAdminStore(
    (state) => state.toggleCurrentReport
  );

  const {
    shopName,
    isLoading: isShopNameLoading,
    error: shopNameError,
    isValidating: isShopNameValidating,
  } = useShopNameById(report.shop?.toString() ?? "");

  if (shopNameError) {
    return (
      <Alert title="Error" color="red">
        {shopNameError.message}
      </Alert>
    );
  }

  return (
    <Paper
      className={cn(
        "border border-gray-200 shadow-sm p-3 hover:bg-pink-500/10 cursor-pointer transition-all duration-[100ms] rounded-md",
        currentReport?._id.toString() === report._id.toString() &&
          "bg-pink-500/10 border-pink-500 hover:bg-pink-500/20"
      )}
      onClick={() => toggleCurrentReport(report)}
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
            <Group gap="xs">
              <Text size="xs" c="dimmed">
                Shop: {shopName ?? "Unknown Shop"}
              </Text>
              {isShopNameValidating && <Loader size="xs" color="gray" />}
            </Group>
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
        {currentReport?._id.toString() === report._id.toString() && (
          <Paper p="xs" radius="md">
            <ReportForm bobaName={report.boba} />
          </Paper>
        )}
      </Collapse>
    </Paper>
  );
};

export default ReportCard;
