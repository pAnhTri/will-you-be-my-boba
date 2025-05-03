import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

interface SortButtonProps extends HTMLAttributes<HTMLButtonElement> {
  handleOnClick: (sortedBy: string) => void;
  sortedBy: string;
}

const SortButton = ({
  className,
  children,
  sortedBy,
  handleOnClick,
}: SortButtonProps) => {
  return (
    <button
      className={cn(
        "p-2 rounded-md border border-gray-300 text-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-300",
        className
      )}
      onClick={() => handleOnClick(sortedBy)}
    >
      {children}
    </button>
  );
};

export default SortButton;
