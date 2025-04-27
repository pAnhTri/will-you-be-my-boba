import { HTMLAttributes } from "react";

interface StatusCardProps extends HTMLAttributes<HTMLDivElement> {
  status: string;
  title: string;
}

const StatusCard = ({
  className,
  status,
  title,
  ...props
}: StatusCardProps) => {
  return (
    <div className={className} {...props}>
      <p className="text-2xl font-bold">{status}</p>
      <h3 className="text-muted-foreground">{title}</h3>
    </div>
  );
};

export default StatusCard;
