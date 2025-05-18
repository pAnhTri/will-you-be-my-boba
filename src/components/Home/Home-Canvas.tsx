import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface HomeCanvasProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const HomeCanvas = ({ children, className, ...props }: HomeCanvasProps) => {
  return (
    <div
      className={cn(
        "container mx-auto h-full border-2 p-6 rounded-lg shadow-lg",
        className
      )}
      {...props}
    >
      <div className="flex flex-col md:flex-row gap-4">{children}</div>
    </div>
  );
};

export default HomeCanvas;
