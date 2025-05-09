"use client";

import { useAlexAIStore } from "@/lib/zustand/stores/alexAI";
import { useEffect, useState } from "react";
import { FaMagic, FaTimes } from "react-icons/fa";

const AlexAIResponse = () => {
  const isAlexAIResponseOpen = useAlexAIStore(
    (state) => state.isAlexAIResponseOpen
  );
  const { setIsAlexAIResponseOpen, setResponse } = useAlexAIStore();
  const response = useAlexAIStore((state) => state.response);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isAlexAIResponseOpen) {
      setIsVisible(true);

      // Timer to dismiss the response after 3 seconds
      const timer = setTimeout(() => {
        setIsAlexAIResponseOpen(false);
        setResponse(null);
      }, 10000);

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isAlexAIResponseOpen, setResponse]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-20 right-4 z-50 max-w-md w-full transform transition-all duration-300 ${
        isAlexAIResponseOpen
          ? "translate-y-0 opacity-100"
          : "translate-y-24 opacity-0"
      }`}
    >
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg shadow-lg border border-pink-200">
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-full p-2 mt-0.5">
              <FaMagic className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium text-pink-700">Alex AI</h4>
                <button
                  className="h-6 w-6 rounded-full -mt-1 -mr-1 hover:bg-pink-100 transition-colors flex items-center justify-center"
                  onClick={() => {
                    setIsAlexAIResponseOpen(false);
                    setResponse(null);
                  }}
                >
                  <FaTimes className="h-3 w-3 text-pink-700" />
                  <span className="sr-only">Dismiss</span>
                </button>
              </div>
              <p className="text-sm text-gray-700">{response}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlexAIResponse;
