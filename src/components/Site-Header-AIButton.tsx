"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { LuSparkles } from "react-icons/lu";
import { useModalStore } from "@/lib/zustand/stores/modal";

interface AiButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant: "desktop" | "mobile";
}

const AiButton = ({ variant, className, ...props }: AiButtonProps) => {
  const { setIsAiModalOpen } = useModalStore();

  return (
    <button
      onClick={() => setIsAiModalOpen(true)}
      className={cn(
        "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white p-2 rounded-full",
        variant === "mobile" && "md:hidden",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-1">
        <LuSparkles />
        {variant === "desktop" && <span>Ask Alex AI</span>}
      </div>
    </button>
  );
};

export default AiButton;
