"use client";

import { BobaDocument } from "@/lib/mongodb/models/Boba";
import { useCallback, useMemo, useState } from "react";
import {
  createBobaAction,
  deleteBobaAction,
  getBobaByName,
  getBobaFlavors,
  getBobasAction,
  getBobasPaginationAction,
  updateBoba as updateBobaAction,
} from "../actions";
import { useAdminStore } from "@/lib/zustand/stores";
import useSWR from "swr";
import { PopulatedBoba } from "@/types";
import useSWRInfinite from "swr/infinite";
import { BobaDocumentInput } from "@/lib/validators/boba";

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

export const useBobas = () => {
  const {
    data: bobas,
    isLoading,
    error,
    isValidating,
    mutate,
  } = useSWR<PopulatedBoba[]>("bobas", getBobasAction, {
    revalidateOnMount: false,
  });

  return {
    bobas,
    isLoading,
    error,
    isValidating,
    mutate,
  };
};

export const useBobasPagination = (
  q: string = "",
  limit: number = 20,
  sort: string = "name",
  sortOrder: "asc" | "desc" = "asc",
  flavors: string = "",
  revalidateOnMount: boolean = true
) => {
  const getKey = useCallback(
    (pageIndex: number, previousData: PopulatedBoba[]) => {
      if (previousData && !previousData.length) return null;
      return `bobas-pagination?q=${q}&page=${pageIndex}&limit=${limit}&sort=${sort}&sortOrder=${sortOrder}&flavors=${flavors}`;
    },
    [q, limit, sort, sortOrder, flavors]
  );

  const fetcher = useCallback((key: string) => {
    const paramsSection = key.split("?")[1];
    const searchParams = new URLSearchParams(paramsSection);
    const q = searchParams.get("q") || "";
    const page = Number(searchParams.get("page")) || 0;
    const limit = Number(searchParams.get("limit")) || 20;
    const sort = searchParams.get("sort") || "name";
    const sortOrder =
      (searchParams.get("sortOrder") as "asc" | "desc") || "asc";
    const flavors = searchParams.get("flavors") || "";

    return getBobasPaginationAction(q, page, limit, sort, sortOrder, flavors);
  }, []);

  const {
    data: bobas,
    isLoading,
    error,
    isValidating,
    size,
    setSize,
    mutate,
  } = useSWRInfinite<PopulatedBoba[]>(getKey, fetcher, {
    revalidateOnMount,
  });

  const hasMore = useMemo(() => {
    if (!bobas || bobas.length === 0) return false;
    const lastPage = bobas[bobas.length - 1];
    return lastPage.length === limit;
  }, [bobas, limit]);

  return {
    bobas,
    isLoading,
    isValidating,
    error,
    size,
    setSize,
    mutate,
    hasMore,
  };
};

export const useBobaPaginationUpdate = (
  q: string = "",
  limit: number = 20,
  sort: string = "name",
  sortOrder: "asc" | "desc" = "asc",
  flavors: string = ""
) => {
  const { mutate } = useBobasPagination(
    q,
    limit,
    sort,
    sortOrder,
    flavors,
    false
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateBoba = useCallback(
    async (
      bobaId: string,
      payload: Omit<Partial<BobaDocument>, "shopId"> & { shopId: string[] }
    ) => {
      try {
        setIsLoading(true);
        setError(null);

        await updateBobaAction({ _id: bobaId }, payload);
        mutate();
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    },
    [mutate]
  );

  return {
    isLoading,
    error,
    updateBoba,
  };
};

export const useBobaPaginationCreate = (
  q: string = "",
  limit: number = 20,
  sort: string = "name",
  sortOrder: "asc" | "desc" = "asc",
  flavors: string = ""
) => {
  const { mutate } = useBobasPagination(
    q,
    limit,
    sort,
    sortOrder,
    flavors,
    false
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBoba = useCallback(
    async (
      payload: Omit<Partial<BobaDocument>, "shopId"> & { shopId: string[] }
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        await createBobaAction(payload);
        mutate();
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    },
    [mutate]
  );

  return {
    isLoading,
    error,
    createBoba,
  };
};

export const useBobaPaginationDelete = (
  q: string = "",
  limit: number = 20,
  sort: string = "name",
  sortOrder: "asc" | "desc" = "asc",
  flavors: string = ""
) => {
  const { mutate } = useBobasPagination(
    q,
    limit,
    sort,
    sortOrder,
    flavors,
    false
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteBoba = useCallback(
    async (bobaId: string) => {
      setIsLoading(true);
      setError(null);

      try {
        await deleteBobaAction(bobaId);
        mutate();
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    },
    [mutate]
  );

  return {
    isLoading,
    error,
    deleteBoba,
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
    async (
      payload: Omit<Partial<BobaDocument>, "shopId"> & { shopId: string[] }
    ) => {
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
