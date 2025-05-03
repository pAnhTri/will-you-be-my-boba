import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: ReactNode;
}

const Card = ({ className, children, title, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "flex flex-col ring-1 ring-gray-200 rounded-lg p-2 gap-4",
        className
      )}
      {...props}
    >
      {title && <h2 className="text-lg font-bold">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;
