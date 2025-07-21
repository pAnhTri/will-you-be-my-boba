"use client";

import { BobaDocument } from "@/lib/mongodb/models/Boba";
import { useCallback, useState, useEffect } from "react";
import { updateBoba as updateBobaApi } from "../api/boba";
import { getBobaByName, getBobaFlavors } from "../actions";
import { useAdminStore } from "@/lib/zustand/stores";
import useSWR from "swr";

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

export const useBobaFlavors = () => {
  const {
    data: flavors,
    isLoading,
    error,
    mutate,
  } = useSWR<string[]>("boba-flavors", getBobaFlavors);

  return {
    flavors,
    isLoading,
    error,
    mutate,
  };
};

export const useBobaByName = (bobaName: string) => {
  const setIsFormDataLoading = useAdminStore(
    (state) => state.setIsFormDataLoading
  );
  const [error, setError] = useState<string | null>(null);

  // Provide a fetcher to SWR so it manages cache/fetch automatically
  const {
    data: boba,
    mutate,
    isValidating,
  } = useSWR<BobaDocument | null>(
    bobaName ? `boba-by-name-${bobaName}` : null,
    null,
    {
      fallbackData: null,
      revalidateOnMount: false,
    }
  );

  useEffect(
    () => {
      setIsFormDataLoading(isValidating);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isValidating]
  );

  const fetchBobaByName = useCallback(
    async () => {
      if (boba !== null) return;

      setIsFormDataLoading(true);
      setError(null);

      try {
        const fetchedBoba = await getBobaByName(bobaName);
        await mutate(fetchedBoba, { revalidate: false });
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
        await mutate(null, { revalidate: false });
      } finally {
        setIsFormDataLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bobaName, mutate, boba]
  );

  const resetBoba = useCallback(() => {
    mutate(null, { revalidate: false, populateCache: false });
    setError(null);
  }, [mutate]);

  return {
    boba,
    error,
    fetchBobaByName,
    resetBoba,
  };
};
