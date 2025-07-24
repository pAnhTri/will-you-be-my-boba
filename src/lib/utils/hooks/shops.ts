"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getShopNameById as getShopNameByIdAction,
  getShops,
} from "../actions/shop";
import { useShopStore } from "@/lib/zustand/stores/shop";
import useSWR from "swr";
import { ShopDocument } from "@/lib/mongodb/models/Shop";

export const useShopNameByIdFetcher = (shopId: string | null) => {
  const cachedShopNames = useShopStore((state) => state.cachedShopNames);
  const setCachedShopNames = useShopStore((state) => state.setCachedShopNames);

  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getShopNameById = useCallback(
    async (shopId: string) => {
      try {
        setIsLoading(true);
        setError(null);
        setData(null);

        if (cachedShopNames.has(shopId)) {
          setData(cachedShopNames.get(shopId) ?? null);
          return;
        }

        const shopName = await getShopNameByIdAction(shopId);
        setData(shopName);
        setCachedShopNames(new Map([...cachedShopNames, [shopId, shopName]]));
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to get shop name"
        );
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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

export const useShopNameById = (shopId: string) => {
  const {
    data: shopName,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<string>(
    shopId ? `shop-name-${shopId}` : null,
    () => getShopNameByIdAction(shopId),
    { keepPreviousData: true }
  );

  return {
    shopName,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export const useShops = () => {
  const {
    data: shops,
    isLoading,
    isValidating,
    error,
    mutate,
  } = useSWR<ShopDocument[]>("shops", getShops, {
    revalidateOnMount: false,
  });

  return {
    shops,
    isLoading,
    isValidating,
    error,
    mutate,
  };
};
