import { cn } from "@/lib/utils";
import { useFlavorStore } from "@/lib/zustand/stores";
import { HTMLAttributes } from "react";

const ResetButton = ({
  onClick,
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement>) => {
  const selectedFlavors = useFlavorStore((state) => state.selectedFlavors);
  return (
    <button
      onClick={onClick}
      className={cn(
        "bg-pink-500 disabled:bg-slate-400 text-white px-4 py-2 rounded-md whitespace-nowrap transition-all duration-300",
        className
      )}
      disabled={selectedFlavors.length === 0}
      {...props}
    >
      Try Again
    </button>
  );
};

export default ResetButton;
