import { ReportDocument } from "@/lib/mongodb/models/Report";
import { cn, toLocalTime } from "@/lib/utils";
import { Shop } from "@/types";
import { Badge, Group, Paper, Stack } from "@mantine/core";

interface ReportCardProps {
  report: ReportDocument;
}

const ReportCard = ({ report }: ReportCardProps) => {
  const getBadgeColor = (type: string) => {
    console.log(type);

    switch (type) {
      case "Flavor":
        return "green";
      case "Shop":
        return "orange";
      case "Name":
        return "purple";
      case "Other":
        return "red";
    }
  };

  return (
    <Paper
      shadow="sm"
      p="xs"
      className={cn(
        "bg-red-100 border-l-8 border-red-500 hover:bg-red-200",
        report.type === "Solved" &&
          "bg-green-100 border-green-500 hover:bg-green-200"
      )}
    >
      {/* Batch and Name */}
      <Group>
        <Badge color={getBadgeColor(report.type)} variant="light">
          {report.type}
        </Badge>
        <p className="font-bold">{report.boba}</p>
        <p className="ml-auto">
          Created: {toLocalTime(report.createdAt).toLocaleDateString()}
        </p>
      </Group>
      {report.shop && (
        <p className="text-sm text-gray-500">
          Shop: {(report.shop as unknown as Shop).name}
        </p>
      )}

      <Stack>
        <p>Comment:</p>
        <div className="whitespace-pre-wrap break-words leading-relaxed bg-white p-2 rounded-md">
          {report.comment}
        </div>
      </Stack>
    </Paper>
  );
};

export default ReportCard;
