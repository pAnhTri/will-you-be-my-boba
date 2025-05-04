import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";
import { FaStore } from "react-icons/fa";

interface BlankProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Blank = ({ children, className, ...props }: BlankProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2",
        className
      )}
      {...props}
    >
      {/* Shop icon */}
      <FaStore className="size-24 text-muted-foreground" />
      {children}
    </div>
  );
};

export default Blank;
