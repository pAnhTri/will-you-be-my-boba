"use client";

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
      <div className="flex justify-between items-center">
        <h3 className="text font-bold">Q: {question}</h3>
        <button onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? <LuChevronDown /> : <LuChevronUp />}
        </button>
      </div>
      <div
        className={`text-gray-600 transition-all duration-300 ${
          isCollapsed ? "max-h-0 opacity-0" : "max-h-96 opacity-100"
        }`}
      >
        {answer}
      </div>
    </div>
  );
};

export default QA;
