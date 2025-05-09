"use client";

import { AlexAIInput, alexAiValidatorSchema } from "@/lib/validators/alexAI";
import { CiCircleAlert } from "react-icons/ci";
import { useModalStore } from "@/lib/zustand/stores/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { LuSend, LuSparkles } from "react-icons/lu";
import { usePathname } from "next/navigation";
import { getAlexAIResponse } from "@/lib/utils/api/alexAI";
import { useAlexAIStore } from "@/lib/zustand/stores/alexAI";
import { FiLoader } from "react-icons/fi";

const AiModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

  const isAiModalOpen = useModalStore((state) => state.isAiModalOpen);
  const { setIsAiModalOpen } = useModalStore();

  const result = useAlexAIStore((state) => state.result);
  const {
    setResponse,
    setResult,
    setIsAlexAIResponseOpen,
    setPrefillBobaFormData,
  } = useAlexAIStore();

  // Modal controller
  const { setIsAddBobaModalOpen } = useModalStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AlexAIInput>({
    resolver: zodResolver(alexAiValidatorSchema),
  });

  useEffect(() => {
    if (!isAiModalOpen && result && typeof result === "object") {
      switch (result.action) {
        case "OPEN_ADD_BOBA_MODAL":
          setIsAddBobaModalOpen(true);

          // Reset the action
          setResult(null);
          break;
        case "PREFILL_ADD_BOBA_FORM":
          setIsAddBobaModalOpen(true);

          setPrefillBobaFormData(
            result.formData as {
              name: string;
              flavors: string[];
              sweetnessLevel: string;
            }
          );

          // Reset the action
          setResult(null);
          break;
      }
    }
  }, [isAiModalOpen, result]);

  const onSubmit: SubmitHandler<AlexAIInput> = async (data) => {
    // Reset error and loading state
    setError(null);
    setIsLoading(true);

    try {
      const message = await getAlexAIResponse(pathname, data.query);

      setResponse(message.response);

      if (typeof message.result === "object") {
        setResult(message.result);
      }

      // Reset form
      reset();
      setIsAiModalOpen(false);
      setIsAlexAIResponseOpen(true);
    } catch (error) {
      console.error(error);
      setError("An error occurred while asking Alex. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAiModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-25">
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto p-4 rounded-lg">
        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-start gap-2 text-sm">
            <CiCircleAlert className="size-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Title and close button Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <LuSparkles className="size-6 text-pink-500" />
            <h2 className="text-2xl font-bold">Greetings! I&apos;m Alex</h2>
          </div>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setIsAiModalOpen(false)}
          >
            <IoMdClose className="size-6" />
          </button>
        </div>
        {/* Sub header */}
        <p className="text-sm text-muted-foreground mb-4">
          I&apos;m here to assist you with your tasks.
        </p>

        {/* Query Input*/}
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("query")}
            placeholder="e.g. How many boba drinks do you have?"
            className="w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          {errors.query && (
            <p className="text-red-500">{errors.query.message}</p>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-pink-500 text-white p-2 rounded-md mt-2"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <FiLoader className="size-4 animate-spin" />
                  <span>Asking Alex...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <LuSend className="size-4" />
                  <span>Ask Alex</span>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AiModal;
