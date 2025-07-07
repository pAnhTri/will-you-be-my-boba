import { Badge, Paper } from "@mantine/core";
import { ReactNode } from "react";

interface IndicationCardProps {
  color: string;
  icon: ReactNode;
  title: string;
  value: number;
}

const IndicationCard = ({ color, icon, title, value }: IndicationCardProps) => {
  return (
    <Paper withBorder p="xs">
      <div className="flex items-center justify-between gap-2">
        {icon}
        <Badge color={color} size="sm" variant="light">
          {title}
        </Badge>
        <span>{value}</span>
      </div>
    </Paper>
  );
};

export default IndicationCard;
