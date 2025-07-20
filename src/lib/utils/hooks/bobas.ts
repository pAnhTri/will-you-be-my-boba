"use client";

import { BobaDocument } from "@/lib/mongodb/models/Boba";
import { useCallback, useEffect, useState } from "react";
import { updateBoba as updateBobaApi } from "../api/boba";
import { getBobaByName } from "../actions";
import { useAdminStore } from "@/lib/zustand/stores";

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

export const useBobaByNameFetcher = () => {
  const setIsFormDataLoading = useAdminStore(
    (state) => state.setIsFormDataLoading
  );

  const [boba, setBoba] = useState<BobaDocument | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchBobaByName = useCallback(
    async (bobaName: string) => {
      setIsFormDataLoading(true);
      setError(null);
      setBoba(null);

      try {
        const boba = await getBobaByName(bobaName);
        setBoba(boba);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setIsFormDataLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const resetBoba = useCallback(() => {
    setBoba(null);
    setError(null);
  }, []);

  return {
    boba,
    error,
    fetchBobaByName,
    resetBoba,
  };
};
