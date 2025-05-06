"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { LuChevronUp } from "react-icons/lu";
import { LuChevronDown } from "react-icons/lu";

interface QAProps {
  question: string;
  answer: string;
}

const QA = ({ question, answer }: QAProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="border-b border-gray-200 py-2">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h3 className="text font-bold">Q: {question}</h3>
        <span>{isCollapsed ? <LuChevronDown /> : <LuChevronUp />}</span>
      </div>
      <div
        className={cn(
          "text-gray-600 transition-all duration-300",
          isCollapsed
            ? "max-h-0 opacity-0 overflow-hidden"
            : "max-h-96 opacity-100 overflow-visible"
        )}
      >
        {answer}
      </div>
    </div>
  );
};

export default QA;
