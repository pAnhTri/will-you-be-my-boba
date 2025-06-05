import { cn } from "@/lib/utils";
import { useFlavorStore } from "@/lib/zustand/stores";
import { HTMLAttributes } from "react";

interface FlavorTagProps extends HTMLAttributes<HTMLButtonElement> {
  flavor: string;
  possibleFlavors: string[];
}

const FlavorTag = ({
  flavor,
  possibleFlavors,
  className,
  ...props
}: FlavorTagProps) => {
  const selectedFlavors = useFlavorStore((state) => state.selectedFlavors);
  const displayFlavors = useFlavorStore((state) => state.displayFlavors);

  return (
    <button
      disabled={
        selectedFlavors.length > 0 &&
        !possibleFlavors.includes(flavor) &&
        !selectedFlavors.includes(flavor)
      }
      className={cn(
        `px-4 py-2 rounded-lg border transition-all duration-200`,

        displayFlavors.includes(flavor)
          ? "bg-pink-500 text-white border-pink-500 hover:bg-pink-600"
          : "bg-white text-gray-800 border-gray-300 hover:border-pink-300 hover:bg-pink-50 disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {flavor}
    </button>
  );
};

export default FlavorTag;
