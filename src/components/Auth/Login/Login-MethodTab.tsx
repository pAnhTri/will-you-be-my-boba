import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

interface MethodTabProps extends HTMLAttributes<HTMLButtonElement> {
  tab: string;
}

const MethodTab = ({ tab, className, ...props }: MethodTabProps) => {
  return (
    <button
      className={cn(
        "flex items-center justify-center p-2 rounded-md bg-white border border-gray-200",
        className
      )}
      {...props}
    >
      {tab}
    </button>
  );
};

export default MethodTab;
