"use client";

import { BobaDocument } from "@/lib/mongodb/models/Boba";
import { useCallback, useState } from "react";
import {
  getBobaByName,
  getBobaFlavors,
  updateBoba as updateBobaAction,
} from "../actions";
import { useAdminStore } from "@/lib/zustand/stores";
import useSWR from "swr";

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
    isValidating,
    error,
    mutate,
  } = useSWR<string[]>("boba-flavors", getBobaFlavors, {
    revalidateOnMount: false,
  });

  return {
    flavors,
    isLoading,
    isValidating,
    error,
    mutate,
  };
};

export const useBobaByName = (bobaName: string) => {
  const {
    data: boba,
    isLoading,
    error,
    isValidating,
    mutate,
  } = useSWR<BobaDocument | null>(
    bobaName ? `boba-by-name-${bobaName}` : null,
    () => getBobaByName(bobaName),
    {
      revalidateOnMount: false,
    }
  );

  return {
    boba,
    isLoading,
    error,
    isValidating,
    mutate,
  };
};

export const useBobaUpdater = (bobaName: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { boba, mutate } = useBobaByName(bobaName);

  const updateBoba = useCallback(
    async (payload: Partial<BobaDocument>) => {
      setIsLoading(true);
      setError(null);

      try {
        const updatedBoba = await updateBobaAction({ _id: boba?._id }, payload);
        mutate(updatedBoba, { revalidate: false });
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    },
    [boba, mutate]
  );

  if (!boba)
    return {
      isLoading,
      error,
      updateBoba: () => {},
    };

  return {
    isLoading,
    error,
    updateBoba,
  };
};
