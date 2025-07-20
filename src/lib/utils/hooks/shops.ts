"use client";

import { useCallback, useEffect, useState } from "react";
import { getShopNameById as getShopNameByIdAction } from "../actions/shop";

export const useShopNameByIdFetcher = (shopId: string | null) => {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getShopNameById = useCallback(async (shopId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      setData(null);

      const shopName = await getShopNameByIdAction(shopId);
      setData(shopName);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to get shop name"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(
    () => {
      if (shopId) {
        getShopNameById(shopId);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [shopId]
  );

  return {
    data,
    error,
    isLoading,
  };
};
