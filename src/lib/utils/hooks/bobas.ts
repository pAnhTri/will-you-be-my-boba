"use client";

import { BobaDocument } from "@/lib/mongodb/models/Boba";
import { useCallback, useState } from "react";
import { updateBoba as updateBobaApi } from "../api/boba";

export const useBobaUpdater = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatedBoba, setUpdatedBoba] = useState<BobaDocument | null>(null);

  const updateBoba = useCallback(
    async (bobaId: string, payload: Partial<BobaDocument>) => {
      setIsLoading(true);
      setError(null);
      setUpdatedBoba(null);

      try {
        const updatedBoba = await updateBobaApi(bobaId, payload);
        setUpdatedBoba(updatedBoba);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    isLoading,
    error,
    updatedBoba,
    updateBoba,
  };
};
